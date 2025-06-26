export interface Banner {
  text: string;
  bannerCSS: Partial<BannerCSS>;
}

export interface Spot {
  text: string;
  spotCSS: Partial<SpotCSS>;
  counter?: number;
  addl?: string;
}

export interface BannerCSS {
  padding: string;
  font: string;
  textAlign: "left" | "center" | "right";
  color: string;
  backgroundColor: string;
  onBox?: boolean;
  textShadow: string;
}

export type SpotCSS = BannerCSS;

export interface LiveDataState {
  backgroundOn: boolean;
  dateMark?: string;
  banners: Banner[];
  displayBanners: boolean;
  activeBanner: number | null;
  spots: Spot[];
  displaySpots: boolean;
  activeSpot: number | null;
  timer: {
    on: boolean;
    interval: number | null;
    countdown: number | null;
    interimInterval?: number | null;
    interimCountdown?:  number | null;
  };
  saveToStorage: boolean;
  bannerCSS: BannerCSS;
  spotCSS: SpotCSS;
}

export const NO_ACTIVE_BANNER = null;
export const NO_ACTIVE_SPOT = null;

export function createBanner(): Banner {
  return {
    text: "",
    bannerCSS: {},
  };
}

export function createSpot(): Spot {
  return {
    text: "",
    spotCSS: {},
  };
}

export type LiveDataAction =
  | { type: "background/toggle" }
  | { type: "banner/add";payload: { idx: number } }
  | { type: "banner/change"; payload: { idx: number; text: string } }
  | { type: "banner/delete"; payload: { idx: number } }
  | { type: "banner/setActive"; payload: { idx: number } }
  | { type: "banner/setNextActive" }
  | { type: "banner/toggle" }
  | { type: "banner/solo" }
  | { type: "spot/add" }
  | { type: "spot/change"; payload: { idx: number; text: string } }
  | { type: "spot/delete"; payload: { idx: number } }
  | { type: "spot/setActive"; payload: { idx: number } }
  | { type: "spot/toggle" }
  | { type: "spot/solo" }
  | { type: "timer/toggle" }
  | { type: "timer/setInterval"; payload: { interval: number | null } }
  | { type: "timer/setCountdown" }
  | { type: "localStorage/toggle" }
  | { type: "bannerCSS"; payload: { banner: "default" | number; cssPayload: Partial<BannerCSS> } }
  | { type: "spotCSS"; payload: { spot: "default" | number; cssPayload: Partial<SpotCSS> } }
  | { type: "dateMark"; payload: { dateMark: string } };

 export  type VisiblePopup = 
  | { banner: number | "default" }
  | { spot: number | "default" }
  | null;
export interface PopupState {
  visiblePopup: VisiblePopup;
  setVisiblePopup: React.Dispatch<React.SetStateAction<VisiblePopup> | null>;
}



