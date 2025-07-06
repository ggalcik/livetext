import clsx from "clsx";
import { NO_ACTIVE_BANNER } from "./context/LiveData/types";
import type { LiveDataState } from "./context/LiveData/types";
import BannerDisplay from "./BannerDisplay";
import { initialLiveDataState } from "./context/LiveData/LiveDataReducer";
import SpotDisplay from "./features/Spots/SpotDisplay";

import ProgressDots from "./ProgressDots";
import Background from "./Background";

export default function LiveText({ state }: { state: LiveDataState }) {
  // if (state.activeBanner === null) return "[no banner]";

  const activeBanner =
    state.activeBanner === NO_ACTIVE_BANNER ? null : state.banners[state.activeBanner];
  const defaultCSS = {
    ...initialLiveDataState.bannerCSS,
    ...state.bannerCSS,
  };

  const showBanner =
    state.activeBanner !== NO_ACTIVE_BANNER &&
    activeBanner &&
    state.displayBanners &&
    !state.timer.paused;
  const showSpot = state.activeSpot !== null && state.spots[state.activeSpot] && state.displaySpots;


  return (
    // main container
    <div className={clsx(`h-[100vh] overflow-hidden relative]`)}>
      {/* safety container - regular bounds for display capture area */}
      <div className="flex items-center justify-center absolute w-full h-full p-18 ">
        <div className="absolute ">
          <Background which={state.backgroundImage} />
        </div>{" "}
        {!state.banners.length && "[no banners]"}
        {state.activeBanner !== NO_ACTIVE_BANNER &&
          !activeBanner &&
          state.displayBanners &&
          "[something wrong]"}
        {showBanner && (
          <BannerDisplay
            key={state.activeBanner}
            banner={activeBanner}
            defaultCSS={defaultCSS}
            initialCSS={initialLiveDataState.bannerCSS}
          />
        )}
        {!state.spots.length && state.displaySpots && "[no spots]"}
        {showSpot && state.activeSpot !== null && (
          
          <SpotDisplay
            key={`spot-${state.activeSpot}`}
            spot={state.spots[state.activeSpot]}
            defaultCSS={state.spotCSS ?? initialLiveDataState.spotCSS}
            initialCSS={initialLiveDataState.spotCSS}
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
      </div>
    </div>
  );
}
