import { useLiveData } from "../../context/LiveData";
import type { PopupState, BannerType } from "../../context/LiveData/types";
import clsx from "clsx";
import ItemControls from "./ItemControls";
import { useState } from "react";
import { Button } from "../../components/Button";
import { AutoResizeTextarea } from "../../components/AutoResizeTextarea";
import './BannersEdit.css';

interface IBannersEdit {
  popupState: PopupState;
  type: BannerType
}
export default function BannersEdit({ popupState, type }: IBannersEdit) {
  const { state, dispatch } = useLiveData();
  // const { visiblePopup, setVisiblePopup } = popupState;
  const [isInTextarea, setIsInTextArea] = useState<number | null>(null);
  const [moveAnim, setMoveAnim] = useState<[string, string] | null>(null);

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
        banners.map((item, idx) => {
          const isActive = !(item.type === "rotating" && !item.on);
          const isAnimating = moveAnim && moveAnim[0] === item.id;

          return (
            <div
              key={`bannerForm_${item.id}`}
              onAnimationEnd={() => isAnimating && setMoveAnim(null)}
              className={clsx(
                "p-2 mb-4 border rounded-xl transition duration-500",
                isActive
                  ? "border-green-400 bg-green-100"
                  : "border-gray-200 bg-gray-200",
                isAnimating && moveAnim[1] === 'up' && `animate-banner-move-up`,
                isAnimating && moveAnim[1] === 'down' &&  `animate-banner-move-down`
              )}
            >


              <ItemControls
                item={item}
                idx={idx}
                total={banners.length}
                popupState={popupState}
                isActive={isActive}
                moveAnim={(dir) => setMoveAnim([item.id, dir])} />

              <AutoResizeTextarea
                className="border p-2 w-full overflow-hidden bg-white"
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
          )
        }

        )}
    </div>
  );
}
