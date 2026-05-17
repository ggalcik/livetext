import { usePersistentState } from "../../hooks/usePersistentState"
import { BlipDataSchema, type BlipVariant, type IBlipType } from "./types"

import { Button } from "../../components/Button";
import { produce } from "immer";
import { BLIP_COMPONENTS } from "./BlipRegistry";

export default function BlipAdmin() {
    const [blipData, setBlipData] = usePersistentState({
        storageKey: 'blipData',
        schema: BlipDataSchema,
        fallback: {}
    })

    const blipTypes = Object.keys(BLIP_COMPONENTS) as IBlipType[];

    const clearBlip = () => {
        setBlipData(produce((draft) => {
            draft.showBlip = undefined;
            draft.showBlipVariant = undefined;
            draft.deactivateRequestId = undefined;
        }));
    };

    const activateBlip = (showBlip: IBlipType, showBlipVariant?: string) => {
        setBlipData(produce((draft) => {
            draft.showBlip = showBlip;
            draft.showBlipVariant = showBlipVariant;
            draft.deactivateRequestId = undefined;
        }));
    };

    const requestDeactivateBlip = (blip: IBlipType) => {
        const registryEntry = BLIP_COMPONENTS[blip];
        const handlesDeactivate =
            "component" in registryEntry && registryEntry.handlesDeactivate;

        if (!handlesDeactivate) {
            clearBlip();
            return;
        }

        setBlipData(produce((draft) => {
            if (draft.showBlip !== blip) return;
            draft.deactivateRequestId = Date.now();
        }));
    };

    function getVariantId(variant: BlipVariant) {
        return typeof variant === "string" ? variant : variant.variant;
    }

    return (
        <div className="flex gap-2 pt-2 pl-2 bg-green-200">
            {blipTypes.map(blip => {
                const isActive = blipData.showBlip === blip;
                const registryEntry = BLIP_COMPONENTS[blip];
                const variants = "component" in registryEntry ? registryEntry.variants : undefined;

                return (
                    <div key={`blip_${blip}`} className="group relative">
                        <Button
                            size="lg"
                            className="ring-black"
                            mode={isActive ? 'activated' : undefined}
                            onClick={() => isActive ? requestDeactivateBlip(blip) : activateBlip(blip)}
                        >{blip}</Button>
                        {variants && (
                            <div
                                className={`absolute left-0 top-full z-20 min-w-full pt-1 ${isActive && blipData.showBlipVariant ? 'block' : 'hidden group-hover:block'
                                    }`}
                            >
                                <div className="flex gap-1 rounded-lg bg-green-100 p-1 shadow-lg ring-1 ring-black/15">
                                    {variants.map((variantEntry) => {
                                        const variant = getVariantId(variantEntry);
                                        const isVariantActive =
                                            isActive && blipData.showBlipVariant === variant;

                                        return (
                                            <Button
                                                key={`${blip}_${variant}`}
                                                size="lg"
                                                variant="b"
                                                mode={isVariantActive ? 'activated' : undefined}
                                                className="whitespace-nowrap ring-black"
                                                onClick={() => isVariantActive ? requestDeactivateBlip(blip) : activateBlip(blip, variant)}
                                            >{variant}</Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            }
            )}
        </div>
    )


}




