import { TransitionGroup } from "react-transition-group";
import { NO_ACTIVE_BANNER, NO_ACTIVE_SPOT } from "../../../context/LiveData/types";
import type { LiveDataState } from "../../../context/LiveData/types";
import { initialLiveDataState } from "../../../context/LiveData/LiveDataReducer";

import BreakDisplay from "./BreakDisplay";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import "./ItemTransitions.css";
import { ItemTransition } from "./ItemTransition";
import { ProgressWheel } from "../../../components/ProgressWheel";
import { combineBannerCSS } from "../../../context/LiveData/bannerCss";


export default function LiveText({ state }: { state: LiveDataState }) {

  // const { state } = useLiveData();
  // export default function LiveText() {
  // const { state } = useLiveData();
  // glog(state);
  const activeBannerIndex = state.activeBanner;
  const activeSpotIndex = state.activeSpot;

  const defaultBannerCSS = combineBannerCSS(
    initialLiveDataState.defaultBannerCSS,
    state.defaultBannerCSS
  );
  const defaultSpotCSS = combineBannerCSS(
    initialLiveDataState.defaultSpotCSS,
    state.defaultSpotCSS
  );

  const showBanner =
    activeBannerIndex !== NO_ACTIVE_BANNER &&
    state.displayBanners &&
    !state.timer.waiting;

  const showSpot = activeSpotIndex !== NO_ACTIVE_SPOT && state.displaySpots;

  return (
    <>
      <MasterViewport name="livetext" needCtrl>

        {(!(state.displayBanners || state.displaySpots) ||
          (state.displayBanners && state.breakTimer.on && !state.breakTimer.waiting)) && (
          <div className="absolute inset-x-0 top-0">
            <BreakDisplay />
          </div>
        )}

        <TransitionGroup component={null}>
          {state.banners.map((banner, i) => (
            <ItemTransition
              key={`banner-${banner.id}-${banner.type}`}
              kind="rotating"
              item={banner}
              isActive={showBanner && state.activeBanner === i}
              defaultCSS={defaultBannerCSS}
            />
          ))}
        </TransitionGroup>

        <TransitionGroup component={null}>
          {state.spots.map((spot, i) => (
            <ItemTransition
              key={`spot-${i}`}
              kind="spot"
              item={spot}
              isActive={showSpot && state.activeSpot === i}
              defaultCSS={defaultSpotCSS}
            />
          ))}
        </TransitionGroup>

        {showBanner && state.timer.on && state.timer.interval && (
          <div className="absolute -top-24 -left-6 scale-80">
            <ProgressWheel timer={state.timer} size={80} />
          </div>
        )}

        {!state.breakTimer.waiting &&
          state.displayBanners && (
            <div className="absolute -bottom-1/4 right-1/6 scale-80">
              <ProgressWheel timer={state.breakTimer} size={90} alt />
            </div>
          )}

        {/* Progress indicators */}
        {/* {showBanner && (
        <div className="absolute bottom-0 left-0 w-full px-18">
          <ProgressDots timer={state.timer} />
        </div>
      )}
      {state.breakTimer.on &&
        !state.breakTimer.waiting &&
        state.displayBanners && (
          <div className="absolute bottom-0 left-0 w-full px-18">
            <ProgressDots timer={state.breakTimer} alt />
          </div>
        )} */}
         
      </MasterViewport>
    </>
  );
}
