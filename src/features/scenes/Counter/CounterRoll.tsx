import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import type { Counter, CounterScene } from "./types";
import { sortAlphaUp, sortCheckedUp } from "./counterHelpers";

const VISIBLE_ROWS = 7;
const ACTIVE_ROW = Math.floor(VISIBLE_ROWS / 2);
const CARD_HEIGHT = 32;
const CARD_GAP = 8;
const ROW_STEP = CARD_HEIGHT + CARD_GAP;
const WHEEL_STEP = 36;
const DRAG_THRESHOLD = 6;

interface CounterRollProps {
    scene: CounterScene;
    setScene: React.Dispatch<React.SetStateAction<CounterScene>>;
}

interface DragState {
    pointerId: number;
    startY: number;
    startIndex: number;
    targetIndex: number | null;
    dragged: boolean;
}

export default function CounterRoll({ scene, setScene }: CounterRollProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const wheelCarry = useRef(0);
    const dragState = useRef<DragState | null>(null);
    const suppressClickRef = useRef(false);
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

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (!scene.counters.length) return;

        suppressClickRef.current = false;
        setIsDragging(false);
        const target = e.target as HTMLElement | null;
        const counterButton = target?.closest("[data-counter-index]");
        const targetIndex = counterButton
            ? Number(counterButton.getAttribute("data-counter-index"))
            : null;

        dragState.current = {
            pointerId: e.pointerId,
            startY: e.clientY,
            startIndex: selectedIndex,
            targetIndex: Number.isNaN(targetIndex) ? null : targetIndex,
            dragged: false,
        };

        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        const drag = dragState.current;
        if (!drag || drag.pointerId !== e.pointerId) return;

        const deltaY = e.clientY - drag.startY;
        if (!drag.dragged && Math.abs(deltaY) >= DRAG_THRESHOLD) {
            drag.dragged = true;
            setIsDragging(true);
        }

        if (!drag.dragged) return;

        const stepDelta = Math.round(deltaY / ROW_STEP);
        const nextIndex = clampIndex(drag.startIndex - stepDelta);
        setSelectedIndex(nextIndex);
    }

    function onPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
        const drag = dragState.current;
        if (!drag || drag.pointerId !== e.pointerId) return;

        suppressClickRef.current = drag.dragged;
        if (!drag.dragged && drag.targetIndex != null) {
            activateCounter(drag.targetIndex);
            suppressClickRef.current = true;
        }
        setIsDragging(false);
        dragState.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    }

    function activateCounter(index: number) {
        const counter = scene.counters[index];
        if (!counter) return;
        setSelectedIndex(index);
        if (index === selectedIndex) {
            toggleCounter(counter);
        }
    }

    if (!scene.counters.length) return null;

    return (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end p-4 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="w-72 overflow-visible">
                <div
                    className={clsx(
                        "relative overflow-visible",
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                    )}
                    style={{ height: VISIBLE_ROWS * ROW_STEP - CARD_GAP }}
                    onWheel={onWheel}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerEnd}
                    onPointerCancel={onPointerEnd}
                >
                    <div
                        className="pointer-events-none absolute inset-x-0 bg-blue-100/60"
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
                            <div
                                key={counter.id}
                                className={clsx(
                                    "relative mb-[8px] h-[32px] last:mb-0",
                                )}
                            >
                                <button
                                    type="button"
                                    data-counter-index={index}
                                    className={clsx(
                                    "flex h-full w-full items-center border px-2 text-left font-mono text-lg shadow-md transition-all",
                                    counter.show
                                        ? "border-amber-200 text-stone-900 ring-2"
                                        : "border-stone-200 text-stone-700",
                                    index === selectedIndex && counter.show
                                        ? "bg-yellow-100"
                                        : "",
                                    index !== selectedIndex && counter.show
                                        ? "bg-white"
                                        : "",
                                    index === selectedIndex && !counter.show
                                        ? "bg-stone-100"
                                        : "",
                                    index !== selectedIndex && !counter.show
                                        ? "bg-stone-200"
                                        : "",

                                    !counter.show && maxActive
                                        ? "cursor-not-allowed opacity-45"
                                        : index === selectedIndex
                                            ? "cursor-pointer hover:shadow-lg"
                                            : "hover:shadow-lg"
                                )}
                                    style={{
                                        opacity: getCardOpacity(index, selectedIndex),
                                        transform: `scale(${getCardScale(index, selectedIndex)})`,
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (suppressClickRef.current) {
                                            suppressClickRef.current = false;
                                        }
                                    }}
                                >
                                    <span className="truncate">{counter.name || "Untitled"}</span>
                                </button>

                                {index === selectedIndex && counter.show && (
                                    <>
                                        <Button
                                            variant="b"
                                            className="absolute top-1/2 -left-12 z-10 h-8 w-8 -translate-y-1/2 border border-stone-400 bg-white p-0 text-lg leading-none shadow-lg"
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
                                            className="absolute top-1/2 -right-12 z-10 h-8 w-8 -translate-y-1/2 border border-stone-400 bg-white p-0 text-lg leading-none shadow-lg"
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
                            </div>
                        ))}
                    </div>
                </div>

                {selectedCounter && (
                    <div className="mt-4 rounded-2xl border border-amber-900/35 bg-amber-50/90 p-3 opacity-40 shadow-xl backdrop-blur-sm transition-opacity hover:opacity-100">
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
                    </div>
                )}
            </div>
        </div>
    );
}

function getCardScale(index: number, selectedIndex: number) {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 1.1;
    if (distance === 1) return 1;
    if (distance === 2) return 0.965;
    return 0.94;
}

function getCardOpacity(index: number, selectedIndex: number) {
    const distance = Math.abs(index - selectedIndex);
    if (distance <= 2) return 1;
    return Math.max(1 - ((distance - 2) * 0.1), 0.7      );
}
