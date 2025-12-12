import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useLiveData } from "../../context/LiveData";
import type { Timer } from "../../context/LiveData/types";
import glog from "../../components/glog";
import DisplayCountdown from "../../components/DisplayCountdown";

type TimerKey = "timer" | "breakTimer"; 
interface rotateCountdownOpts {
  timerKey: TimerKey;
  nextTimerKey: TimerKey;
}

export default function rotateCountdown({ timerKey, nextTimerKey }: rotateCountdownOpts) {
  const { state, dispatch } = useLiveData();

  const [timer, nextTimer] = [state[timerKey], state[nextTimerKey]];
  if (!timer || !nextTimer) {
    glog.rotateCountdown("Missing timer data", timerKey, nextTimerKey);
    return null;
  }
//   glog.rotateCountdown("this one, the other one", timer, nextTimer)
// glog.rotateCountdown("Timer identity", timer, timerKey, nextTimer);

  const countdownRef = useRef<number | null>(timer.countdown);
  const nextTimerOnRef = useRef<boolean>(nextTimer.on);
  const displayBannersRef = useRef<boolean>(state.displayBanners);
glog.rotateCountdown("timer ", timerKey);
  useEffect(() => {
    glog.rotateCountdown("useEffect 1");
    countdownRef.current = timer.countdown;
    displayBannersRef.current = state.displayBanners;
    nextTimerOnRef.current = nextTimer.on;
  }, [state[timerKey].countdown, state[nextTimerKey].on, state.displayBanners]);

  useEffect(() => {
    glog.rotateCountdown("useEffect 2");
    glog.rotateCountdown("state.displayBanners %s, timer.waiting %s, timer.on %s, timer.interval %s", state.displayBanners, timer.waiting, timer.on, timer.interval)
    if (!state.displayBanners) return; glog.rotateCountdown("a");
    if (timer.waiting) return;glog.rotateCountdown("b", timer.interval);
    if (!timer.on || timer.interval === null) {
      dispatch({ type: "timer/params", payload: { countdown: null, which: timerKey } });
      return;
    }glog.rotateCountdown("c");
    dispatch({
      type: "timer/params",
      payload: { countdown: timer.interval, which: timerKey },
    });

    glog.rotateCountdown("down here");
    const clock = setInterval(() => {
      const currentCountdown = countdownRef.current;
      const nextTimerOn = nextTimerOnRef.current;

      if (currentCountdown === null || currentCountdown <= 1) {
        // switch to other timer and pause this, if other timer is on
        if (timerKey === 'timer') dispatch({ type: "banner/setNextActive" });
        if (nextTimerOn) {
          dispatch({
            type: "timer/params",
            payload: { waiting: true, which: timerKey },
          });
          dispatch({
            type: "timer/params",
            payload: { waiting: false, which: nextTimerKey },
          });
        } else {
          dispatch({
            type: "timer/params",
            payload: { countdown: timer.interval, which: timerKey },
          });
        }
      } else {
        dispatch({
          type: "timer/params",
          payload: { countdown: currentCountdown - 1, which: timerKey },
        });
      }
    }, 1000);

    return () => clearInterval(clock);
  }, [
    dispatch,
    timerKey,
    nextTimerKey,
    timer.on,
    timer.interval,
    timer.waiting,
    state.displayBanners,
  ]);

  return <DisplayCountdown timer={timer} />

  ;
}
