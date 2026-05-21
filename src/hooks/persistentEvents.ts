export const PERSISTENT_STATE_EVENT = "livetext:persistent-state";

export interface PersistentStateEventDetail {
    key: string;
    newValue: string;
    sourceId?: string;
}

export function dispatchPersistentStateEvent(detail: PersistentStateEventDetail) {
    queueMicrotask(() => {
        window.dispatchEvent(
            new CustomEvent<PersistentStateEventDetail>(PERSISTENT_STATE_EVENT, {
                detail
            })
        );
    });
}

export function addPersistentStateListener(
    listener: (detail: PersistentStateEventDetail) => void
) {
    const handleEvent = (event: Event) => {
        listener((event as CustomEvent<PersistentStateEventDetail>).detail);
    };

    window.addEventListener(PERSISTENT_STATE_EVENT, handleEvent);

    return () => {
        window.removeEventListener(PERSISTENT_STATE_EVENT, handleEvent);
    };
}
