import { Button } from "../../../components/Button";
import { usePersistentState } from "../../../hooks/usePersistentState"
import { IPanelSceneSchema, panelTypes, type IPanelType } from "./types"
import {panels} from './config';
import glog from "../../../components/glog";

interface IPanelsAdminProps {
    boomerang: ((delay: number) => void) | null;
}
export default function PanelsAdmin({boomerang}:IPanelsAdminProps) {

    const [panelScene, setPanelScene] = usePersistentState({
        storageKey: 'panelsScene',
        schema: IPanelSceneSchema,
        fallback: { active: null }
    })

    const showPanel = (panel: IPanelType) => {
        setPanelScene(
            {
                ...panelScene,
                active: { panel }
            }
        )
    }

   
    return (

        <div className="text-black">

            {panelTypes.map((panelName, i) => {
                const panel = panels[panelName];
 glog('panelName', panelName, 'boomerang',boomerang );
                return (
                    <div className="flex gap-2">
                        <div>
                            <Button onClick={() => showPanel(panelName)}>
                                <div key={i}>{panelName}</div>
                            </Button>
                        </div>
                        <div>
                            {panel.boomerangDelay && boomerang && `boomerang: ${panel.boomerangDelay} seconds`}
                        </div>
                    </div>

                )
            }
            )}
        </div>

    )
} 