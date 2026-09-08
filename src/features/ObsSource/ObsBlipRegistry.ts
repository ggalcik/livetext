import Egregore from "../Blip/Egregore";
import HolyHonkers from "../Blip/HolyHonkers";
import MammaMia from "../Blip/MammaMia";
import OverSnail from "../Blip/OverSnail";
import type { BlipProps, BlipVariant } from "../Blip/types";
import type { ObsLayerConfig } from "./types";

export type ObsBlipConfig = ObsLayerConfig & {
  component: React.ComponentType<BlipProps>;
  label?: string;
  variants?: BlipVariant[];
  defaultVariant?: string;
};

export const OBS_BLIPS = {
  Egregore: {
    component: Egregore,
  },
  "Holy Honkers": {
    component: HolyHonkers,
    variants: ["sailor"],
  },
  "Mamma Mia": {
    component: MammaMia,
  },
  Snail: {
    component: OverSnail,
    variants: ["1a", "1b", "2", "3", "N", "Xeno"],
  },
} satisfies Record<string, ObsBlipConfig>;

export type ObsBlipName = keyof typeof OBS_BLIPS;

export function getObsVariant(config: ObsBlipConfig, variantId?: string) {
  if (!variantId) return undefined;
  const variant = config.variants?.find((entry) =>
    typeof entry === "string" ? entry === variantId : entry.variant === variantId
  );
  return typeof variant === "string" ? { variant } : variant;
}
