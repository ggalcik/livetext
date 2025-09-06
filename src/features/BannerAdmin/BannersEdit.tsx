import { useLiveData } from "../../context/LiveData";
import type { PopupState , BannerType} from "../../context/LiveData/types";
import clsx from "clsx";
import ItemControls from "./ItemControls";
import { useState } from "react";

interface IBannersEdit {
  popupState: PopupState;
  type: BannerType
}
export default function BannersEdit({ popupState, type }: IBannersEdit) {
  const { state, dispatch } = useLiveData();
  // const { visiblePopup, setVisiblePopup } = popupState;
  const [ isInTextarea, setIsInTextArea] = useState<number | null>(null);

  const banners = type === 'rotating' ? state.banners : state.spots;

  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => dispatch({ type: "banner/add", payload: { type, idx: 0 } })}
      >
        Add
      </button>

      {banners.length > 0 &&
        banners.map((item, idx) => (
          <div key={`bannerForm_${idx}`} className={clsx("p-2 mb-2 border-b",
            { "bg-gray-200": item.type === 'rotating' && !item.on })}>
            <div className="">

              <ItemControls item={item} idx={idx} popupState={popupState} />

              <textarea
                className={clsx("border p-2 w-full",
                  isInTextarea === idx ? "h-30" : "h-8"
                )}
                rows={4}
                onChange={(evt) =>
                  dispatch({ type: "banner/change", payload: { type, idx, text: evt.target.value } })
                }
                onFocus={() => setIsInTextArea(idx)}
                onBlur={() => setIsInTextArea(null)}
                value={item.text}
              ></textarea>

            </div>
          </div>
        ))}
    </div>
  );
}
