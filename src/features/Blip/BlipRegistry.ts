import Egregore from "./Egregore";
import Goalpost from "./Goalpost";
import  HolyHonkers from "./HolyHonkers";
import  Orchestra from "./Orchestra";
import Snail from "./Snail";
import type { BlipProps, IBlipType } from "./types";

export const BLIP_COMPONENTS: Record<IBlipType, React.ComponentType<BlipProps>> = {
  Egregore,
  "Holy Honkers": HolyHonkers,
  Orchestra,
  'Snail': Snail,
  Goalpost
};