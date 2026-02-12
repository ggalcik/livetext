import type { IPanel, IPanels } from "../types";
import dling from '/src/assets/ding.mp3';
import { WhySoAngry, WhySoAngryAdmin, WhySoAngryBackground } from "./WhySoAngry";
import { LasLajas, LasLajasBackground } from "./LasLajas";
import { Aaaaamennnn, AaaaamennnnBackground } from "./Aaaamennnn";
import { HolyHonkers, HolyHonkersBackground } from "./HolyHonkers";
import { Orchestra, OrchestraAdmin, OrchestraBackground } from "./Orchestra";
import { Chalkboard, ChalkboardAdmin, ChalkboardBackground } from "./Chalkboard";
import { Hypotheticheck, HypotheticheckAdmin, HypotheticheckBackground } from "./Hypotheticheck";
import { Egregore, EgregoreBackground } from "./Egregore";

export const panels: IPanels = {
    'Why So Angry':
    {
        soundEnter: dling,
        element: <WhySoAngry />,
        backgroundElement: <WhySoAngryBackground />,
        adminElement: <WhySoAngryAdmin />,
        boomerangDelay: 5,
    },
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
    'HolyHonkers':
    {
        // soundEnter: dling,
        element: <HolyHonkers />,
        backgroundElement: <HolyHonkersBackground />,
        
        boomerangDelay: 5,
    },
    
    'Las Lajas':
    {
        soundEnter: dling,
        noViewport: true,
        element: <LasLajas />,
        backgroundElement: <LasLajasBackground />,
    },
    'Aaaamennn':
    {
        soundEnter: dling,
        noViewport: true,
        element: <Aaaaamennnn />,
        backgroundElement: <AaaaamennnnBackground />,
    },
    'Egregore':
    {
        // soundEnter: dling,
        noViewport: true,
        element: <Egregore />,
        backgroundElement: <EgregoreBackground />,
    },
    'Orchestra':
    {
        soundEnter: dling,
        element: <Orchestra />,
        adminElement: <OrchestraAdmin />,
        backgroundElement: <OrchestraBackground />,
        ctrlViewport: true,
    },

}