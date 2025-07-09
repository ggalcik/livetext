import clsx from "clsx";
import { useLiveData } from "../../context/LiveData";
import type { PopupState } from "../../context/LiveData/types";
import { dateStr, showOptsPopup, thisOptsPopupIsActive } from "../../components/util";
import LiveTextFormat from "../../features/LiveDisplay/LiveTextFormat";
import { initialLiveDataState } from "../../context/LiveData/LiveDataReducer";

export default function SpotsOpts({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();
  const { visiblePopup, setVisiblePopup } = popupState;



  return (
    <div>
      <div className="flex gap-4">
        <div className={clsx("gap-2 inline-flex", {})}>
          <div>[[dateMark]]</div>
          <div>{dateStr()}</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="text-blue-400 cursor-pointer self-start"
          onClick={() => {
            showOptsPopup(setVisiblePopup, { spot: "default" });
          }}
        >
          [format]
        </button>
        {thisOptsPopupIsActive(visiblePopup, { spot: "default" }) && (
          <div className="inline-block">
            <LiveTextFormat
              spot="default"
              css={state.spotCSS}
              dispatch={dispatch}
              defaultCSS={initialLiveDataState.spotCSS}
              hideThis={() => showOptsPopup(setVisiblePopup, null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
