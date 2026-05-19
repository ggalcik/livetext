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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(0);
    const [showControls, setShowControls] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const activeCount = scene.counters.filter((counter) => counter.show).length;
    const maxActive = activeCount >= 10;
    const editingCounter = editingIndex == null ? null : scene.counters[editingIndex];

    useEffect(() => {
        if (!scene.counters.length) {
            setHoveredIndex(null);
            setEditingIndex(null);
            setShowControls(false);
            return;
        }

        setEditingIndex((prev) => {
            if (prev == null) return 0;
            return Math.min(prev, scene.counters.length - 1);
        });
    }, [scene.counters.length]);

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
        setEditingIndex(scene.counters.length);
    }

    function toggleControls(index: number) {
        setConfirmReset(false);

        if (showControls && editingIndex === index) {
            setShowControls(false);
            return;
        }

        setEditingIndex(index);
        setShowControls(true);
    }

    if (!scene.counters.length) return null;

    return (
        <div className="absolute inset-y-0 -left-10 z-20 w-1/2 group/counterroll cursor-pointer">
            <div className="flex h-full items-center justify-start p-4">
                <div className="pointer-events-none w-90 overflow-visible opacity-0 transition-opacity duration-200 group-hover/counterroll:pointer-events-auto group-hover/counterroll:opacity-100">
                    <div className="relative overflow-visible">
                        <div
                            ref={scrollRef}
                            className="flex max-h-[380px] flex-col gap-2 overflow-y-auto overflow-x-hidden pr-2 select-none"
                            onWheel={onWheel}
                        >
                            {scene.counters.map((counter, index) => (
                                <div
                                    key={counter.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                    onMouseEnter={() => {
                                        if (!showControls) {
                                            setHoveredIndex(index);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!showControls) {
                                            setHoveredIndex((prev) => (prev === index ? null : prev));
                                        }
                                    }}
                                >
                                    <div className="flex w-8 shrink-0 justify-center">
                                        <Button
                                            variant="b"
                                            type="button"
                                            className={clsx(
                                                "h-7 w-7 p-0 transition-opacity duration-150",
                                                !showControls && hoveredIndex === index
                                                    ? "pointer-events-auto opacity-35 hover:opacity-100"
                                                    : "pointer-events-none opacity-0"
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleControls(index);
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className={clsx(
                                            "flex min-h-[32px] flex-1 items-center border  cursor-pointer px-2 text-left font-mono text-lg shadow-md transition-all hover:shadow-lg",
                                            counter.show
                                                ? "border-amber-200 text-stone-900 bg-amber-50 ring-2"
                                                : "border-stone-200 text-stone-700 bg-blue-50",
                                            !counter.show && maxActive ? "cursor-not-allowed opacity-45" : ""
                                        )}
                                        onClick={() => activateCounter(counter)}
                                    >
                                        <span className="truncate">{counter.name || "Untitled"}</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {showControls && editingCounter && (
                            <div className="pointer-events-auto absolute top-[calc(100%+12px)] left-0 right-0 flex items-start gap-2">
                                <Button
                                    variant="b"
                                    type="button"
                                    className="h-7 w-7 shrink-0 p-0 opacity-100"
                                    onClick={() => {
                                        setConfirmReset(false);
                                        setShowControls(false);
                                    }}
                                />
                                <div className="flex-1 rounded-2xl border border-amber-900/35 bg-amber-50/90 p-3 shadow-xl backdrop-blur-sm">
                                    <input
                                        className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-sm"
                                        value={editingCounter.name}
                                        onChange={(e) => updateCounter(editingCounter.id, { name: e.target.value })}
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
        </div>
    );
}
