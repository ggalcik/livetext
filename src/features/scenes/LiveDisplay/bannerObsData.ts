import { z } from "zod";
import { combineBannerCSS } from "../../../context/LiveData/bannerCss";
import { DEFAULT_BANNER_CSS, DEFAULT_SPOT_CSS } from "../../../context/LiveData/defaultBannerCss";
import type { Banner, LiveDataState } from "../../../context/LiveData/types";

const itemSchema = z.object({ id: z.string(), text: z.string(), css: z.string() });
export const bannerObsDataSchema = z.object({
  banner: itemSchema.nullable(),
  spot: itemSchema.nullable(),
  showAngry: z.boolean().default(false),
  width: z.number().min(1).max(100).default(100),
  top: z.number().min(0).max(100).default(50),
  scale: z.number().min(1).max(300).default(75),
  countdown: z.object({
    kind: z.enum(["timer", "breakTimer"]),
    interval: z.number().positive(),
    seconds: z.number(),
  }).nullable().default(null),
});
export type BannerObsData = z.infer<typeof bannerObsDataSchema>;

export function getBannerObsData(state: LiveDataState): BannerObsData {
  const kind = !state.timer.waiting && state.activeBanner !== null ? "timer" : "breakTimer";
  const timer = state[kind];
  const serialize = (item: Banner | undefined, initialCSS: string, defaultCSS: string) =>
    item ? { id: item.id, text: item.text, css: combineBannerCSS(initialCSS, defaultCSS, item.bannerCSS) } : null;
  return {
    width: state.obsWidth,
    top: state.obsTop,
    scale: state.obsScale,
    showAngry: !(state.displayBanners || state.displaySpots) ||
      (state.displayBanners && state.breakTimer.on && !state.breakTimer.waiting),
    countdown: state.displayBanners && timer.on && !timer.waiting &&
      timer.interval !== null && timer.interval > 0 && timer.countdown !== null
      ? { kind, interval: timer.interval, seconds: timer.countdown }
      : null,
    banner: state.displayBanners && !state.timer.waiting
      ? serialize(state.banners[state.activeBanner ?? -1], DEFAULT_BANNER_CSS, state.defaultBannerCSS)
      : null,
    spot: state.displaySpots
      ? serialize(state.spots[state.activeSpot ?? -1], DEFAULT_SPOT_CSS, state.defaultSpotCSS)
      : null,
  };
}
