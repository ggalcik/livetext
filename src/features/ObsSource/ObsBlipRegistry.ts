import Egregore from "../Blip/Egregore";
import ForeverAtheist from "../Blip/ForeverAtheist";
import HolyHonkers from "../Blip/HolyHonkers";
import MammaMia from "../Blip/MammaMia";
import OverAnalogy from "../Blip/OverAnalogy";
import OverSnail from "../Blip/OverSnail";
import OverOrchestra, { OverOrchestraAdmin } from "../Blip/OverOrchestra";
import SadWindow from "../Blip/SadWindow";
import WhyDoThis, { WhyDoThisAdmin } from "../Blip/WhyDoThis";
import type { BlipProps, BlipVariant } from "../Blip/types";
import type { ObsLayerConfig } from "./types";

export type ObsBlipConfig = ObsLayerConfig & {
  component: React.ComponentType<BlipProps>;
  label?: string;
  variants?: BlipVariant[];
  defaultVariant?: string;
  extendedComponent?: React.ComponentType<{ sendAction: (action: string) => void }>;
};

export const OBS_BLIPS = {
  Analogy: {
    component: OverAnalogy,
  },
  Egregore: {
    component: Egregore,
  },
  Forever: {
    component: ForeverAtheist,
  },
  "Holy Honkers": {
    component: HolyHonkers,
    variants: ["sailor"],
  },
  "Mamma Mia": {
    component: MammaMia,
  },
  Orchestra: {
    component: OverOrchestra,
    extendedComponent: OverOrchestraAdmin,
  },
  SadWindow: {
    component: SadWindow,
    label: "Sad Window",
  },
  Snail: {
    component: OverSnail,
    variants: ["1a", "1b", "2", "3", "N", "Xeno"],
  },
  "Why Do This": {
    component: WhyDoThis,
    extendedComponent: WhyDoThisAdmin,
      insets: {
    top: -100,
    right: -60,
    bottom:0,
    left: -60,
  },
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
