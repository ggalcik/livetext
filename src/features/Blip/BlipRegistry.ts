import Egregore from "./Egregore";
import Goalpost from "./Goalpost";
import HolyHonkers from "./HolyHonkers";
import MammaMia from "./MammaMia";
import  Orchestra from "./Orchestra";
import Snail from "./Snail";
import WhySoAngry from "./WhySoAngry";
import type { BlipEntry, IBlipType } from "./types";


export const BLIP_COMPONENTS: Record<IBlipType, BlipEntry> = {
  Egregore,
  "Holy Honkers": HolyHonkers,
  "Holy Sulfur": {component: HolyHonkers, opts: {alt: 'sulfur'}},
  Orchestra,
  Snail: {component: Snail, opts: {}, 
    variants: {
      '1a': {opts: {variant: '1a'}},
      '1b': {opts: {variant: '1b'}},
      '2': {opts: {variant: '2'}},
      '3': {opts: {variant: '3'}},
      'N': {opts: {variant: 'N'}},
    }},
  'Mamma Mia': MammaMia,
  Goalpost,
  "Why Angry": WhySoAngry,
}; 
