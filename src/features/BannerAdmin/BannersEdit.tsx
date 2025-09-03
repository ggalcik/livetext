import { useLiveData } from "../../context/LiveData";
import LiveTextFormat from "../../features/LiveDisplay/LiveTextFormat";
import type { PopupState } from "../../context/LiveData/types";
import { showOptsPopup, thisOptsPopupIsActive } from "../../components/util";
import clsx from "clsx";

export default function BannersEdit({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();
  const { visiblePopup, setVisiblePopup } = popupState;

  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => dispatch({ type: "banner/add", payload: { idx: 0 } })}
      >
        Add
      </button>

      {state.banners.length > 0 &&
        state.banners.map((item, idx) => (
          <div key={`bannerForm_${idx}`} className={clsx("p-2 mb-2 border-b",
            { "bg-gray-200": !item.on })}>
            <div className="grid grid-cols-1 grid-rows-[auto_50px] gap-2">

              <textarea
                className="border  p-2"
                rows={4}
                onChange={(evt) =>
                  dispatch({ type: "banner/change", payload: { idx, text: evt.target.value } })
                }
                value={item.text}
              ></textarea>

<ItemControls />

             

            </div>
          </div>
        ))}
    </div>
  );
}
