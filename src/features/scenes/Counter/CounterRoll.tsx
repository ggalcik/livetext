import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import type { Counter, CounterScene } from "./types";
import { sortCountersAlphaUp, sortCountersCheckedUp } from "./counterHelpers";

const VISIBLE_ROWS = 5;
const ACTIVE_ROW = Math.floor(VISIBLE_ROWS / 2);
const CARD_HEIGHT = 54;
const CARD_GAP = 14;
const ROW_STEP = CARD_HEIGHT + CARD_GAP;
const WHEEL_STEP = 36;

interface CounterRollProps {
    scene: CounterScene;
    setScene: React.Dispatch<React.SetStateAction<CounterScene>>;
}

export default function CounterRoll({ scene, setScene }: CounterRollProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const wheelCarry = useRef(0);
    const activeCount = scene.counters.filter((counter) => counter.show).length;
    const maxActive = activeCount >= 10;
    const selectedCounter = scene.counters[selectedIndex];

    useEffect(() => {
        if (!scene.counters.length) {
            setSelectedIndex(0);
            return;
        }

        setSelectedIndex((prev) => Math.min(prev, scene.counters.length - 1));
    }, [scene.counters.length]);

    function clampIndex(nextIndex: number) {
        return Math.max(0, Math.min(nextIndex, scene.counters.length - 1));
    }

    function updateCounter(id: string, update: Partial<Counter>) {
        setScene((prev) => ({
            ...prev,
            counters: prev.counters.map((counter) =>
                counter.id === id ? { ...counter, ...update } : counter
            ),
        }));
    }

    function toggleCounter(counter: Counter) {
        if (!counter.show && maxActive) return;
        updateCounter(counter.id, { show: !counter.show });
    }

    function sortCheckedUp() {
        setScene((prev) => ({
            ...prev,
            counters: sortCountersCheckedUp(prev.counters),
        }));
    }

    function sortAlphaUp() {
        setScene((prev) => ({
            ...prev,
            counters: sortCountersAlphaUp(prev.counters),
        }));
    }

    function changeSelected(delta: number) {
        if (!scene.counters.length || delta === 0) return;
        setSelectedIndex((prev) => clampIndex(prev + delta));
    }

    function onWheel(e: React.WheelEvent<HTMLDivElement>) {
        if (!scene.counters.length) return;

        e.preventDefault();
        wheelCarry.current += e.deltaY;

        if (Math.abs(wheelCarry.current) < WHEEL_STEP) return;

        const direction = wheelCarry.current > 0 ? 1 : -1;
        const steps = Math.floor(Math.abs(wheelCarry.current) / WHEEL_STEP);
        wheelCarry.current -= direction * steps * WHEEL_STEP;
        changeSelected(direction * steps);
    }

    if (!scene.counters.length) return null;

    return (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end p-4 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="w-72">
                <div
                    className="relative overflow-hidden"
                    style={{ height: VISIBLE_ROWS * ROW_STEP - CARD_GAP }}
                    onWheel={onWheel}
                >
                    <div
                        className="pointer-events-none absolute inset-x-0 rounded-xl border border-blue-700/25 bg-blue-100/30"
                        style={{
                            top: ACTIVE_ROW * ROW_STEP,
                            height: CARD_HEIGHT,
                        }}
                    />

                    <div
                        className="transition-transform duration-150 ease-out"
                        style={{
                            paddingTop: ACTIVE_ROW * ROW_STEP,
                            paddingBottom: ACTIVE_ROW * ROW_STEP,
                            transform: `translateY(-${selectedIndex * ROW_STEP}px)`,
                        }}
                    >
                        {scene.counters.map((counter, index) => (
                            <button
                                key={counter.id}
                                type="button"
                                className={clsx(
                                    "relative mb-[14px] flex h-[54px] w-full items-center rounded-xl border bg-white px-4 text-left font-mono text-sm shadow-md transition-all last:mb-0",
                                    counter.show
                                        ? "border-amber-200 text-stone-900"
                                        : "border-stone-200 text-stone-500",
                                    index === selectedIndex && counter.show
                                        ? "ring-2 ring-blue-500"
                                        : "",
                                    index === selectedIndex && !counter.show
                                        ? "ring-2 ring-stone-300"
                                        : "",
                                    !counter.show && maxActive
                                        ? "cursor-not-allowed opacity-45"
                                        : "hover:-translate-y-0.5 hover:shadow-lg"
                                )}
                                onClick={() => {
                                    setSelectedIndex(index);
                                    toggleCounter(counter);
                                }}
                            >
                                <span className="truncate pr-3">{counter.name || "Untitled"}</span>
                                {counter.show && (
                                    <span className="ml-3 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                                        Live
                                    </span>
                                )}

                                {index === selectedIndex && counter.show && (
                                    <>
                                        <Button
                                            variant="b"
                                            className="absolute top-1/2 -left-14 h-10 w-10 -translate-y-1/2 rounded-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                updateCounter(counter.id, {
                                                    value: (counter.value || 0) - 1,
                                                });
                                            }}
                                        >
                                            -
                                        </Button>
                                        <Button
                                            variant="b"
                                            className="absolute top-1/2 -right-14 h-10 w-10 -translate-y-1/2 rounded-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                updateCounter(counter.id, {
                                                    value: counter.value ? counter.value + 1 : 1,
                                                    lastIncrement: Date.now(),
                                                });
                                            }}
                                        >
                                            +
                                        </Button>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedCounter && (
                    <div className="mt-4 rounded-2xl border border-amber-900/35 bg-amber-50/90 p-3 shadow-xl backdrop-blur-sm">
                        <input
                            className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-sm"
                            value={selectedCounter.name}
                            onChange={(e) => updateCounter(selectedCounter.id, { name: e.target.value })}
                        />

                        <div className="mt-3 flex items-center gap-2">
                            <Button variant="b" className="flex-1" onClick={sortCheckedUp}>
                                Sort Checked
                            </Button>
                            <Button variant="b" className="flex-1" onClick={sortAlphaUp}>
                                Sort Alpha
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
