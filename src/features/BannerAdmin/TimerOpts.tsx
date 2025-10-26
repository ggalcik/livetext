import clsx from "clsx";
import type { LiveDataAction, Timer, TimerKey } from "../../context/LiveData/types";
import RotateCountdown from "./RotateCountdown";
import DisplayCountdown from "../../components/DisplayCountdown";

interface ITimerOptsProps {
    timer: Timer;
    timerKey: TimerKey;
    dispatch: React.Dispatch<LiveDataAction>
}

export default function TimerOpts({ timer, timerKey, dispatch }: ITimerOptsProps) {
    const otherTimerKey = timerKey === 'timer' ? 'breakTimer' : 'timer';

    return <div className={clsx("relative gap-2 inline-flex align-baseline p-2 border-2 rounded-xl cursor-pointer hover:border-green-400",
        { "bg-amber-100": timer.on,
            // "hover:bg-green-100": !timer.on
         },
        timer.on ? "border-gray-500" : " border-gray-200")}
        onClick={() => dispatch({ type: "timer/toggle", payload: { which: timerKey } })}>

        <div className="absolute text-xs -top-[1em] px-2 bg-white left-1 border">
            {timerKey }
        </div>
        <input
            type="number"
            className="border border-gray-400 w-12 pl-2 bg-white! cursor-default"
            value={timer.interval ?? ""}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => dispatch({
                type: "timer/params",
                payload: { interval: parseInt(e.target.value) || null, which: timerKey },
            })} />

        <div>
            {/* <DisplayCountdown timer={timer}  */}
            <RotateCountdown timerKey={timerKey} nextTimerKey={otherTimerKey} />
        </div>
    </div>;
}