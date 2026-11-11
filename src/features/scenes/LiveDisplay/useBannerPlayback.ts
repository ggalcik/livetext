import { useEffect, useState } from "react";
import { liveDataReducer } from "../../../context/LiveData/LiveDataReducer";
import type { LiveDataState, TimerKey } from "../../../context/LiveData/types";

const timerKeys: TimerKey[] = ["timer", "breakTimer"];
const enabled = (state: LiveDataState, key: TimerKey) =>
  state[key].on && (state[key].interval ?? 0) > 0;

function startPlayback(source: LiveDataState): LiveDataState {
  return {
    ...source,
    timer: { ...source.timer, countdown: source.timer.interval, waiting: false },
    breakTimer: { ...source.breakTimer, countdown: source.breakTimer.interval, waiting: true },
  };
}

function syncSettings(current: LiveDataState, previous: LiveDataState, source: LiveDataState): LiveDataState {
  const activeId = current.banners[current.activeBanner ?? -1]?.id;
  const activeIndex = source.banners.findIndex(banner => banner.id === activeId && banner.type === "rotating" && banner.on);
  const selectionChanged = previous.banners[previous.activeBanner ?? -1]?.id !== source.banners[source.activeBanner ?? -1]?.id;
  const next = {
    ...source,
    activeBanner: selectionChanged || activeIndex < 0 ? source.activeBanner : activeIndex,
    timer: { ...source.timer, countdown: current.timer.countdown, waiting: current.timer.waiting },
    breakTimer: { ...source.breakTimer, countdown: current.breakTimer.countdown, waiting: current.breakTimer.waiting },
  };

  for (const key of timerKeys) {
    // Delay edits apply to the next cycle; preserve the current seconds left.
    if (previous[key].on !== source[key].on) {
      next[key].countdown = source[key].interval;
    }
  }
  // Disabling either phase must not leave the other phase waiting forever.
  if (!enabled(next, "breakTimer")) {
    next.timer.waiting = false;
    next.breakTimer.waiting = true;
  } else if (!enabled(next, "timer")) {
    next.timer.waiting = false;
    next.breakTimer.waiting = current.breakTimer.waiting;
  }
  return next;
}

function tick(state: LiveDataState): LiveDataState {
  if (!state.displayBanners) return state;
  const key = timerKeys.find(key => enabled(state, key) && !state[key].waiting);
  if (!key) return state;
  const timer = state[key];
  if ((timer.countdown ?? timer.interval ?? 0) > 1) {
    return { ...state, [key]: { ...timer, countdown: (timer.countdown ?? timer.interval ?? 0) - 1 } };
  }
  const next = key === "timer" ? liveDataReducer(state, { type: "banner/setNextActive" }) : state;
  const other: TimerKey = key === "timer" ? "breakTimer" : "timer";
  // Finish the break even if rotation was disabled during it.
  const switchPhase = enabled(state, other) || key === "breakTimer";
  return {
    ...next,
    [key]: { ...next[key], countdown: timer.interval, waiting: switchPhase },
    ...(switchPhase ? { [other]: { ...next[other], countdown: next[other].interval, waiting: false } } : {}),
  };
}

/** Playback is local to each display; only admin settings are persisted. */
export function useBannerPlayback(source: LiveDataState, active = true): LiveDataState {
  const [playback, setPlayback] = useState(() => ({ source, state: startPlayback(source) }));
  if (playback.source !== source) {
    setPlayback({ source, state: syncSettings(playback.state, playback.source, source) });
  }

  useEffect(() => {
    if (!active || !playback.state.displayBanners) return;
    const clock = window.setTimeout(() => {
      setPlayback(current => ({ ...current, state: tick(current.state) }));
    }, 1000);
    return () => window.clearTimeout(clock);
  }, [playback, active]);

  return playback.state;
}
