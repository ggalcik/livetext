import { usePersistentState } from "../../../hooks/usePersistentState"
import { whoWantsToDefault, WhoWantsToSchema } from "./types"

export function useWhoWantsState() {
    return usePersistentState({
        storageKey: 'whoWantsScene',
        schema: WhoWantsToSchema,
        fallback: whoWantsToDefault
    })
}

