const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

function loadHelper({ groupName = "Overlay group", duplicate = false } = {}) {
    const calls = [];
    let connections = 0;
    let fail = false;
    class MockOBS {
        async connect() { connections++; }
        once() {}
        async call(type, data) {
            calls.push({ type, data });
            if (fail) { fail = false; throw new Error("Disconnected"); }
            if (type === "GetCurrentProgramScene") return { currentProgramSceneName: "Live" };
            if (type === "GetSceneItemList") return { sceneItems: [
                { sourceName: groupName, sceneItemId: 1, isGroup: true },
                ...(duplicate ? [{ sourceName: "livetext capture", sceneItemId: 3 }] : []),
            ] };
            if (type === "GetGroupSceneItemList") return { sceneItems: [
                { sourceName: "livetext capture", sceneItemId: 2 },
            ] };
            // Allow overlapping commands to expose ordering mistakes.
            if (type === "SetSceneItemEnabled") await new Promise(resolve => setTimeout(resolve, 5));
            return {};
        }
    }
    const source = fs.readFileSync("src/helpers/obs.ts", "utf8").replaceAll("import.meta.env", "({})");
    const compiled = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const exports = {};
    new Function("require", "exports", compiled)(() => ({ default: MockOBS }), exports);
    return { ...exports, calls, connections: () => connections, fail: () => { fail = true; } };
}

test("finds grouped sources and uses their parent for visibility changes", async () => {
    const helper = loadHelper();
    await helper.setCurrentSceneSourcesVisible(["livetext capture", "Overlay group"], false);
    assert.deepEqual(helper.calls.filter(call => call.type === "SetSceneItemEnabled").map(call => call.data), [
        { sceneName: "Live", sceneItemId: 1, sceneItemEnabled: false },
        { sceneName: "Overlay group", sceneItemId: 2, sceneItemEnabled: false },
    ]);
});

test("serializes hide/show and reuses the connection", async () => {
    const helper = loadHelper();
    await Promise.all([
        helper.setCurrentSceneSourcesVisible(["livetext capture"], false),
        helper.setCurrentSceneSourcesVisible(["livetext capture"], true),
    ]);
    assert.deepEqual(helper.calls.map(call => call.type), [
        "GetCurrentProgramScene", "GetSceneItemList", "GetGroupSceneItemList", "SetSceneItemEnabled",
        "GetCurrentProgramScene", "GetSceneItemList", "GetGroupSceneItemList", "SetSceneItemEnabled",
    ]);
    assert.deepEqual(helper.calls.filter(call => call.type === "SetSceneItemEnabled")
        .map(call => call.data.sceneItemEnabled), [false, true]);
    assert.equal(helper.connections(), 1);
});

test("missing names reject before making changes; later calls still work", async () => {
    const helper = loadHelper();
    await assert.rejects(helper.setCurrentSceneSourcesVisible(["missing", "livetext capture"], false), /missing/);
    assert.equal(helper.calls.some(call => call.type === "SetSceneItemEnabled"), false);
    helper.fail();
    await assert.rejects(helper.setCurrentSceneSourcesVisible(["livetext capture"], false), /Disconnected/);
    await helper.setCurrentSceneSourcesVisible(["livetext capture"], true);
});

test("LiveText shortcut targets only the capture inside Basic and leaves its group alone", async () => {
    const helper = loadHelper({ groupName: "Basic", duplicate: true });
    await helper.setLivetextCaptureVisible(false);
    await helper.setLivetextCaptureVisible(true);
    assert.deepEqual(helper.calls.filter(call => call.type === "SetSceneItemEnabled").map(call => call.data), [
        { sceneName: "Basic", sceneItemId: 2, sceneItemEnabled: false },
        { sceneName: "Basic", sceneItemId: 2, sceneItemEnabled: true },
    ]);
});

test("LiveText shortcut rejects a same-named capture outside Basic", async () => {
    const helper = loadHelper({ duplicate: true });
    await assert.rejects(helper.setLivetextCaptureVisible(false), /Basic/);
    assert.equal(helper.calls.some(call => call.type === "SetSceneItemEnabled"), false);
});
