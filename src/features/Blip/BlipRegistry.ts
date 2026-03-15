import Egregore from "./Egregore";
import Goalpost from "./Goalpost";
import HolyHonkers from "./HolyHonkers";
import MammaMia from "./MammaMia";
import  Orchestra from "./Orchestra";
import Snail from "./Snail";
import type { BlipEntry, IBlipType } from "./types";


export const BLIP_COMPONENTS: Record<IBlipType, BlipEntry> = {
  Egregore,
  "Holy Honkers": HolyHonkers,
  "Holy Sulfur": {component: HolyHonkers, opts: {alt: 'sulfur'}},
  Orchestra,
  Snail,
  'Snail shell': {component: Snail, opts: {shell: true}},
  'Mamma Mia': MammaMia,
  Goalpost
}; 
