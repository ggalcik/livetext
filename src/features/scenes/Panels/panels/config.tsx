import type { IPanel, IPanels } from "../types";
import dling from '/src/assets/ding.mp3';
import { WhySoAngry, WhySoAngryAdmin, WhySoAngryBackground } from "./WhySoAngry";
import { Aaaaamennnn, AaaaamennnnBackground } from "./Aaaamennnn";
import { HolyHonkers, HolyHonkersBackground } from "./HolyHonkers";
import { Chalkboard, ChalkboardAdmin, ChalkboardBackground } from "./Chalkboard";
import { Hypotheticheck, HypotheticheckAdmin, HypotheticheckBackground } from "./Hypotheticheck";
import { Christolyzer, ChristolyzerAdmin, ChristolyzerBackground } from "./Christolyzer";
import { Winner, WinnerAdmin, WinnerBackground } from "./Winner";

export const panels: IPanels = {

    'Christolyzer': {
        element: <Christolyzer />,
        backgroundElement: <ChristolyzerBackground />,
        adminElement: <ChristolyzerAdmin />,
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
    'Winner': {
        noViewport: true,
        element: <Winner />,
        backgroundElement: <WinnerBackground />,
        adminElement: <WinnerAdmin />,
    },
}
