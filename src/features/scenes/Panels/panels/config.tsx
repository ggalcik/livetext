import type { IPanel, IPanels } from "../types";
import dling from '/src/assets/ding.mp3';
import { WhySoAngry, WhySoAngryAdmin, WhySoAngryBackground } from "./WhySoAngry";
import { Aaaaamennnn, AaaaamennnnBackground } from "./Aaaamennnn";
import { HolyHonkers, HolyHonkersBackground } from "./HolyHonkers";
import { Chalkboard, ChalkboardAdmin, ChalkboardBackground } from "./Chalkboard";
import { Hypotheticheck, HypotheticheckAdmin, HypotheticheckBackground } from "./Hypotheticheck";
import { Chrystolyzer, ChrystolyzerAdmin, ChrystolyzerBackground } from "./Chrystolyzer";

export const panels: IPanels = {

    'Chrystolyzer': {
        element: <Chrystolyzer />,
        backgroundElement: <ChrystolyzerBackground />,
        adminElement: <ChrystolyzerAdmin />,
        ctrlViewport: true,
    },
    'Chalkboard':
    {
        element: <Chalkboard />,
        backgroundElement: <ChalkboardBackground />,
        adminElement: <ChalkboardAdmin />,
        ctrlViewport: true,
    },
    'Hypotheticheck':
    {
        element: <Hypotheticheck />,
        backgroundElement: <HypotheticheckBackground />,
        adminElement: <HypotheticheckAdmin />,
    },
    'Aaaamennn':
    {
        soundEnter: dling,
        noViewport: true,
        element: <Aaaaamennnn />,
        backgroundElement: <AaaaamennnnBackground />,
    },



}