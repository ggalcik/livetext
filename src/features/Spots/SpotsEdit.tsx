import { useLiveData } from "../../context/LiveData";
import LiveTextFormat from "../../LiveTextFormat";
import type { PopupState, Spot, SpotCSS } from "../../context/LiveData/types";

export default function SpotsEdit({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();

  return (
    <div>
      {state.spots.length > 0 &&
        state.spots.map((item: Spot, idx) => (
          <div key={`spotForm_${idx}`} className="p-2 mb-2 border-b">
            <div className="grid grid-cols-[30px_auto] grid-rows-2 gap-2">
              <input
                type="radio"
                name="activeSpot"
                value={idx}
                className=" justify-center"
                checked={state.activeSpot === idx}
                onChange={() => dispatch({ type: "spot/setActive", payload: { idx } })}
              />
              <textarea
                className="border row-span-2 p-2"
                rows={2}
                onChange={(evt) =>
                  dispatch({ type: "spot/change", payload: { idx, text: evt.target.value } })
                }
                value={item.text}
              ></textarea>{" "}
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm    mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => dispatch({ type: "spot/delete", payload: { idx } })}
              >
                X
              </button>
              <div></div>
              <div className="flex">
                <button className="text-blue-400 cursor-pointer text-left"
                onClick={() => popupState.setVisiblePopup((p) => (p === idx ? null : idx))}
                >[format]</button>
                {popupState.visiblePopup === idx && (
                  <div className="relative">

                  <div className="absolute top-1/2 -translate-y-1/2">
                  <LiveTextFormat
                    banner={idx}
                    spotCSS={state.spots[idx].spotCSS}
                    dispatch={dispatch}
                    defaultCSS={state.spotCSS}
                    hideThis={() => popupState.setVisiblePopup(null)}
                    />
                  </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => dispatch({ type: "spot/add" })}
      >
        Add
      </button>
    </div>
  );
}
