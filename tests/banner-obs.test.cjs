const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function loader(mocks = {}) {
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const localRequire = name => {
      if (name in mocks) return mocks[name];
      if (!name.startsWith(".")) return require(name);
      const base = path.resolve(path.dirname(file), name);
      const resolved = ["", ".ts", ".js"].map(ext => base + ext).find(p => fs.existsSync(p));
      return load(resolved);
    };
    new Function("require", "module", "exports", code)(localRequire, module, module.exports);
    return module.exports;
  }
  return relative => load(path.resolve(relative));
}

function fixture() {
  return {
    obsVisible: true, displayBanners: true, displaySpots: true,
    obsWidth: 60, obsTop: 25, obsScale: 80,
    activeBanner: 0, activeSpot: 0,
    defaultBannerCSS: "color: yellow", defaultSpotCSS: "color: blue",
    timer: { on: true, interval: 20, countdown: 10, waiting: false },
    breakTimer: { on: true, interval: 5, countdown: 5, waiting: true },
    banners: [
      { id: "a", type: "rotating", text: "Banner", bannerCSS: "font-size: 30px", on: true },
      { id: "b", type: "rotating", text: "Private unused banner", bannerCSS: "", on: true },
    ],
    spots: [{ id: "s", type: "spot", text: "Spot", bannerCSS: "padding: 20px" }],
  };
}

test("relay payload includes visible content and only the active countdown", () => {
  const { getBannerObsData } = loader()("src/features/scenes/LiveDisplay/bannerObsData.ts");
  const state = fixture();
  const data = getBannerObsData(state);
  assert.equal(data.width, 60);
  assert.equal(data.top, 25);
  assert.equal(data.scale, 80);
  assert.equal(data.showAngry, false);
  assert.deepEqual(Object.keys(data.banner), ["id", "text", "css"]);
  assert.match(data.banner.css, /color: yellow/);
  assert.match(data.banner.css, /font-size: 30px/);
  assert.doesNotMatch(JSON.stringify(data), /Private|waiting|breakTimer/);
  assert.deepEqual(data.countdown, { kind: "timer", interval: 20, seconds: 10 });
  assert.equal(getBannerObsData({ ...state, timer: { ...state.timer, countdown: 9 } }).countdown.seconds, 9);
  assert.equal(getBannerObsData({ ...state, timer: { ...state.timer, waiting: true } }).banner, null);
  const breakState = { ...state, timer: { ...state.timer, waiting: true }, breakTimer: { ...state.breakTimer, waiting: false } };
  assert.deepEqual(getBannerObsData(breakState).countdown, { kind: "breakTimer", interval: 5, seconds: 5 });
  assert.equal(getBannerObsData(breakState).showAngry, true);
  assert.equal(getBannerObsData({ ...state, timer: { ...state.timer, on: false } }).countdown, null);
  assert.deepEqual(getBannerObsData({ ...state, displayBanners: false, displaySpots: false }), { banner: null, spot: null, width: 60, top: 25, scale: 80, countdown: null, showAngry: true });
});

test("routing hides the capture only for checked, active banners and responds to overlay requests", () => {
  const effects = [];
  const sent = [];
  const visibility = [];
  let handlers;
  const load = loader({
    react: { useEffect: effect => effects.push(effect) },
    "../../../components/Relay/useRelay": { useRelay: value => {
      handlers = value;
      return { send: message => sent.push(message), status: "connected" };
    } },
    "../../../helpers/obs": { setCurrentSceneSourcesVisible: (...args) => {
      visibility.push(args); return Promise.resolve();
    } },
  });
  const { useObsBannerOutput } = load("src/features/scenes/LiveDisplay/useObsBannerOutput.ts");
  function render(state, active, embedded = true) {
    effects.length = 0;
    useObsBannerOutput(state, active, embedded);
    effects.forEach(effect => effect());
  }
  render(fixture(), true);
  assert.equal(sent.at(-1).type, "scene/show");
  assert.deepEqual(visibility.at(-1), [["livetext capture"], false, "Basic"]);
  const replies = [];
  handlers.onMessage({ type: "scene/request" }, message => replies.push(message));
  assert.deepEqual(replies[0], sent.at(-1));
  render(fixture(), false);
  assert.deepEqual(sent.at(-1), { type: "scene/hide", scene: "banners" });
  assert.equal(visibility.at(-1)[1], true);
  render({ ...fixture(), obsVisible: false }, true);
  assert.equal(sent.at(-1).type, "scene/hide");
  assert.equal(visibility.at(-1)[1], true);
  render(fixture(), true);
  assert.equal(sent.at(-1).type, "scene/show");
  const count = sent.length;
  render(fixture(), true, false);
  assert.equal(sent.length, count);
});

test("legacy persistent data defaults OBS to off and accepts a saved enabled value", () => {
  const { LiveDataStateSchema } = loader({ "../../components/util": { someDumbID: () => "id" } })("src/context/LiveData/types.ts");
  const stored = JSON.parse(fs.readFileSync("src/context/LiveData/workingData.json", "utf8"));
  delete stored.obsVisible;
  delete stored.obsWidth;
  delete stored.obsTop;
  delete stored.obsScale;
  assert.equal(LiveDataStateSchema.parse(stored).obsVisible, false);
  assert.equal(LiveDataStateSchema.parse(stored).obsWidth, 100);
  assert.equal(LiveDataStateSchema.parse(stored).obsTop, 50);
  assert.equal(LiveDataStateSchema.parse(stored).obsScale, 75);
  const positioned = LiveDataStateSchema.parse({ ...stored, obsWidth: 60, obsTop: 25 });
  assert.equal(positioned.obsWidth, 60);
  assert.equal(positioned.obsTop, 25);
  assert.equal(LiveDataStateSchema.parse({ ...stored, obsVisible: true }).obsVisible, true);
});
