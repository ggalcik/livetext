import type { Dispatch, SetStateAction } from "react";
import type { CounterScene } from "./types";

type SetCounterScene = Dispatch<SetStateAction<CounterScene>>;

function getSortedCheckedUp(scene: CounterScene) {
    return [...scene.counters].sort((a, b) => {
        if (a.show === b.show) return 0;
        if (a.show && !b.show) return -1;
        return 1;
    });
}

function getSortedAlphaUp(scene: CounterScene) {
    return [...scene.counters].sort((a, b) => {
        const aName = a.name.toUpperCase().replace(/[^A-Z]/g, "");
        const bName = b.name.toUpperCase().replace(/[^A-Z]/g, "");

        if (aName === bName) return 0;
        return aName < bName ? -1 : 1;
    });
}

export function sortCheckedUp(scene: CounterScene, setScene: SetCounterScene) {
    setScene({
        ...scene,
        counters: getSortedCheckedUp(scene),
    });
}

export function sortAlphaUp(scene: CounterScene, setScene: SetCounterScene) {
    setScene({
        ...scene,
        counters: getSortedAlphaUp(scene),
    });
}
