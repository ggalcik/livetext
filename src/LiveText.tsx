import clsx from "clsx";
import { NO_ACTIVE_BANNER } from "./context/LiveData/types";
import type { LiveDataState } from "./context/LiveData/types";
import BannerDisplay from "./BannerDisplay";
import { initialLiveDataState } from "./context/LiveData/LiveDataReducer";
import SpotDisplay from "./features/Spots/SpotDisplay";
import Angry from "./assets/angry_atheist.png";

export default function LiveText({ state }: { state: LiveDataState }) {
  if (state.activeBanner === null) return "[no banner]";

  const activeBanner = state.banners[state.activeBanner];
  const defaultCSS = {
    ...initialLiveDataState.bannerCSS,
    ...state.bannerCSS,
  };

  return (
    // main container
    <div className={clsx(`h-[100vh] overflow-hidden relative]`)}>
      {/* image */}
      <div className="absolute border border-white">
        <img className="p-10" src={Angry} />
      </div>
      {/* safety container */}
      <div className="flex items-center absolute w-full h-full p-18 ">
        {!state.banners.length && "[no banners]"}
        {state.activeBanner !== NO_ACTIVE_BANNER &&
          !activeBanner &&
          state.displayBanners &&
          "[something wrong]"}
        {state.activeBanner !== NO_ACTIVE_BANNER && activeBanner && state.displayBanners && (
          <BannerDisplay
            key={state.activeBanner}
            banner={activeBanner}
            defaultCSS={defaultCSS}
            initialCSS={initialLiveDataState.bannerCSS}
          />
        )}

        {!state.spots.length && state.displaySpots && "[no spots]"}
        {state.activeSpot !== null && state.spots[state.activeSpot] && state.displaySpots && (
          <div className="absolute top-0 w-full h-full ">
            <SpotDisplay
              key={`spot-${state.activeSpot}`}
              spot={state.spots[state.activeSpot]}
              defaultCSS={state.spotCSS ?? initialLiveDataState.spotCSS}
              initialCSS={initialLiveDataState.spotCSS}
            />
          </div>
        )}
      </div>
    </div>
  );
}
