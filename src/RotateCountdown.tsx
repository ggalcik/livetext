import clsx from "clsx";
import { useLiveData } from "./context/LiveData";
import { useEffect, useState } from "react";

export default function LiveText() {
  const { state, dispatch } = useLiveData();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!state.timer.on || state.timer.interval === null) {
      setCountdown(null);
      return;
    }

    setCountdown(state.timer.interval);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return state.timer.interval;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timer.on, state.timer.interval]);

  useEffect(() => {
    if (countdown === 0) {
      dispatch({ type: "banner/setNextActive" });
      setCountdown(state.timer.interval);
    }
  }, [countdown, dispatch, state.timer.interval]);

  return (
    <div className={clsx("gap-2 inline-flex px-2", { "bg-amber-100": state.timer.on })}>
      {countdown ?? "--"}
    </div>
  );
}
