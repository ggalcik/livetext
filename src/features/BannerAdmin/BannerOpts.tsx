import { useLiveData } from "../../context/LiveData";
import { initialLiveDataState } from "../../context/LiveData/LiveDataReducer";
import BannerFormat from "./BannerFormat";
import { type PopupState } from "../../context/LiveData/types";
import TimerOpts from "./TimerOpts";

export default function LiveText({ popupState }: { popupState: PopupState }) {
  const { state, dispatch } = useLiveData();
  const { visiblePopup, setVisiblePopup } = popupState;

  return (
    <div>
      <div className="flex justify-between">
        <TimerOpts timer={state.timer} timerKey={"timer"} dispatch={dispatch} />
        <TimerOpts timer={state.breakTimer} timerKey={"breakTimer"} dispatch={dispatch} />
      </div>

      <div className="flex gap-4">
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
      </div>
    </div>
  );
}


