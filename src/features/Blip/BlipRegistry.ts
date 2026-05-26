import Egregore from "./Egregore";
import Goalpost from "./Goalpost";
import Hello, { HelloAdmin } from "./Hello";
import HolyHonkers from "./HolyHonkers";
import MammaMia from "./MammaMia";
import Names from "./Names";
import Orchestra from "./Orchestra";
import Snail from "./Snail";
import WhySoAngry from "./WhySoAngry";
import type { BlipEntry, IBlipType } from "./types";


export const BLIP_COMPONENTS: Record<IBlipType, BlipEntry> = {
  "Why Angry": {
    component: WhySoAngry,
    opts: {},
    handlesDeactivate: true,
  },
  Snail: {
    component: Snail, opts: {},
    variants: ['1a', '1b', '2', '3', 'N']
  }, Names: {
    component: Names,
    opts: {},
    handlesDeactivate: true,
  }, Hello: {
    component: Hello,
    extendedComponent: HelloAdmin,
    opts: {},
  }, "Holy Honkers": {
    component: HolyHonkers, opts: {},
    variants: ['sailor', 'sulfur'],
  },
  Orchestra,
  'Mamma Mia': MammaMia,


  Goalpost,
  Egregore,
}; 
