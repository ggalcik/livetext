import ObsSlides from "../scenes/Slides/ObsSlides";
import OverLiveDisplay from "../scenes/LiveDisplay/OverLiveDisplay";
import type { ObsLayerConfig } from "./types";

export type ObsSceneProps = {
  data?: Record<string, unknown>;
};

export type ObsSceneConfig = ObsLayerConfig & {
  component: React.ComponentType<ObsSceneProps>;
};

export const OBS_SCENES = {
  banners: { component: OverLiveDisplay },
  slides: {
    component: ObsSlides,
    insets: { top: 0, right: 100, bottom: 100, left: 100 },
  },
} satisfies Record<string, ObsSceneConfig>;

export type ObsSceneName = keyof typeof OBS_SCENES;
