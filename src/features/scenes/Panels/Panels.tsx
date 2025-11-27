import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import { IPanelSceneSchema, type IPanels, type IPanelType } from "./types";
import { panels } from './panels/config';
import { usePersistentState } from "../../../hooks/usePersistentState";
import { useEffect, type ReactNode } from "react";
import glog from "../../../components/glog";

interface IPanelsProps {
    which: IPanelType;
}

export default function Panels() {
    const [panelScene] = usePersistentState({
        storageKey: 'panelsScene',
        schema: IPanelSceneSchema,
        fallback: { active: null }
    })

        useEffect(() => {
        
    }, [panelScene.active]);


glog("panels: panelScene.active?.panel %s", panelScene.active?.panel);

    const showPanel = panelScene.active?.panel;
    const element = showPanel ? panels[showPanel].element as ReactNode : <></>
    const backgroundElement = showPanel && panels[showPanel].backgroundElement
        ? panels[showPanel].backgroundElement as ReactNode
        : <></>
    const ctrlViewport = showPanel && panels[showPanel].ctrlViewport;

    if (!panelScene.active) {
        return <div className="absolute w-full h-full bg-gradient-to-b from-purple-600 to-blue-600"></div>
    }

    return (
        <div className="absolute w-full h-full bg-amber-900">
            {backgroundElement}

            {showPanel && panels[showPanel].noViewport ? element :
                <MasterViewport name={`panel ${panelScene.active.panel}`} needCtrl={ctrlViewport}>
                    {element}
                </MasterViewport>
            }
        </div>



    );
}


