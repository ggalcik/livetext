import { createBanner, NO_ACTIVE_BANNER } from "./types";
import type { LiveDataState, LiveDataAction } from "./types";

export const initialLiveDataState: LiveDataState = {
  backgroundOn: true,
  banners: [],
  activeBanner: NO_ACTIVE_BANNER,
  timer: {
    on: false,
    interval: null,
    countdown: null,
  },
  saveToStorage: true,
  bannerCSS: {
    padding: "10px",
    font: "bold 20px/1 sans-serif",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff6467",
    onBox: false,
    textShadow: "4px 4px #444",
  },
};

export function loadInitialState(): LiveDataState {
  try {
    const stored = localStorage.getItem("liveData");
    if (stored) return { ...initialLiveDataState, ...JSON.parse(stored) };
  } catch (e) {
    console.warn("Unable to load from localStorage", e);
  }
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
  switch (action.type) {
    case "background/toggle":
      return {
        ...state,
        backgroundOn: !state.backgroundOn,
      };
    case "banner/add": {
      const activeBanner = state.activeBanner ?? 0;
      return {
        ...state,
        banners: [...state.banners, createBanner()],
        activeBanner,
      };
    }
    case "banner/change":
      return {
        ...state,
        banners: state.banners.map((banner, idx) =>
          idx === action.payload.idx ? { ...banner, ...action.payload } : banner
        ),
      };
    case "banner/delete": {
      const banners = state.banners.filter((_, i) => i !== action.payload.idx);

      let activeBanner = state.activeBanner;
      if (activeBanner !== null && activeBanner >= banners.length)
        activeBanner = banners.length - 1;
      if (activeBanner !== null && banners.length == 0) activeBanner = NO_ACTIVE_BANNER;

      return {
        ...state,
        banners,
        activeBanner,
      };
    }
    case "banner/setActive":
      return {
        ...state,
        activeBanner: action.payload.idx,
      };
    case "banner/setNextActive":
      if (state.activeBanner === null || state.banners.length <= 1) return state;
      return {
        ...state,
        activeBanner: (state.activeBanner + 1) % state.banners.length,
      };
    case "timer/toggle":
      if (!state.timer.on && !state.timer.interval) return state;
      return {
        ...state,
        timer: { ...state.timer, on: !state.timer.on },
      };
    case "localStorage/toggle":
      return {
        ...state,
        saveToStorage: !state.saveToStorage,
      };
    case "timer/setInterval":
      return {
        ...state,
        timer: { ...state.timer, ...action.payload },
      };
    case "bannerCSS": {
      if (action.payload.banner === "default") {
        return {
          ...state,
          bannerCSS: {
            ...state.bannerCSS,
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
    default:
      return state;
  }
}
