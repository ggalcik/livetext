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
        return () => { setPanelScene({ active: null }) };
    }, []);

    return (
        
        <div className="text-black">

            {panelTypes.map((panelName, i) => {
                const panel = panels[panelName];
                const adminElement = panels[panelName]?.adminElement ? panels[panelName]?.adminElement as ReactNode : <></>
                return (
                    <div className="grid grid-cols-[auto_auto] gap-6 w-max">
                        <div>
                            {/* <Button mode={panelName === panelScene.active?.panel ? 'activated' : null} 
                                onClick={() => showPanel(panelName)}> */}
                            <Button className={panelName === panelScene.active?.panel
                                ? 'ring-4 ring-black'
                                : 'ring-4 ring-white'} onClick={() => showPanel(panelName)}>
                                <div key={i}>{panelName}</div>
                            </Button>
                        </div>
                        <div>
                            {adminElement }
                        </div>
                        {/* <div>
                            {panel.boomerangDelay && boomerang && `boomerang: ${panel.boomerangDelay} seconds`}
                        </div> */}
                    </div>

                )
            }
            )}
        </div>

    )
} 