export interface Banner {
  text: string;
  bannerCSS: Partial<BannerCSS>;
}


export interface LiveDataState {
  backgroundOn: boolean;
  banners: Banner[];
  activeBanner: number | null;
  timer: {
    on: boolean;
    interval: number | null;
    countdown: number | null;
  };
  saveToStorage: boolean;
  bannerCSS: {
    padding: string;
    font: string;
    textAlign: "left"| "center"| "right";
    color: string;
    backgroundColor: string;
    onBox?: boolean;
    textShadow: string;

  }
}
export type BannerCSS = LiveDataState["bannerCSS"];

export const NO_ACTIVE_BANNER = null;



export function createBanner(): Banner {
  return {
    text: "",
    bannerCSS: {}
  };
}

export type LiveDataAction =
  | { type: "background/toggle" }
  | { type: "banner/add" }
  | { type: "banner/change"; payload: { idx: number; text: string } }
  | { type: "banner/delete"; payload: { idx: number } }
  | { type: "banner/setActive"; payload: { idx: number } }
   | { type: "banner/setNextActive"}
  | { type: "timer/toggle" }
  | { type: "timer/setInterval"; payload: { interval: number | null } }
  | { type: "timer/setCountdown" }
  | { type: "localStorage/toggle" }
  | { type: "bannerCSS"; payload: { banner: "default" | number, cssPayload: Partial<BannerCSS> } }
  ;

export interface PopupState {
  visiblePopup: number | "default" | null;
  setVisiblePopup: React.Dispatch<React.SetStateAction<number | "default" | null>>;
}
