import { produce } from "immer";
import { usePersistentState } from "../../hooks/usePersistentState"
import { BLIP_COMPONENTS } from "./BlipRegistry"
import { BlipDataSchema, type BlipProps } from "./types"


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

  // const BlipComponent = BLIP_COMPONENTS[blipData.showBlip];


  const registryEntry = BLIP_COMPONENTS[blipData.showBlip];

  let BlipComponent: React.ComponentType<BlipProps>;
  let opts: Record<string, string|boolean> | undefined;

  if ("component" in registryEntry) {
    BlipComponent = registryEntry.component;
    opts = registryEntry.opts;
  } else {
    BlipComponent = registryEntry;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <BlipComponent endBlip={endBlip} opts={opts} />
    </div>
  )
}