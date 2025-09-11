import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NO_ACTIVE_BANNER, NO_ACTIVE_SPOT } from "../../context/LiveData/types";
import type { LiveDataState } from "../../context/LiveData/types";
import { initialLiveDataState } from "../../context/LiveData/LiveDataReducer";

import ProgressDots from "../../ProgressDots";
import Background from "../../Background";
import ItemDisplay from "./ItemDisplay";
import { MasterViewport } from "./MasterViewport";

import "./ItemTransitions.css";
import { useRef } from "react";

export default function LiveText({ state }: { state: LiveDataState }) {
  const bannerNodeRef = useRef<HTMLDivElement>(null);
  const spotNodeRef = useRef<HTMLDivElement>(null);
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

  return (
    <MasterViewport>
      <Background which={state.backgroundImage} />

      {/* Banners */}
      <TransitionGroup component={null}>
        {showBanner && state.banners.map((banner, i) => {
          return activeBannerIndex === i ? (
            <CSSTransition
              key={`banner-${i}`}
              timeout={500}
              classNames="rotating"
              nodeRef={bannerNodeRef}
              unmountOnExit
            >
              <ItemDisplay
                ref={bannerNodeRef}
                bannerType="rotating"
                banner={banner}
                defaultCSS={defaultBannerCSS}
                initialCSS={initialLiveDataState.defaultBannerCSS}
              />
            </CSSTransition>
          ) : null;
        })}
      </TransitionGroup>

      {/* Spots */}
      <TransitionGroup component={null}>
        {showSpot && state.spots.map((spot, i) => {
          return activeSpotIndex === i ? (
            <CSSTransition
              key={`spot-${i}`}
              timeout={300}
              classNames="spot"
              nodeRef={spotNodeRef}
              unmountOnExit
            >
              <ItemDisplay
                ref={spotNodeRef}
                bannerType="spot"
                banner={spot}
                defaultCSS={defaultSpotCSS}
                initialCSS={initialLiveDataState.defaultSpotCSS}
              />
            </CSSTransition>
          ) : null
        })}
      </TransitionGroup>

      {/* Progress indicators */}
      {showBanner && (
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
        )}
    </MasterViewport>
  );
}
