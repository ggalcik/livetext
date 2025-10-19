import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NO_ACTIVE_BANNER, NO_ACTIVE_SPOT } from "../../../context/LiveData/types";
import type { LiveDataState } from "../../../context/LiveData/types";
import { initialLiveDataState } from "../../../context/LiveData/LiveDataReducer";

import Background from "./Background";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import "./ItemTransitions.css";
import { useEffect, useRef } from "react";
import glog from "../../../components/glog";
import { ItemTransition } from "./ItemTransition";
import { ProgressWheel } from "../../../components/ProgressWheel";
import RotateCountdown from "../../BannerAdmin/RotateCountdown";


export default function LiveText({ state }: { state: LiveDataState }) {
  // export default function LiveText() {
  // const { state } = useLiveData();
  // glog(state);
  const activeBannerIndex = state.activeBanner;
  const activeSpotIndex = state.activeSpot;

  const defaultBannerCSS = {
    ...initialLiveDataState.defaultBannerCSS,
    ...state.defaultBannerCSS,
  };
  const defaultSpotCSS = {
    ...initialLiveDataState.defaultSpotCSS,
    ...state.defaultSpotCSS,
  };

  const showBanner =
    activeBannerIndex !== NO_ACTIVE_BANNER &&
    state.displayBanners &&
    !state.timer.waiting;

  const showSpot = activeSpotIndex !== NO_ACTIVE_SPOT && state.displaySpots;

  const altBackground = !(state.backgroundImage === 'Angry'
    && (state.breakTimer.on && !state.breakTimer.waiting)
    || !(state.displayBanners || state.displaySpots));

  return (
    <>
      <MasterViewport name="livetext" needCtrl>

        <Background which={state.backgroundImage}
          showAngerBits={state.backgroundImage === 'Angry' &&
            !(state.displayBanners || state.displaySpots)
          }
          altBackground={altBackground}
        />

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
          <div className="absolute top-0 -left-6 scale-80">
            <ProgressWheel timer={state.timer} size={90} />
          </div>
        )}

        {!state.breakTimer.waiting &&
          state.displayBanners && (
            <div className="absolute bottom-0 right-1/12 scale-80">
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


      {/* <div className="absolute flex flex-nowrap top-4 left-4 gap-8 text-white leading-10 items-center">
        <div className="flex flex-nowrap">
          timer: <RotateCountdown timerKey="timer" nextTimerKey="breakTimer" />
          </div>
       <div className="flex flex-nowrap">
       breakTimer:  <RotateCountdown timerKey="breakTimer" nextTimerKey="timer" /> 
        </div>
    </div> */}
    </>
  );
}
