import { useLiveData } from "../../context/LiveData";
import type { PopupState, BannerType } from "../../context/LiveData/types";
import clsx from "clsx";
import ItemControls from "./ItemControls";
import { useState } from "react";
import { Button } from "../../components/Button";
import { AutoResizeTextarea } from "../../components/AutoResizeTextarea";

interface IBannersEdit {
  popupState: PopupState;
  type: BannerType
}
export default function BannersEdit({ popupState, type }: IBannersEdit) {
  const { state, dispatch } = useLiveData();
  // const { visiblePopup, setVisiblePopup } = popupState;
  const [isInTextarea, setIsInTextArea] = useState<number | null>(null);

  const banners = type === 'rotating' ? state.banners : state.spots;

  return (
    <div className="pt-4">
      <Button
        variant="a"
        onClick={() => dispatch({ type: "banner/add", payload: { type, idx: 0 } })}
      >
        Add
      </Button>

      {banners.length > 0 &&
        banners.map((item, idx) => (
          <div key={`bannerForm_${idx}`} className={clsx("p-2 mb-2 border-b",
            { "bg-gray-200": item.type === 'rotating' && !item.on })}>
            <div className="">

              <ItemControls item={item} idx={idx} popupState={popupState} />

              <AutoResizeTextarea
                className="border p-2 w-full"
                value={item.text}
                onFocus={() => setIsInTextArea(idx)}
                onBlur={() => setIsInTextArea(null)}
                onChange={(evt) =>
                  dispatch({
                    type: "banner/change",
                    payload: { type: item.type, idx, text: evt.target.value },
                  })
                }
              />

            </div>
          </div>
        ))}
    </div>
  );
}
