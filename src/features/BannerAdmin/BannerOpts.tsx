import { useLiveData } from "../../context/LiveData";
import TimerOpts from "./TimerOpts";

export default function LiveText() {
  const { state, dispatch } = useLiveData();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TimerOpts timer={state.timer} timerKey={"timer"} dispatch={dispatch} />
        <div className="flex flex-wrap items-center gap-1">
        <label className="flex items-center gap-1 px-1 font-bold cursor-pointer">
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={state.obsVisible}
            onChange={event => dispatch({ type: "obs/visible", payload: { visible: event.target.checked } })}
          />
          OBS
        </label>
        {([['obsWidth', 'W', 'Width', 1, 100], ['obsTop', 'T', 'Top', 0, 100], ['obsScale', 'Sc', 'Scale', 1, 300]] as const).map(([key, label, title, min, max]) => (
          <label key={key} title={`${title} (%)`} className="flex items-center gap-0.5 text-xs">
            {label}
            <input
              type="number"
              aria-label={`OBS ${title.toLowerCase()} percent`}
              className="w-9 border border-gray-400 rounded px-0.5"
              min={min}
              max={max}
              value={state[key]}
              onChange={event => {
                const value = event.target.valueAsNumber;
                if (Number.isFinite(value)) dispatch({
                  type: "obs/layout",
                  payload: { [key]: Math.min(max, Math.max(min, value)) },
                });
              }}
            />
            %
          </label>
        ))}
        </div>
        <TimerOpts timer={state.breakTimer} timerKey={"breakTimer"} dispatch={dispatch} />
      </div>
    </div>
  );
}
