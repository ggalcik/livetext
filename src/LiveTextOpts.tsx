import clsx from "clsx";
import { useLiveData } from "./context/LiveData";
import RotateCountdown from "./RotateCountdown";
import { initialLiveDataState } from "./context/LiveData/LiveDataReducer";
import LiveTextFormat from "./LiveTextFormat";
import type { PopupState } from "./context/LiveData/types";

export default function LiveText({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();

  return (
    <div>
      <div className={clsx("gap-2 inline-flex px-2", { "bg-amber-100": state.timer.on })}>
        <input
          type="checkbox"
          checked={state.timer.on}
          onChange={() => dispatch({ type: "timer/toggle" })}
          id="bannerTimer"
        />
        <label htmlFor="bannerTimer" className="cursor-pointer">
          timer
        </label>
        <input
          type="number"
          className="border border-gray-400 w-16"
          value={state.timer.interval ?? ""}
          onChange={(e) =>
            dispatch({
              type: "timer/setInterval",
              payload: { interval: parseInt(e.target.value) || null },
            })
          }
        />
        <div>
          <RotateCountdown />
        </div>
      </div>

      <div className=" relative">
        <button
          className="text-blue-400 cursor-pointer"
          onClick={() => popupState.setVisiblePopup((p) => (p === "default" ? null : "default"))}
        >
          [format]
        </button>


        {popupState.visiblePopup === "default" && (
          <LiveTextFormat
            banner="default"
            bannerCSS={state.bannerCSS}
            dispatch={dispatch}
            defaultCSS={initialLiveDataState.bannerCSS}
             hideThis={() => popupState.setVisiblePopup(null)}
      
          />
        )}
      </div>
    </div>
  );
}
