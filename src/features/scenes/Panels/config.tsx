import type { IPanel, IPanels } from "./types";
import dling from '/src/assets/ding.mp3';

export const panels: IPanels = {
    'copy Rhizic':
    {
        soundEnter: dling,
        element: <div className="flex w-full h-full border bg-white">here it is</div>,
        backgroundElement: <div className="absolute top-0 left-0 w-full h-full bg-amber-500"></div>,
        boomerangDelay: 5,
    },

    'Las Lajas':
    {
        soundEnter: dling,
        element: <div>here it is</ div >
    },
    'Aaaamennn':
    {
        soundEnter: dling,
        element: <div>here it is</ div >
    },
}