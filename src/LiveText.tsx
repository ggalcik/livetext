import clsx from "clsx";
import { NO_ACTIVE_BANNER } from "./context/LiveData/types";
import type { LiveDataState } from "./context/LiveData/types";
import LiveTextSlide from "./LiveTextSlide";
import { initialLiveDataState } from "./context/LiveData/LiveDataReducer";

export default function LiveText({ state }: { state: LiveDataState }) {

  if (state.activeBanner === null) return "[no banner]";

  const activeBanner = state.banners[state.activeBanner];
  const defaultCSS = {
    ...initialLiveDataState.bannerCSS,
    ...state.bannerCSS,
  };

  return (
    <div
      className={clsx("min-h-full overflow-hidden", {
        "bg-(--chromakey-color)": state.backgroundOn,
      })}
    >
      {!state.banners.length && "[no banners]"}
      {state.activeBanner !== NO_ACTIVE_BANNER && !activeBanner && "[something wrong]"}
      {state.activeBanner !== NO_ACTIVE_BANNER && activeBanner && (
        <LiveTextSlide
        key={state.activeBanner}
          banner={activeBanner}
          defaultCSS={defaultCSS}
          initialCSS={initialLiveDataState.bannerCSS}

        />
      )}
    </div>
  );
}
