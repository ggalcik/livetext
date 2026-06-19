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
  const { visiblePopup } = popupState;
  const [moveAnim, setMoveAnim] = useState<[string, string] | null>(null);

  const banners = type === 'rotating' ? state.banners : state.spots;

  return (
    <div className="pt-4">
      <div className="flex gap-2">
        <Button
          variant="a"
          onClick={() => dispatch({ type: "banner/add", payload: { type, idx: 0 } })}
        >
          Add
        </Button>
        {type === "rotating" && (
          <Button
            variant="a"
            onClick={() =>
              dispatch({ type: "banner/sortActiveFirst", payload: { type } })
            }
          >
            Active up
          </Button>
        )}
      </div>

      {banners.length > 0 &&
        banners.map((item, idx) => {
          const isActive = !(item.type === "rotating" && !item.on);
          const isAnimating = moveAnim && moveAnim[0] === item.id;
          const isFormatting = visiblePopup === `${item.type}_${idx}`;

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
                className={clsx(
                  "border p-2 w-full overflow-hidden transition-colors",
                  isFormatting
                    ? "bg-amber-100 border-amber-400 ring-2 ring-black"
                    : "bg-white"
                )}
                spellCheck={false}
                value={isFormatting ? item.bannerCSS : item.text}
                onChange={(evt) => {
                  if (isFormatting) {
                    if (item.type === "rotating") {
                      dispatch({
                        type: "bannerCSS",
                        payload: { banner: idx, css: evt.target.value },
                      });
                    } else {
                      dispatch({
                        type: "spotCSS",
                        payload: { spot: idx, css: evt.target.value },
                      });
                    }
                    return;
                  }

                  dispatch({
                    type: "banner/change",
                    payload: { type: item.type, idx, text: evt.target.value },
                  });
                }}
              />


            </div>
          )
        }

        )}
    </div>
  );
}
