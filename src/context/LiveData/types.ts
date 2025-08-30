import { z } from "zod";

export const MasterViewportCSSSchema = z.object({
  padding: z.string(),
});
export type MasterViewportCSS = z.infer<typeof MasterViewportCSSSchema>;


export const BannerCSSSchema = z.object({
  padding: z.string(),
  font: z.string(),
  textAlign: z.enum(["left", "center", "right"]),
  color: z.string(),
  backgroundColor: z.string(),
  onBox: z.boolean().optional(),
  textShadow: z.string(),
});
export type BannerCSS = z.infer<typeof BannerCSSSchema>;

export const BannerSchema = z.object({
  text: z.string(),
  bannerCSS: BannerCSSSchema.partial(), // matches Partial<BannerCSS>
  on: z.boolean().optional(),
});
export type Banner = z.infer<typeof BannerSchema>;


export const TimerSchema = z.object({
  on: z.boolean(),
  interval: z.number().nullable(),
  countdown: z.number().nullable(),
  paused: z.boolean(),
});
export type Timer = z.infer<typeof TimerSchema>;


export const backgroundOptions = [
  "",
  "Angry",
  "Dull",
  "Dull atheist agnostic",
  "Dull going to hell",
  "Dull not an atheist",
  "Dull The Question",
  "Dull uncaused cause",
  "Dull watchmaker",
  "Dull asleep",
  "Into Jesus",
  "Trolley problem",
  "Quadrant"
] as const;


export type BackgroundType = typeof backgroundOptions[number];

export const LiveDataStateSchema = z.object({
  backgroundOn: z.boolean(),
  backgroundImage: z.enum(backgroundOptions),
  banners: z.array(BannerSchema),
  defaultBannerCSS: BannerCSSSchema,
  displayBanners: z.boolean(),
  activeBanner: z.number().nullable(),
  spots: z.array(BannerSchema), // reuses Banner since Spot = Banner in your shape
  defaultSpotCSS: BannerCSSSchema,
  displaySpots: z.boolean(),
  activeSpot: z.number().nullable(),
  timer: TimerSchema,
  breakTimer: TimerSchema,
  saveToStorage: z.boolean(),
});
export type LiveDataState = z.infer<typeof LiveDataStateSchema>;

export function makeInitialLiveDataState(): LiveDataState {
  return {
    backgroundOn: true,
    backgroundImage: '',
    banners: [],
    spots: [],
    displayBanners: true,
    displaySpots: false,
    activeBanner: NO_ACTIVE_BANNER,
    activeSpot: NO_ACTIVE_SPOT,
    timer: {
      on: false,
      interval: 10,
      countdown: null,
      paused: false,
    },
    breakTimer: {
      on: false,
      interval: 4,
      countdown: null,
      paused: true,
    },
    saveToStorage: true,
    defaultBannerCSS: {
      padding: "10px",
      font: "bold 20px/1 sans-serif",
      textAlign: "right",
      color: "white",
      backgroundColor: "#ff6467",
      onBox: false,
      textShadow: "4px 4px #444",
    },
    defaultSpotCSS: {
      padding: "10px",
      font: "bold 20px/1 sans-serif",
      textAlign: "center",
      color: "white",
      backgroundColor: "#ff6467",
      onBox: false,
      textShadow: "4px 4px #444",
    },
  }
};

export const NO_ACTIVE_BANNER = null;
export const NO_ACTIVE_SPOT = null;

export function createBanner(): Banner {
  return {
    text: "",
    bannerCSS: {},
    on: false,
  };
}

export function createRotatingBanner(): Banner {
  return {
    text: "",
    bannerCSS: {},
    on: false,
  };
}

export function createSpot(): Banner {
  return {
    text: "",
    bannerCSS: {},
  };
}

type TimerKey = "timer" | "breakTimer";

export type LiveDataAction =
  | { type: "background/toggle" }
  | { type: "background/change"; payload: { which: BackgroundType } }
  | { type: "banner/add"; payload: { idx: number } }
  | { type: "banner/change"; payload: { idx: number; text: string } }
  | { type: "banner/delete"; payload: { idx: number } }
  | { type: "banner/setActive"; payload: { idx: number } }
  | { type: "banner/setNextActive" }
  | { type: "banner/toggle" }
  | { type: "banner/toggleOneOn"; payload: { idx: number } }
  | { type: "banner/solo" }
  | { type: "spot/add" }
  | { type: "spot/change"; payload: { idx: number; text: string } }
  | { type: "spot/delete"; payload: { idx: number } }
  | { type: "spot/setActive"; payload: { idx: number } }
  | { type: "spot/toggle" }
  | { type: "spot/solo" }
  | { type: "timer/params"; payload: Partial<Timer> & { which: TimerKey } }
  | { type: "timer/toggle"; payload: { which: TimerKey } }
  | { type: "localStorage/toggle" }
  | { type: "bannerCSS"; payload: { banner: "default" | number; cssPayload: Partial<BannerCSS> } }
  | { type: "spotCSS"; payload: { spot: "default" | number; cssPayload: Partial<BannerCSS> } }
  | { type: "dateMark"; payload: { dateMark: string } };

export type VisiblePopup = { banner: number | "default" } | { spot: number | "default" } | null;
export interface PopupState {
  visiblePopup: VisiblePopup;
  setVisiblePopup: React.Dispatch<React.SetStateAction<VisiblePopup> | null>;
}
