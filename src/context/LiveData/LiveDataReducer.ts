
import glog from "../../components/glog";
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

  type SetActivePayload = Extract<LiveDataAction, { type: "banner/setActive" }>["payload"];

  function applySetActive(payload: SetActivePayload, state: LiveDataState) {
    const active = (payload.type === 'rotating' ? 'activeBanner' : 'activeSpot');
    const newState = {
      ...state,
      [active]: payload.idx,
    };

    return newState;
    ;
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

    case "banner/add": {
      //TODO: object with these keys n such to lookup instead of logic each time
      const bannersKey = action.payload.type === 'rotating' ? 'banners' : 'spots';
      const activeKey = action.payload.type === 'rotating' ? 'activeBanner' : 'activeSpot';
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
        [activeKey]: activeBanner,
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
    case "banner/setActive": {
      return applySetActive(action.payload, state);
    }
    case "banner/setNextActive": {
      if (state.activeBanner == null) return state;
      const nextActive = getNextActiveBannerIdx();
      if (nextActive == null) return state;
      return {
        ...state,
        activeBanner: nextActive,
      };
    }
    case "banner/move": {
      const { type, dir, idx } = action.payload;
      const key = type === "rotating" ? "banners" : "spots";
      const activeKey = type === "rotating" ? "activeBanner" : "activeSpot";
      const items = [...state[key]];

      const newIdx = idx + dir;
      glog("idx, newIdx, key, activeKey", idx, newIdx, key, activeKey);

      // Guard: if out of range, no change
      if (newIdx < 0 || newIdx >= items.length) {
        return state;
      }

      // Swap the elements
      const [moved] = items.splice(idx, 1);
      items.splice(newIdx, 0, moved);

      let newActive = state[activeKey];


      if (state[activeKey] === idx) {
        newActive = newIdx;
      } else if (state[activeKey] === newIdx) {
        newActive = idx;
      }

      return {
        ...state,
        [key]: items,
        [activeKey]: newActive,
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
      case "banner/solo": {
        const displayKey = action.payload.type === "rotating" ? "displayBanners" : "displaySpots";
        const otherDisplayKey = action.payload.type === "rotating" ? "displaySpots" : "displayBanners";
        return {
          ...state,
        [displayKey]: true,
        [otherDisplayKey]: false,
        }
      }

    case "banner/soloOne": {
      const newState = applySetActive(action.payload, state);
      const displayKey = action.payload.type === "rotating" ? "displayBanners" : "displaySpots";
      const otherDisplayKey = action.payload.type === "rotating" ? "displaySpots" : "displayBanners";
      const activeKey = action.payload.type === "rotating" ? "activeBanner" : "activeSpot";
      // const otherActiveKey = action.payload.type === "rotating" ? "activeSpot" : "activeBanner";

      // common display toggle
      let finalState = {
        ...newState,
        [activeKey]: action.payload.idx,
        [displayKey]: true,
        [otherDisplayKey]: false,
      };

      // extra timer handling for rotating
      if (action.payload.type === "rotating") {
        finalState = {
          ...finalState,
          timer: { ...finalState.timer, on: false, waiting: false },
          breakTimer: { ...finalState.breakTimer, on: false, waiting: true },
        };
      }
      return finalState;
    }



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
      const other = which === 'timer' ? 'breakTimer' : 'timer';

      const [thisTimer, otherTimer] = [{ ...state[which] }, { ...state[other] }];

      if (which === 'timer' && thisTimer.on && otherTimer.on) {
        thisTimer.waiting = false;
        otherTimer.waiting = true;
        otherTimer.on = false;
      } else if (which === 'breakTimer' && thisTimer.on) {
        thisTimer.waiting = true;
        otherTimer.waiting = false;
      }

      thisTimer.on = !thisTimer.on;


      const newState = {
        ...state,
        [which]: thisTimer,
        [other]: otherTimer,
      };
      // console.log(newState);
      return newState;
    }
    case "timer/off": {
      const which = action.payload.which;
      return {
        ...state,
        [which]: { ...state[which], on: false }
      }

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
          bannerCSS: {
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
