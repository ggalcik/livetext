import clsx from "clsx";
import type { Timer } from "./context/LiveData/types";

interface ProgressDotsOpts {
  timer: Timer;
  alt?: boolean;
}

export default function ProgressDots({ timer, alt = false }: ProgressDotsOpts) {
  if (!timer || !timer.on || timer.interval == null || timer.countdown == null) {
    return <div></div>;
  }
  const { interval, countdown } = timer;

  return (
    <div className="flex justify-between">
      {Array.from({ length: interval - 1 }, (_, i) => (
        <div
          key={i}
          className={clsx(
            "w-8 h-8",
            alt
              ? i < countdown - 1
                ? "bg-red-500"
                : "bg-red-200"
              : i < countdown - 1
              ? "bg-blue-500"
              : "bg-blue-200"
          )}
        />
      ))}
    </div>
  );
}
