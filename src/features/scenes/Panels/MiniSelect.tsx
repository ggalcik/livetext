import { usePersistentState } from "../../../hooks/usePersistentState";
import { IPanelSceneSchema, panelTypes, type IPanelType } from "./types"
import { panels } from './panels/config';


interface IMiniSelectProps {
    activate: () => void;
}
export default function MiniSelect({ activate }: IMiniSelectProps) {

    const [panelScene, setPanelScene] = usePersistentState({
        storageKey: 'panelsScene',
        schema: IPanelSceneSchema,
        fallback: { active: null }
    })

    const zapToPanel = (panel: IPanelType) => {
        setPanelScene(prev => ({ ...prev, active: { panel } }));
        activate();
    }


    return (
        <div className="absolute z-10 bottom-0 left-0 text-sm translate-y-full bg-green-500">
            {panelTypes.map((panelName) =>
                <div key={panelName} className={`border-4 m-1 p-2 bg-yellow-50 hover:bg-yellow-200 ${panelScene.active?.panel === panelName ? 'border-black':'border-gray-500'}`}
                    onClick={(e) => { e.stopPropagation(); zapToPanel(panelName) }}>{panelName}</div>
            )}
        </div>
    );

}
