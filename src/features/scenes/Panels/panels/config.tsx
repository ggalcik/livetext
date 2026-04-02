import type { IPanel, IPanels } from "../types";
import dling from '/src/assets/ding.mp3';
import { WhySoAngry, WhySoAngryAdmin, WhySoAngryBackground } from "./WhySoAngry";
import { Aaaaamennnn, AaaaamennnnBackground } from "./Aaaamennnn";
import { HolyHonkers, HolyHonkersBackground } from "./HolyHonkers";
import { Chalkboard, ChalkboardAdmin, ChalkboardBackground } from "./Chalkboard";
import { Hypotheticheck, HypotheticheckAdmin, HypotheticheckBackground } from "./Hypotheticheck";

export const panels: IPanels = {

    'Hypotheticheck':
    {
        element: <Hypotheticheck />,
        backgroundElement: <HypotheticheckBackground />,
        adminElement: <HypotheticheckAdmin />,
    },
    'Chalkboard':
    {
        element: <Chalkboard />,
        backgroundElement: <ChalkboardBackground />,
        adminElement: <ChalkboardAdmin />,
        ctrlViewport: true,
    },

    'Aaaamennn':
    {
        soundEnter: dling,
        noViewport: true,
        element: <Aaaaamennnn />,
        backgroundElement: <AaaaamennnnBackground />,
    },



}