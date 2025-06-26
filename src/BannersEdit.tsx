import { useLiveData } from "./context/LiveData";
import LiveTextFormat from "./LiveTextFormat";
import type { PopupState } from "./context/LiveData/types";
import { showOptsPopup, thisOptsPopupIsActive } from "./components/util";

export default function BannersEdit({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();
  const { visiblePopup, setVisiblePopup } = popupState;

  return (
    <div>
            <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => dispatch({ type: "banner/add" , payload: {idx: 0}})}
      >
        Add
      </button>

      {state.banners.length > 0 &&
        state.banners.map((item, idx) => (
          <div key={`bannerForm_${idx}`} className="p-2 mb-2 border-b">
            <div className="grid grid-cols-[30px_auto] grid-rows-[auto_50px] gap-2">
              <input
                type="radio"
                name="activeBanner"
                value={idx}
                className=" justify-center"
                checked={state.activeBanner === idx}
                onChange={() => dispatch({ type: "banner/setActive", payload: { idx } })}
              />
              <textarea
                className="border  p-2"
                rows={4}
                onChange={(evt) =>
                  dispatch({ type: "banner/change", payload: { idx, text: evt.target.value } })
                }
                value={item.text}
              ></textarea>

              <div></div>
              <div className="flex gap-2">
                <button
                  className="text-blue-400 cursor-pointer text-left"
                  onClick={() => showOptsPopup(setVisiblePopup, { banner: idx })}
                >
                  [format]
                </button>
                {thisOptsPopupIsActive(visiblePopup, { banner: idx }) && (
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2">
                      <LiveTextFormat
                        banner={idx}
                        css={state.banners[idx].bannerCSS}
                        dispatch={dispatch}
                        defaultCSS={state.bannerCSS}
                        hideThis={() => popupState.setVisiblePopup(null)}
                      />
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 px-5 py-2.5 me-2 mb-2 font-medium rounded-lg text-sm    mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
                  onClick={() => dispatch({ type: "banner/delete", payload: { idx } })}
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                  onClick={() => dispatch({ type: "banner/add", payload: idx+1 })}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}


    </div>
  );
}
