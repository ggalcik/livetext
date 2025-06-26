import clsx from "clsx";
import { useLiveData } from "./context/LiveData";
import RotateCountdown from "./RotateCountdown";
import { initialLiveDataState } from "./context/LiveData/LiveDataReducer";
import LiveTextFormat from "./LiveTextFormat";
import { type PopupState } from "./context/LiveData/types";
import { showOptsPopup, thisOptsPopupIsActive } from "./components/util";
import { useState } from "react";

export default function LiveText({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();
  const { visiblePopup, setVisiblePopup } = popupState;
  const [showRawState, setShowRawState] = useState(false);

  const rotate = false;
  const openPopup = () => {
    if (rotate) {
      window.open(
        "/popup",
        "LiveTextPopup",
        "width=800,height=600,menubar=no,toolbar=no,location=no,status=no"
      );
    } else {
      window.open(
        "/popup",
        "LiveTextPopup",
        "width=600,height=450,menubar=no,toolbar=no,location=no,status=no"
      );
    }
  };

  return (
    <div>
      <div className={clsx("gap-2 inline-flex px-2", { "bg-amber-100": state.timer.on })}>
        <input
          className="h-8 w-8"
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
          className="border border-gray-400 w-16 px-2"
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

      <div className="flex gap-4">
        <button className="text-blue-600 cursor-pointer self-start" onClick={openPopup}>
          [pop]
        </button>
        <button
          className="text-blue-400 cursor-pointer self-start"
          onClick={() => {
            showOptsPopup(setVisiblePopup, { banner: "default" });
          }}
        >
          [format]
        </button>

        {thisOptsPopupIsActive(visiblePopup, { banner: "default" }) && (
          <div className="inline-block">
            <LiveTextFormat
              banner="default"
              css={state.bannerCSS}
              dispatch={dispatch}
              defaultCSS={initialLiveDataState.bannerCSS}
              hideThis={() => showOptsPopup(setVisiblePopup, null)}
            />
          </div>
        )}

        <button
          className="text-blue-400 cursor-pointer self-start"
          onClick={() =>
            setShowRawState((p) => !p)
          }

        >
          [raw state]
        </button>

           {showRawState && (
          <div className="inline-block bg-white drop-shadow-2xl p-2 ">
           <textarea className="p-2 border w-80" rows={4} value={JSON.stringify(state)}></textarea>
          </div>
        )}
      </div>
    </div>
  );
}
