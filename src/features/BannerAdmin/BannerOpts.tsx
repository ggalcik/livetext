import { useLiveData } from "../../context/LiveData";
import TimerOpts from "./TimerOpts";

export default function LiveText() {
  const { state, dispatch } = useLiveData();

  return (
    <div>
      <div className="flex justify-between">
        <TimerOpts timer={state.timer} timerKey={"timer"} dispatch={dispatch} />
        <TimerOpts timer={state.breakTimer} timerKey={"breakTimer"} dispatch={dispatch} />
      </div>
    </div>
  );
}
