import clsx from "clsx";
import { useLiveData } from "../../context/LiveData";
import type { PopupState } from "../../context/LiveData/types";
import { dateStr } from "../../components/util";
import BannerFormat from "../BannerAdmin/BannerFormat";
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
            setVisiblePopup(`spot_default`);
          }}
        >
          [format]
        </button>
        {visiblePopup === "spot_default" && (
          <div className="inline-block">
            <BannerFormat
              bannerType="spot"
              idx="default"
              css={state.defaultSpotCSS}
              dispatch={dispatch}
              defaultCSS={initialLiveDataState.defaultSpotCSS}
              hideThis={() => setVisiblePopup(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
