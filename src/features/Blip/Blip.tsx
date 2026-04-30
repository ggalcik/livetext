import { produce } from "immer";
import { usePersistentState } from "../../hooks/usePersistentState"
import { BLIP_COMPONENTS } from "./BlipRegistry"
import { BlipDataSchema, type BlipEntry, type BlipProps } from "./types"


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
      draft.showBlipVariant = undefined;
    }));

  }

  const registryEntry = BLIP_COMPONENTS[blipData.showBlip];

  let BlipComponent: React.ComponentType<BlipProps>;
  let opts: Record<string, string|boolean> | undefined;

  if (isConfiguredEntry(registryEntry)) {
    BlipComponent = registryEntry.component;
    const variantOpts = blipData.showBlipVariant
      ? registryEntry.variants?.[blipData.showBlipVariant]?.opts
      : undefined;
    opts = { ...registryEntry.opts, ...variantOpts };
  } else {
    BlipComponent = registryEntry;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <BlipComponent endBlip={endBlip} opts={opts} />
    </div>
  )
}

function isConfiguredEntry(entry: BlipEntry): entry is Exclude<BlipEntry, React.ComponentType<BlipProps>> {
  return "component" in entry;
}
