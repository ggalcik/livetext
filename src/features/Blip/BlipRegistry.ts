import Egregore from "./Egregore";
import Goalpost from "./Goalpost";
import HolyHonkers from "./HolyHonkers";
import MammaMia from "./MammaMia";
import Orchestra from "./Orchestra";
import Snail from "./Snail";
import WhySoAngry from "./WhySoAngry";
import type { BlipEntry, IBlipType } from "./types";


export const BLIP_COMPONENTS: Record<IBlipType, BlipEntry> = {
  "Why Angry": WhySoAngry,
  "Holy Honkers": {
    component: HolyHonkers, opts: {},
    variants: ['sailor', 'sulfur'],
  },
  Snail: {
    component: Snail, opts: {},
    variants: ['1a', '1b', '2', '3', 'N']
  },
  'Mamma Mia': MammaMia,
  Orchestra,
  Goalpost,
  Egregore,
}; 
