import clsx from "clsx";
import { useLiveData } from "../../context/LiveData";
import RotateCountdown from "../../RotateCountdown";
import { initialLiveDataState } from "../../context/LiveData/LiveDataReducer";
import BannerFormat from "./BannerFormat";
import { type PopupState } from "../../context/LiveData/types";
import { useState } from "react";
import { openPopup } from "../Popup/Popup";

export default function LiveText({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();
  const { visiblePopup, setVisiblePopup } = popupState;
  const [showRawState, setShowRawState] = useState(false);



  return (
    <div>
      <div className="flex justify-between">
        <div className={clsx("gap-2 inline-flex px-2", { "bg-amber-100": state.timer.on })}>
          <input
            className="h-8 w-8"
            type="checkbox"
            checked={state.timer.on}
            onChange={() => {
              dispatch({ type: "timer/toggle", payload: { which: "timer" } });
            }}
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
                type: "timer/params",
                payload: { interval: parseInt(e.target.value) || null, which: "timer" },
              })
            }
          />

          <div>
            <RotateCountdown timerKey="timer" nextTimerKey="breakTimer" />
          </div>
        </div>
        {state.breakTimer && (
          <div className={clsx("gap-2 inline-flex px-2", { "bg-amber-100": state.breakTimer.on })}>
            <input
              className="h-8 w-8"
              type="checkbox"
              checked={state.breakTimer.on}
              onChange={() => {
                dispatch({ type: "timer/toggle", payload: { which: "breakTimer" } });
              }}
              id="breakTimer"
            />
            <label htmlFor="breakTimer" className="cursor-pointer">
              break timer
            </label>
            <input
              type="number"
              className="border border-gray-400 w-12 px-2"
              value={state.breakTimer.interval ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "timer/params",
                  payload: { interval: parseInt(e.target.value) || null, which: "breakTimer" },
                })
              }
            />

            <div>
              <RotateCountdown timerKey="breakTimer" nextTimerKey="timer" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {/* <button className="text-blue-600 cursor-pointer self-start" onClick={() => openPopup('livetext')}>
          [p1]
        </button>
        <button className="text-blue-600 cursor-pointer self-start" onClick={() => openPopup('atemporal')}>
          [p2]
        </button> */}
        <button
          className="text-blue-400 cursor-pointer self-start"
          onClick={() => {
           setVisiblePopup(`banner_default`);
          }}
        >
          [format]
        </button>

        {visiblePopup === "banner_default" && (
          <div className="inline-block">
            <BannerFormat
              bannerType="rotating"
              idx="default"
              css={state.defaultBannerCSS}
              dispatch={dispatch}
              defaultCSS={initialLiveDataState.defaultBannerCSS}
              hideThis={() => setVisiblePopup(null)}
            />
          </div>
        )}

        {/* <button
          className="text-blue-400 cursor-pointer self-start"
          onClick={() => setShowRawState((p) => !p)}
        >
          [raw state]
        </button> */}

        {showRawState && (
          <div className="flex flex-col bg-white drop-shadow-2xl p-2 ">
            <textarea className="p-2 border w-80" rows={4} value={JSON.stringify(state)}></textarea>
          </div>
        )}
      </div>
    </div>
  );
}
