import Analogy from "./Analogy";
import Egregore from "./Egregore";
import Goalpost from "./Goalpost";
import Hello, { HelloAdmin } from "./Hello";
import HolyHonkers from "./HolyHonkers";
import MammaMia from "./MammaMia";
import Names from "./Names";
import Orchestra from "./Orchestra";
import Snail from "./Snail";
import WhySoAngry, { WhySoAngryPick } from "./WhySoAngry";
import WhyDoThis from "./WhyDoThis";
import type { BlipEntry, IBlipType } from "./types";


export const BLIP_COMPONENTS: Record<IBlipType, BlipEntry> = {
  "Why Angry": {
    component: WhySoAngry,
    opts: {},
    variants: ["Pick"],
    variantExtendedComponents: {
      Pick: WhySoAngryPick,
    },
    handlesDeactivate: true,
  }, Hello: {
    component: Hello,
    extendedComponent: HelloAdmin,
    opts: {},
  },
  Snail: {
    component: Snail, opts: {},
    variants: ['1a', '1b', '2', '3', 'N', 'Xeno']
  }, "Holy Honkers": {
    component: HolyHonkers, opts: {},
    variants: ['sailor', 'sulfur'],
  },
  Orchestra,
  Egregore,
  Names: {
    component: Names,
    opts: {},
    handlesDeactivate: true,
  },
  "Why Do This": {
    component: WhyDoThis,
    opts: {},
    handlesDeactivate: true,
  },
  Analogy,
  'Mamma Mia': MammaMia,
  Goalpost,
}; 
