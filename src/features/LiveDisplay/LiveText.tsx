import clsx from "clsx";
import { NO_ACTIVE_BANNER } from "../../context/LiveData/types";
import type { LiveDataState } from "../../context/LiveData/types";
import BannerDisplay from "../../BannerDisplay";
import { initialLiveDataState } from "../../context/LiveData/LiveDataReducer";

import ProgressDots from "../../ProgressDots";
import Background from "../../Background";
import ItemDisplay from "./ItemDisplay";
import { MasterViewport } from "./MasterViewport";

export default function LiveText({ state }: { state: LiveDataState }) {
  // if (state.activeBanner === null) return "[no banner]";

  const activeBanner =
    state.activeBanner === NO_ACTIVE_BANNER ? null : state.banners[state.activeBanner];

  const defaultBannerCSS = {
    ...initialLiveDataState.defaultBannerCSS,
    ...state.defaultBannerCSS,
  };
  const defaultSpotCSS = {
    ...initialLiveDataState.defaultSpotCSS,
    ...state.defaultSpotCSS,
  };

  const showBanner =
    state.activeBanner !== NO_ACTIVE_BANNER &&
    activeBanner &&
    state.displayBanners &&
    !state.timer.paused;
  const showSpot = state.activeSpot !== null && state.spots[state.activeSpot] && state.displaySpots;


  return (
    // main container


    <MasterViewport >


      <Background which={state.backgroundImage} />

      {!state.banners.length && "[no banners]"}
      {state.activeBanner !== NO_ACTIVE_BANNER &&
        !activeBanner &&
        state.displayBanners &&
        "[something wrong]"}
      {showBanner && (
        <BannerDisplay
          key={state.activeBanner}
          banner={activeBanner}
          defaultCSS={defaultBannerCSS}
          initialCSS={initialLiveDataState.defaultBannerCSS}
        />
      )}
      {!state.spots.length && state.displaySpots && "[no spots]"}
      {showSpot && state.activeSpot !== null && (
        <ItemDisplay

          key={`spot-${state.activeSpot}`}
          bannerType="spot"
          banner={state.spots[state.activeSpot]}
          defaultCSS={defaultSpotCSS}
          initialCSS={initialLiveDataState.defaultSpotCSS}

        />

      )}
      {showBanner && (
        <div className="absolute bottom-0 left-0 w-full px-18">
          <ProgressDots timer={state.timer} />
        </div>
      )}
      {state.breakTimer.on && !state.breakTimer.paused && state.displayBanners && (
        <div className="absolute bottom-0 left-0 w-full px-18">
          <ProgressDots timer={state.breakTimer} alt={true} />
        </div>
      )}
    </MasterViewport>

  );
}
