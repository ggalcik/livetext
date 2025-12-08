import type { IPanel, IPanels } from "../types";
import dling from '/src/assets/ding.mp3';
import { Rhizic, RhizicAdmin, RhizicBackground } from "./Rhizic";
import { LasLajas, LasLajasBackground } from "./LasLajas";
import { Aaaaamennnn, AaaaamennnnBackground } from "./Aaaamennnn";
import { HolyHonkers, HolyHonkersBackground } from "./HolyHonkers";
import { Orchestra, OrchestraAdmin, OrchestraBackground } from "./Orchestra";
import { Chalkboard, ChalkboardAdmin, ChalkboardBackground } from "./Chalkboard";

export const panels: IPanels = {
    'copy Rhizic':
    {
        soundEnter: dling,
        element: <Rhizic />,
        backgroundElement: <RhizicBackground />,
        adminElement: <RhizicAdmin />,
        boomerangDelay: 5,
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
    'Orchestra':
    {
        soundEnter: dling,
        element: <Orchestra />,
        adminElement: <OrchestraAdmin />,
        backgroundElement: <OrchestraBackground />,
    },
}