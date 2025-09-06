
import { createBanner, createSpot, NO_ACTIVE_BANNER, NO_ACTIVE_SPOT } from "./types";
import type { LiveDataState, LiveDataAction, Banner } from "./types";
import { LiveDataStateSchema, makeInitialLiveDataState, backgroundOptions } from './types';

import workingData from "./workingData.json";

export const initialLiveDataState = makeInitialLiveDataState();

export function loadInitialState(): LiveDataState {
  // 1. Try localStorage
  try {
    const stored = localStorage.getItem("liveData");
    if (stored) {
      const parsed = JSON.parse(stored);
      const result = LiveDataStateSchema.safeParse(parsed);
      if (result.success) {
        return result.data;
      } else {
        console.warn("Invalid localStorage data:", result.error.format());
      }
    }
  } catch (e) {
    console.warn("Unable to load from localStorage", e);
  }

  // 2. Try workingData.json
  try {
    const result = LiveDataStateSchema.safeParse(workingData);
    if (result.success) {
      return result.data;
    } else {
      console.warn("Invalid workingData.json:", result.error.format());
    }
  } catch (e) {
    console.warn("Unable to load workingData.json", e);
  }

  // 3. Fallback
  return initialLiveDataState;
}

export function liveDataReducerPersistence(
  state: LiveDataState,
  action: LiveDataAction
): LiveDataState {
  const newState = liveDataReducer(state, action);
  if (newState.saveToStorage) {
    try {
      localStorage.setItem("liveData", JSON.stringify(newState));
    } catch (e) {
      console.warn("Unable to save to localStorage", e);
    }
  }
  return newState;
}

export function liveDataReducer(state: LiveDataState, action: LiveDataAction): LiveDataState {
  //  console.log("banners %o, action %o", state.banners, action);

  function getNextActiveBannerIdx(): number | null {
    const startIdx = state.activeBanner;
    const bannersLength = state.banners.length;
    if (startIdx === null || bannersLength <= 1) return null;

    let nextIdx = (startIdx + 1) % bannersLength;
    while (nextIdx != startIdx) {
      const nextBanner = state.banners[nextIdx];
      if (nextBanner && nextBanner.type === 'rotating' && nextBanner.on) return nextIdx;
      nextIdx = (nextIdx + 1) % bannersLength;
    }
    return null;
  }

  switch (action.type) {
    case "background/toggle":
      return {
        ...state,
        backgroundOn: !state.backgroundOn,
      };
    case "background/change": {
      return {
        ...state,
        backgroundImage: action.payload.which,
      };
    }
    // case "masterViewportCSS/padding": {

    //     return {
    //       ...state,
    //       masterViewportCSS: {
    //         ...state.masterViewportCSS,
    //         ...action.payload,
    //       },
    //     };

    // }
    case "banner/add": {
       const bannersKey = action.payload.type === 'rotating' ? 'banners' : 'spots';
       const activeBanner = (bannersKey === 'banners' ? state.activeBanner : state.activeSpot) ?? 0;

      const addAtIdx = action.payload.idx;

      const newBanners = [
        ...state[bannersKey].slice(0, addAtIdx),
        bannersKey === 'banners' ? createBanner() : createSpot(),
        ...state[bannersKey].slice(addAtIdx),
      ];
      return {
        ...state,
        [bannersKey]: newBanners,
        activeBanner,
      };
    }
    case "banner/change": {
      const key = action.payload.type === 'rotating' ? 'banners' : 'spots';
      return {
        ...state,
        [key]: state[key].map((banner, idx) =>
          idx === action.payload.idx ? { ...banner, ...action.payload } as Banner : banner
        ),
      }

    }
    case "banner/delete": {
      const bannerType = action.payload.type;
      const key = action.payload.type === 'rotating' ? 'banners' : 'spots';
      const banners = state[key].filter((_, i) => i !== action.payload.idx);

      let activeBanner = state.activeBanner;
      if (bannerType === 'rotating') {
        if (activeBanner !== null && activeBanner >= banners.length)
          activeBanner = banners.length - 1;
        if (activeBanner !== null && banners.length == 0) activeBanner = NO_ACTIVE_BANNER;
      }
        
      return {
        ...state,
        [key]: banners,
        activeBanner,
      };
    }
    case "banner/setActive":{
      const active = (action.payload.type === 'rotating' ? 'activeBanner' : 'activeSpot');
      const newState =  {
        ...state,
        [active]: action.payload.idx,
      };
// console.log(action.payload.idx, newState[active], newState);
return newState;
      ;}
    case "banner/setNextActive": {
      if (state.activeBanner == null) return state;
      const nextActive = getNextActiveBannerIdx();
      if (nextActive == null) return state;
      return {
        ...state,
        activeBanner: nextActive,
      };
    }
    case "banner/toggle":
      return {
        ...state,
        displayBanners: !state.displayBanners,
      };
    case "banner/toggleOne": {
      const thisBannerIdx = action.payload.idx;
      let newActiveBanner = state.activeBanner;
      if (state.banners[thisBannerIdx].type !== "rotating") return state;

      if (state.activeBanner === thisBannerIdx && state.banners[thisBannerIdx].on)
        newActiveBanner = getNextActiveBannerIdx();
      if (state.activeBanner === null && !state.banners[thisBannerIdx].on)
        newActiveBanner = thisBannerIdx;

      return {
        ...state,
        activeBanner: newActiveBanner,
        banners: state.banners.map((banner, idx) =>
          banner.type === 'rotating' && idx === action.payload.idx ? { ...banner, on: !banner.on } : banner
        ),
      };
    }
    case "banner/solo":
      return {
        ...state,
        displaySpots: false,
        displayBanners: true,
      };
    // case "spot/add": {
    //   const activeSpot = state.activeSpot ?? 0;
    //   return {
    //     ...state,
    //     spots: [...state.spots, createSpot()],
    //     activeSpot,
    //   };
    // }
    // case "spot/change":
    //   return {
    //     ...state,
    //     spots: state.spots.map((spot, idx) =>
    //       idx === action.payload.idx ? { ...spot, ...action.payload } : spot
    //     ),
    //   };
    // case "spot/delete": {
    //   const spots = state.spots.filter((_, i) => i !== action.payload.idx);

    //   let activeSpot = state.activeSpot;
    //   if (activeSpot !== null && activeSpot >= spots.length) activeSpot = spots.length - 1;
    //   if (activeSpot !== null && spots.length == 0) activeSpot = NO_ACTIVE_BANNER;

    //   return {
    //     ...state,
    //     spots,
    //     activeSpot,
    //   };
    // }
    // case "spot/setActive":
    //   return {
    //     ...state,
    //     activeSpot: action.payload.idx,
    //   };
    case "spot/toggle":
      return {
        ...state,
        displaySpots: !state.displaySpots,
      };
    case "spot/solo":
      return {
        ...state,
        displaySpots: true,
        displayBanners: false,
      };
    case "timer/toggle": {
      const which = action.payload.which;
      if (!state[which].interval) return state;

      const isOn = state[which].on;
      const newState = {
        ...state,
        [which]: { ...state[which], on: !isOn },
      };

      // If we're turning OFF the main timer, also force breaktimer off
      if (which === "timer" && isOn) {
        return {
          ...newState,
          breakTimer: { ...state.breakTimer, on: false },
        };
      }

      return newState;
    }
    case "timer/params": {
      const { which, ...rest } = action.payload;
      return {
        ...state,
        [which]: { ...state[which], ...rest },
      };
    }
    case "localStorage/toggle":
      return {
        ...state,
        saveToStorage: !state.saveToStorage,
      };

    case "bannerCSS": {
      if (action.payload.banner === "default") {
        return {
          ...state,
          defaultBannerCSS: {
            ...state.defaultBannerCSS,
            ...action.payload.cssPayload,
          },
        };
      }

      const updatedBanners = state.banners.map((banner, index) => {
        if (index !== action.payload.banner) return banner;
        return {
          ...banner,
          bannerCSS: {
            ...banner.bannerCSS,
            ...action.payload.cssPayload,
          },
        };
      });

      return {
        ...state,
        banners: updatedBanners,
      };
    }

    case "spotCSS": {
      if (action.payload.spot === "default") {
        return {
          ...state,
          defaultSpotCSS: {
            ...state.defaultSpotCSS,
            ...action.payload.cssPayload,
          },
        };
      }

      const updatedSpots = state.spots.map((spot, index) => {
        if (index !== action.payload.spot) return spot;
        return {
          ...spot,
          spotCSS: {
            ...spot.bannerCSS,
            ...action.payload.cssPayload,
          },
        };
      });

      return {
        ...state,
        spots: updatedSpots,
      };
    }

    case "dateMark":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
