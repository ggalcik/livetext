import type { Counter } from "./types";

export function sortCountersCheckedUp(counters: Counter[]) {
    return [...counters].sort((a, b) => {
        if (a.show === b.show) return 0;
        if (a.show && !b.show) return -1;
        return 1;
    });
}

export function sortCountersAlphaUp(counters: Counter[]) {
    return [...counters].sort((a, b) => {
        const aName = a.name.toUpperCase().replace(/[^A-Z]/g, "");
        const bName = b.name.toUpperCase().replace(/[^A-Z]/g, "");

        if (aName === bName) return 0;
        return aName < bName ? -1 : 1;
    });
}
