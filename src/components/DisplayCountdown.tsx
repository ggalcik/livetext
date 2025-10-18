import type { Timer } from "../context/LiveData/types";
import clsx from "clsx";

interface IDisplayCountdownProps {
    timer: Timer
}
export default function DisplayCountdown({timer}: IDisplayCountdownProps) {
 return <div className={clsx("w-8 h-8 text-2xl text-center")}>
    {timer.waiting ? "⏸️" : timer.countdown ?? "--"}
  </div>
}

