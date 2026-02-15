import Egregore from "./Egregore";
import  HolyHonkers from "./HolyHonkers";
import type { BlipProps, IBlipType } from "./types";

export const BLIP_COMPONENTS: Record<IBlipType, React.ComponentType<BlipProps>> = {
  Egregore,
  "Holy Honkers": HolyHonkers
};