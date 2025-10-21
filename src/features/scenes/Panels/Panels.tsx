import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import { IPanelSceneSchema, type IPanels, type IPanelType } from "./types";
import { panels } from './config';
import { usePersistentState } from "../../../hooks/usePersistentState";
import type { ReactNode } from "react";

interface IPanelsProps {
    which: IPanelType;
}

export default function Panels({ which }: IPanelsProps) {
    const [panelScene] = usePersistentState({
        storageKey: 'panelsScene',
        schema: IPanelSceneSchema,
        fallback: { active: null }
    })
    const showPanel = panelScene.active?.panel;
    const element = showPanel ? panels[showPanel].element as ReactNode : <></>
    const backgroundElement = showPanel && panels[showPanel].backgroundElement
        ? panels[showPanel].backgroundElement as ReactNode
        : <></>

    return (
        <div className="absolute w-full h-full bg-amber-900">
            { backgroundElement }
            <MasterViewport name="counter">

                {element}

            </MasterViewport>
        </div>



    );
}


