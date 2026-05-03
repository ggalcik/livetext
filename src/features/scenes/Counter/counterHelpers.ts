import type { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import type { CounterScene } from "./types";

type SetCounterScene = Dispatch<SetStateAction<CounterScene>>;

export function todayKey(): string {
    return format(new Date(), "yyyyMMdd");
}

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

export function doDayReset(scene: CounterScene, setScene: SetCounterScene) {
    const date = scene.currentDate || todayKey();
    const active = scene.counters
        .filter((counter) => counter.value !== 0 && counter.name)
        .map((counter) => ({ name: counter.name, value: counter.value }));

    const updatedHistory = {
        ...scene.history,
        [date]: active,
    };

    const resetCounters = scene.counters.map((counter) => ({
        ...counter,
        value: 0,
        show: false,
        play: true,
    }));

    setScene({
        ...scene,
        counters: resetCounters,
        history: updatedHistory,
        currentDate: todayKey(),
    });
}

export function addCounter(
    scene: CounterScene,
    setScene: SetCounterScene,
    {
        name = "",
        value = "",
        addBlank = false,
    }: {
        name?: string;
        value?: string | number;
        addBlank?: boolean;
    } = {}
) {
    const trimmedName = name.trim();
    if (!trimmedName && !addBlank) return false;

    const nextCounter = {
        id: Math.random().toString(36).slice(2),
        name: trimmedName,
        value: typeof value === "number" ? value : parseInt(value, 10) || 0,
        show: true,
        play: true,
        lastIncrement: 0,
    };

    setScene({
        ...scene,
        counters: [...scene.counters, nextCounter],
    });

    return true;
}
