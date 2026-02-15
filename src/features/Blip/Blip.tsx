import { produce } from "immer";
import { usePersistentState } from "../../hooks/usePersistentState"
import { BLIP_COMPONENTS } from "./BlipRegistry"
import { BlipDataSchema } from "./types"


export default function Blip() {

  const [blipData, setBlipData] = usePersistentState({
    storageKey: 'blipData',
    schema: BlipDataSchema,
    fallback: {}
  })

  if (!blipData.showBlip) return null;

  const endBlip = () => {
    setBlipData(produce((draft) => {
      draft.showBlip = undefined;
    }));

  }

  const BlipComponent = BLIP_COMPONENTS[blipData.showBlip];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <BlipComponent endBlip={endBlip} />
    </div>
  )
}