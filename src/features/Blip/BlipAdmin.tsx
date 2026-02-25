import { usePersistentState } from "../../hooks/usePersistentState"
import { BlipDataSchema, blipTypes, type IBlipType } from "./types"

import { Button } from "../../components/Button";
import { produce } from "immer";

export default function BlipAdmin() {
    const [blipData, setBlipData] = usePersistentState({
        storageKey: 'blipData',
        schema: BlipDataSchema,
        fallback: {}
    })

    const isOn = blipData.showBlip;

    const setBlip = (showBlip?: IBlipType) => {

        setBlipData(produce((draft) => {
            draft.showBlip = showBlip;
        }));

    }



    return (
        <div className="flex gap-2 pt-2 pl-2 bg-green-200">
            {blipTypes.map(blip => {
                const isActive = blipData.showBlip === blip;
                return <Button
                    size="lg" 
                    key={`blip_${blip}`}
                    className="ring-black"
                    mode={isActive ? 'activated' : undefined}
                    onClick={() => setBlip(isActive ? undefined : blip)}
                >{blip}</Button>
            }
            )}
        </div>
    )


}


