import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import type { Counter, CounterScene } from "./types";

const VISIBLE_ROWS = 5;
const ACTIVE_ROW = Math.floor(VISIBLE_ROWS / 2);
const ROW_HEIGHT = 42;
const WHEEL_STEP = 36;

interface CounterRollProps {
    scene: CounterScene;
    setScene: React.Dispatch<React.SetStateAction<CounterScene>>;
}

export default function CounterRoll({ scene, setScene }: CounterRollProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const wheelCarry = useRef(0);
    const maxActive = scene.counters.filter((counter) => counter.show).length >= 10;
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
            <div className="w-72 rounded-2xl border border-amber-900/35 bg-amber-50/90 p-3 shadow-xl backdrop-blur-sm">
                <div
                    className="relative overflow-hidden rounded-xl border border-amber-900/20 bg-white/60"
                    style={{ height: VISIBLE_ROWS * ROW_HEIGHT }}
                    onWheel={onWheel}
                >
                    <div
                        className="pointer-events-none absolute inset-x-2 rounded-lg border border-blue-700/35 bg-blue-100/70"
                        style={{
                            top: ACTIVE_ROW * ROW_HEIGHT,
                            height: ROW_HEIGHT,
                        }}
                    />

                    <div
                        className="transition-transform duration-150 ease-out"
                        style={{
                            paddingTop: ACTIVE_ROW * ROW_HEIGHT,
                            paddingBottom: ACTIVE_ROW * ROW_HEIGHT,
                            transform: `translateY(-${selectedIndex * ROW_HEIGHT}px)`,
                        }}
                    >
                        {scene.counters.map((counter, index) => (
                            <button
                                key={counter.id}
                                type="button"
                                className={clsx(
                                    "flex h-[42px] w-full items-center justify-between px-3 text-left font-mono text-sm transition-colors",
                                    index === selectedIndex
                                        ? "text-blue-900"
                                        : "text-stone-500 hover:bg-stone-100/70 hover:text-stone-800"
                                )}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <span className="truncate pr-3">{counter.name || "Untitled"}</span>
                                <span className="min-w-10 text-right tabular-nums">{counter.value}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {selectedCounter && (
                    <div className="mt-3 space-y-2">
                        <label className="flex items-center gap-2 text-sm text-stone-700">
                            <input
                                type="checkbox"
                                className="h-4 w-4 cursor-pointer"
                                checked={selectedCounter.show}
                                disabled={!selectedCounter.show && maxActive}
                                onChange={(e) => updateCounter(selectedCounter.id, { show: e.target.checked })}
                            />
                            Show on page
                        </label>

                        <input
                            className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-sm"
                            value={selectedCounter.name}
                            onChange={(e) => updateCounter(selectedCounter.id, { name: e.target.value })}
                        />

                        <div className="flex items-center gap-2">
                            <Button
                                variant="b"
                                className="w-10"
                                onClick={() =>
                                    updateCounter(selectedCounter.id, {
                                        value: (selectedCounter.value || 0) - 1,
                                    })
                                }
                            >
                                -
                            </Button>
                            <input
                                className="w-16 rounded border border-stone-300 bg-white px-2 py-1 text-center"
                                value={selectedCounter.value}
                                onChange={(e) =>
                                    updateCounter(selectedCounter.id, {
                                        value: parseInt(e.target.value, 10) || 0,
                                    })
                                }
                            />
                            <Button
                                variant="b"
                                className="w-10"
                                onClick={() =>
                                    updateCounter(selectedCounter.id, {
                                        value: selectedCounter.value ? selectedCounter.value + 1 : 1,
                                        lastIncrement: Date.now(),
                                    })
                                }
                            >
                                +
                            </Button>
                            <Button
                                variant={selectedCounter.play ? "a" : "b"}
                                className="flex-1"
                                onClick={() =>
                                    updateCounter(selectedCounter.id, {
                                        play: !selectedCounter.play,
                                    })
                                }
                            >
                                Sound
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
