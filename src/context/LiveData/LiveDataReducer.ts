import { createBanner, createSpot, NO_ACTIVE_BANNER, NO_ACTIVE_SPOT } from "./types";
import type { LiveDataState, LiveDataAction } from "./types";

export const initialLiveDataState: LiveDataState = {
  backgroundOn: true,
  dateMark: "",
  banners: [],
  spots: [],
  displayBanners: true,
  displaySpots: false,
  activeBanner: NO_ACTIVE_BANNER,
  activeSpot: NO_ACTIVE_SPOT,
  timer: {
    on: false,
    interval: null,
    countdown: null,
  },
  saveToStorage: true,
  bannerCSS: {
    padding: "10px",
    font: "bold 20px/1 sans-serif",
    textAlign: "right",
    color: "white",
    backgroundColor: "#ff6467",
    onBox: false,
    textShadow: "4px 4px #444",
  },
  spotCSS: {
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
   console.log("banners %o, action %o", state.banners, action);
  switch (action.type) {
    case "background/toggle":
      return {
        ...state,
        backgroundOn: !state.backgroundOn,
      };
    case "banner/add": {
      const activeBanner = state.activeBanner ?? 0;
      const addAtIdx = action.payload.idx;
      console.log("banners %o, addAtIdx %s", state.banners, addAtIdx);

      const newBanners = [
        ...state.banners.slice(0, addAtIdx),
        createBanner(),
        ...state.banners.slice(addAtIdx),
      ];
      return {
        ...state,
        banners: newBanners,
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
    case "banner/toggle":
      return {
        ...state,
        displayBanners: !state.displayBanners,
      };
    case "banner/solo":
      return {
        ...state,
        displaySpots: false,
        displayBanners: true,
      };
    case "spot/add": {
      const activeSpot = state.activeSpot ?? 0;
      return {
        ...state,
        spots: [...state.spots, createSpot()],
        activeSpot,
      };
    }
    case "spot/change":
      return {
        ...state,
        spots: state.spots.map((spot, idx) =>
          idx === action.payload.idx ? { ...spot, ...action.payload } : spot
        ),
      };
    case "spot/delete": {
      const spots = state.spots.filter((_, i) => i !== action.payload.idx);

      let activeSpot = state.activeSpot;
      if (activeSpot !== null && activeSpot >= spots.length) activeSpot = spots.length - 1;
      if (activeSpot !== null && spots.length == 0) activeSpot = NO_ACTIVE_BANNER;

      return {
        ...state,
        spots,
        activeSpot,
      };
    }
    case "spot/setActive":
      return {
        ...state,
        activeSpot: action.payload.idx,
      };
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

    case "spotCSS": {
      if (action.payload.spot === "default") {
        return {
          ...state,
          spotCSS: {
            ...state.spotCSS,
            ...action.payload.cssPayload,
          },
        };
      }

      const updatedSpots = state.spots.map((spot, index) => {
        if (index !== action.payload.spot) return spot;
        return {
          ...spot,
          spotCSS: {
            ...spot.spotCSS,
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
