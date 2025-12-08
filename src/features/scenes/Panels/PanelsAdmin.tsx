import { Button } from "../../../components/Button";
import { usePersistentState } from "../../../hooks/usePersistentState"
import { IPanelSceneSchema, panelTypes, type IPanelType } from "./types"
import { panels } from './panels/config';
import glog from "../../../components/glog";
import { useEffect, type ReactNode } from "react";

interface IPanelsAdminProps {
    boomerang: ((delay: number) => void) | null;
}
export default function PanelsAdmin({ boomerang }: IPanelsAdminProps) {
    const [panelScene, setPanelScene] = usePersistentState({
        storageKey: 'panelsScene',
        schema: IPanelSceneSchema,
        fallback: { active: null }
    })

    const showPanel = (panel: IPanelType) => {
        setPanelScene(
            {
                ...panelScene,
                active: panelScene.active?.panel === panel ? null : { panel }
            }
        )
    }

    useEffect(() => {
        return () => {
            //  setPanelScene({ active: null })
        };
    }, [panelScene.active]);

    const activePanel = panelScene.active?.panel || null;
    const adminElement = activePanel && panels[activePanel].adminElement ? panels[activePanel]?.adminElement as ReactNode : null;

    return (

        <div className="flex w-max text-black gap-4">

            <div className="">

                <div className="border bg-green-200 p-2">

                    {panelTypes.map((panelName, i) => {
                        
                        // const adminElement = panels[panelName]?.adminElement ? panels[panelName]?.adminElement as ReactNode : <></>
                        return (
                            <div key={panelName}>
                                {/* <Button mode={panelName === panelScene.active?.panel ? 'activated' : null} 
                                onClick={() => showPanel(panelName)}> */}
                                <Button className={panelName === panelScene.active?.panel
                                    ? 'ring-4 ring-black'
                                    : 'ring-4 ring-green-200 opacity-80'} 
                                    onClick={() => showPanel(panelName)}>
                                    <div key={i}>{panelName}</div>
                                </Button>
                            </div>

                        )
                    }
                    )}

                </div>
            </div>

            {adminElement && <div>{adminElement}</div>}


        </div>

    )
} 