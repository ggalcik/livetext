import { produce } from "immer";
import { usePersistentState } from "../../hooks/usePersistentState"
import { BLIP_COMPONENTS } from "./BlipRegistry"
import { BlipDataSchema, type BlipEntry, type BlipProps, type BlipVariant } from "./types"


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
  let variant: string | undefined;
  let opts: Record<string, string|boolean> | undefined;

  if (isConfiguredEntry(registryEntry)) {
    BlipComponent = registryEntry.component;
    const selectedVariant = getSelectedVariant(
      registryEntry.variants,
      blipData.showBlipVariant
    );
    variant = selectedVariant?.variant;
    opts = { ...registryEntry.opts, ...selectedVariant?.opts };
  } else {
    BlipComponent = registryEntry;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <BlipComponent endBlip={endBlip} variant={variant} opts={opts} />
    </div>
  )
}

function isConfiguredEntry(entry: BlipEntry): entry is Exclude<BlipEntry, React.ComponentType<BlipProps>> {
  return "component" in entry;
}

function getSelectedVariant(variants: BlipVariant[] | undefined, variantId: string | undefined) {
  if (!variantId) return undefined;

  const variant = variants?.find((entry) =>
    typeof entry === "string" ? entry === variantId : entry.variant === variantId
  );

  if (!variant) return undefined;

  return typeof variant === "string"
    ? { variant }
    : variant;
}
