import clsx from "clsx";
import { NO_ACTIVE_BANNER } from "./context/LiveData/types";
import type { LiveDataState } from "./context/LiveData/types";
import BannerDisplay from "./BannerDisplay";
import { initialLiveDataState } from "./context/LiveData/LiveDataReducer";
import SpotDisplay from "./features/Spots/SpotDisplay";

export default function LiveText({ state }: { state: LiveDataState }) {
  if (state.activeBanner === null) return "[no banner]";

  const activeBanner = state.banners[state.activeBanner];
  const defaultCSS = {
    ...initialLiveDataState.bannerCSS,
    ...state.bannerCSS,
  };

  return (
    <div
      className={clsx("h-[99vh] overflow-hidden relative", {
        "bg-(--chromakey-color)": state.backgroundOn,
      })}
    >
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
  );
}
