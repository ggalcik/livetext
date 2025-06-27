import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useLiveData } from "./context/LiveData";
import type { Timer } from "./context/LiveData/types";

interface RotateCountdownOpts {
  timer: Timer;
  nextTimer: Timer;
}

export default function RotateCountdown({ timer, nextTimer }: RotateCountdownOpts) {
  const { state, dispatch } = useLiveData();
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
    if (!timer.on || timer.interval === null) {
      dispatch({ type: "timer/setCountdown", payload: { countdown: null } });
      return;
    }
    dispatch({
      type: "timer/setCountdown",
      payload: { countdown: timer.interval },
    });

    
    const clock = setInterval(() => {
      const currentCountdown = countdownRef.current;
      const nextTimerOn = nextTimerOnRef.current;
      if (currentCountdown === null || currentCountdown <= 1) {
        // switch to other timer and pause this, if other timer is on
        if (nextTimerOn) ...
        dispatch({
          type: "timer/setCountdown",
          payload: { countdown: timer.interval },
        });
        dispatch({ type: "banner/setNextActive" });
      } else {
        dispatch({
          type: "timer/setCountdown",
          payload: { countdown: currentCountdown - 1 },
        });
      }
    }, 1000);

    return () => clearInterval(clock);
  }, [dispatch, timer.on, timer.interval, timer.paused, state.displayBanners]);

  return (
    <div className={clsx("gap-2 inline-flex px-2", { "bg-amber-100": timer.on })}>
      {timer.countdown ?? "--"}
    </div>
  );
}
