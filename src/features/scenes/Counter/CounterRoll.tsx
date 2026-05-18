import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import type { Counter, CounterScene } from "./types";
import { addCounter, doDayReset, sortAlphaUp, sortCheckedUp } from "./counterHelpers";

interface CounterRollProps {
    scene: CounterScene;
    setScene: React.Dispatch<React.SetStateAction<CounterScene>>;
}

export default function CounterRoll({ scene, setScene }: CounterRollProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
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

    function onWheel(e: React.WheelEvent<HTMLDivElement>) {
        scrollRef.current?.scrollBy({
            top: e.deltaY,
        });
    }

    function activateCounter(counter: Counter) {
        toggleCounter(counter);
    }

    function handleDayReset() {
        doDayReset(scene, setScene);
        setConfirmReset(false);
    }

    function handleAddCounter() {
        addCounter(scene, setScene, { addBlank: true });
        setSelectedIndex(scene.counters.length);
    }

    if (!scene.counters.length) return null;

    return (
        <div className="absolute inset-y-0 left-0 z-20 w-1/2 group/counterroll">
            <div className="flex h-full items-center justify-start p-4">
                <div className="pointer-events-none w-90 overflow-visible transition-opacity duration-200 group-hover/counterroll:pointer-events-auto group-hover/counterroll:opacity-100">
                {/* <div className="pointer-events-none w-72 overflow-visible opacity-0 transition-opacity duration-200 group-hover/counterroll:pointer-events-auto group-hover/counterroll:opacity-100"> */}

                    <div
                        ref={scrollRef}
                        className="flex max-h-[380px] flex-col gap-2 overflow-y-auto overflow-x-visible pr-2 select-none"
                        onWheel={onWheel}
                    >
                        {scene.counters.map((counter) => (
                            <button
                                key={counter.id}
                                type="button"
                                className={clsx(
                                    "flex min-h-[32px] w-full items-center border bg-white px-2 text-left font-mono text-lg shadow-md transition-all hover:shadow-lg",
                                    counter.show
                                        ? "border-amber-200 text-stone-900 ring-2"
                                        : "border-stone-200 text-stone-700",
                                    !counter.show && maxActive ? "cursor-not-allowed opacity-45" : ""
                                )}
                                onClick={() => activateCounter(counter)}
                            >
                                <span className="truncate">{counter.name || "Untitled"}</span>
                            </button>
                        ))}
                    </div>

                    {selectedCounter && (
                        <div
                            className={clsx(
                                "mt-4 flex items-start gap-2 relative",
                                showControls ? "pointer-events-auto" : "pointer-events-none"
                            )}
                            style={{ transform: "translateY(-120px)" }}>
                            <Button
                                variant="b"
                                className="pointer-events-auto h-8 w-8 shrink-0 opacity-40 -translate-x-10 transition-opacity hover:opacity-100"

                                onClick={() => setShowControls((prev) => !prev)}
                            />
                            <div
                                className={clsx(
                                    "flex-1 rounded-2xl -translate-x-10 border border-amber-900/35 bg-amber-50/90 p-3 shadow-xl backdrop-blur-sm transition-opacity hover:opacity-100",
                                    showControls ? "pointer-events-auto" : "pointer-events-none"
                                )}
                                style={{ opacity: showControls ? 1 : 0 }}
                            >
                                <input
                                    className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-sm"
                                    value={selectedCounter.name}
                                    onChange={(e) => updateCounter(selectedCounter.id, { name: e.target.value })}
                                />

                                <div className="mt-3 flex items-center gap-2">
                                    <Button variant="b" className="flex-1" onClick={() => sortCheckedUp(scene, setScene)}>
                                        Sort Checked
                                    </Button>
                                    <Button variant="b" className="flex-1" onClick={() => sortAlphaUp(scene, setScene)}>
                                        Sort Alpha
                                    </Button>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="c"
                                            className="w-20"
                                            onClick={() => setConfirmReset((prev) => !prev)}
                                        >
                                            {confirmReset ? "Cancel" : "Day reset"}
                                        </Button>
                                        {confirmReset && (
                                            <Button variant="c" className="w-16" onClick={handleDayReset}>
                                                Sure?
                                            </Button>
                                        )}
                                    </div>
                                    <Button variant="b" className="h-8 w-8 p-0 text-lg leading-none" onClick={handleAddCounter}>
                                        +
                                    </Button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
