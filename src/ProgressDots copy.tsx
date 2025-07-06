import clsx from "clsx";
import { useLiveData } from "./context/LiveData";
import type { LiveDataState } from "./context/LiveData/types";

interface ProgressDotsOpts {
   state: LiveDataState ;
   timerKey: "timer" | "breakTimer";
}

export default function ProgressDots({ state, timerKey }:ProgressDotsOpts) {
 
  const timer = state[timerKey];
  if (!timer || !timer.on || timer.interval == null || timer.countdown == null) {
    return <div></div>;
  }
  const { interval, countdown } = timer as { interval: number; countdown: number };

  return (
    <div className="flex justify-between">
      {Array.from({ length: interval }, (_, i) => (
        <div key={i} className={clsx("w-8 h-8", i < countdown ? "bg-blue-500" : "bg-blue-200")} />
      ))}
    </div>
  );
}
