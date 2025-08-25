import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useLiveData } from "./context/LiveData";
import type { Timer } from "./context/LiveData/types";

type TimerKey = "timer" | "breakTimer";
interface RotateCountdownOpts {
  timerKey: TimerKey;
  nextTimerKey: TimerKey;
}

export default function RotateCountdown({ timerKey, nextTimerKey }: RotateCountdownOpts) {
  const { state, dispatch } = useLiveData();
  const [timer, nextTimer] = [state[timerKey], state[nextTimerKey]];

  // dispatch({
  //           type: "timer/params",
  //           payload: {  paused: timerKey === 'breakTimer', which: timerKey },
  //         });

  // console.log("state %o", state);
  // console.log("timer %o, nextTimer %o", timer, nextTimer);
  const countdownRef = useRef<number | null>(timer.countdown);
  const nextTimerOnRef = useRef<boolean>(nextTimer.on);
  const displayBannersRef = useRef<boolean>(state.displayBanners);

  // const pauseSeconds = 5;
  // const pauseCountdownRef = useRef(pauseSeconds);

  useEffect(() => {
    countdownRef.current = timer.countdown;
    displayBannersRef.current = state.displayBanners;
    nextTimerOnRef.current = nextTimer.on;
  }, [timer.countdown, nextTimer.on, state]);

  useEffect(() => {
    if (!state.displayBanners) return;
    if (timer.paused) return;
    if (!timer.on || timer.interval === null) {
      dispatch({ type: "timer/params", payload: { countdown: null, which: timerKey } });
      return;
    }
    dispatch({
      type: "timer/params",
      payload: { countdown: timer.interval, which: timerKey },
    });

    const clock = setInterval(() => {
      const currentCountdown = countdownRef.current;
      const nextTimerOn = nextTimerOnRef.current;

      if (currentCountdown === null || currentCountdown <= 1) {
        // switch to other timer and pause this, if other timer is on
        if (timerKey === 'timer') dispatch({ type: "banner/setNextActive" });
        if (nextTimerOn) {
          dispatch({
            type: "timer/params",
            payload: { paused: true, which: timerKey },
          });
          dispatch({
            type: "timer/params",
            payload: { paused: false, which: nextTimerKey },
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
    timer.paused,
    state.displayBanners,
  ]);

  return (
    <div className={clsx("gap-2 inline-flex px-2", { "bg-amber-100": timer.on })}>
      {timer.paused ? "⏸️" : timer.countdown ?? "--"}
    </div>
  );
}
