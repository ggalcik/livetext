import { format } from "date-fns";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { Button } from "../../components/Button";
import { usePersistentState } from "../../hooks/usePersistentState";
import { HelloBlipSchema, type BlipProps } from "./types";
import "./Blip.css";

const REVEAL_STEP_MS = 100;
const REVEAL_SETTLE_MS = 120;
const REVEAL_RANDOM_COUNT = 4;
const CURRENT_HOLD_MS = 2000;
const ENTER_ANIMATION_MS = 450;
const EXIT_ANIMATION_MS = 450;

function getTodayDate() {
    return format(new Date(), "yyyyMMdd");
}

function createDefaultState() {
    return {
        todayDate: getTodayDate(),
        allNames: [],
        selectedNames: [],
        current: null,
        next: null,
        isPlaying: false,
    };
}

export default function Hello({ endBlip }: BlipProps) {
    const [helloBlip, setHelloBlip] = usePersistentState({
        storageKey: "helloBlip",
        schema: HelloBlipSchema,
        fallback: createDefaultState(),
    });
    const settleTimeoutRef = useRef<number | null>(null);
    const exitTimeoutRef = useRef<number | null>(null);
    const [isExiting, setIsExiting] = useState(false);
    const [holdPhase, setHoldPhase] = useState(0);
    const current = helloBlip.current ?? null;
    const next = helloBlip.next ?? null;
    const isPanelVisible = helloBlip.isPlaying || isExiting;
    const isHoldingCurrent = current != null && next == null && !isExiting;
    const firstWaveBright = holdPhase % 2 === 0;

    useEffect(() => {
        setHelloBlip((prev) => {
            if (!prev.current && !prev.next && !prev.isPlaying) {
                return prev;
            }

            return {
                ...prev,
                current: null,
                next: null,
                isPlaying: false,
            };
        });
    }, [setHelloBlip]);

    useEffect(() => {
        if (next == null) return;

        if (settleTimeoutRef.current !== null) {
            window.clearTimeout(settleTimeoutRef.current);
        }

        settleTimeoutRef.current = window.setTimeout(() => {
            setHelloBlip((prev) => {
                if (prev.next !== next) return prev;

                return {
                    ...prev,
                    current: next,
                    next: null,
                };
            });
            settleTimeoutRef.current = null;
        }, REVEAL_STEP_MS);

        return () => {
            if (settleTimeoutRef.current !== null) {
                window.clearTimeout(settleTimeoutRef.current);
                settleTimeoutRef.current = null;
            }
        };
    }, [next, setHelloBlip]);

    useEffect(() => {
        if (!isHoldingCurrent) {
            setHoldPhase(0);
            return;
        }

        setHoldPhase(0);
        const intervalId = window.setInterval(() => {
            setHoldPhase((phase) => phase + 1);
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, [current, isHoldingCurrent]);

    useEffect(() => {
        if (
            !helloBlip.isPlaying ||
            next != null ||
            current == null ||
            helloBlip.selectedNames.length > 0 ||
            isExiting
        ) {
            return;
        }

        setIsExiting(true);
    }, [current, helloBlip.isPlaying, helloBlip.selectedNames.length, isExiting, next]);

    useEffect(() => {
        if (!isExiting) return;

        exitTimeoutRef.current = window.setTimeout(() => {
            setHelloBlip((prev) => ({
                ...prev,
                current: null,
                next: null,
                isPlaying: false,
            }));
            endBlip();
        }, EXIT_ANIMATION_MS);

        return () => {
            if (exitTimeoutRef.current !== null) {
                window.clearTimeout(exitTimeoutRef.current);
                exitTimeoutRef.current = null;
            }
        };
    }, [endBlip, isExiting, setHelloBlip]);

    useEffect(() => {
        if (helloBlip.isPlaying) {
            setIsExiting(false);
        }
    }, [helloBlip.isPlaying]);

    useEffect(() => {
        return () => {
            if (exitTimeoutRef.current !== null) {
                window.clearTimeout(exitTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 text-white">
            <MasterViewport name="blip_hello">
                <div
                    className={clsx(
                        "flex h-full w-full flex-col items-center justify-center bg-black/40 px-[8%] py-[10%] backdrop-blur-sm transition-transform transition-opacity duration-450 ease-out",
                        !isPanelVisible && "invisible translate-x-[120%] opacity-0",
                        isPanelVisible && !isExiting && "translate-x-0 opacity-100",
                        isExiting && "translate-x-[120%] opacity-0"
                    )}
                >
                    <div className="relative w-full border-16 border-amber-900 border-l-amber-700 border-t-amber-700">
                        {current && (
                            <HelloCard
                                key={`current-${current}`}
                                name={current}
                                className="relative z-10"
                            />
                        )}
                        {next && (
                            <HelloCard
                                key={`next-${current ?? "empty"}-${next}`}
                                name={next}
                                className="animate-hello-card-reveal absolute inset-0 z-20"
                            />
                        )}
                    </div>

                    <div
                        className={clsx(
                            "border-amber-700 relative border-8 bg-stone-200 p-3 px-12 font-[Carter_One] text-4xl text-blue-800 transition-[filter] duration-300",
                            isHoldingCurrent ? "brightness-100" : "brightness-25"
                        )}
                    >
                        Hello.
                        <div
                            className={clsx(
                                "absolute -top-4 -right-10 rotate-12 text-5xl -scale-x-100 transition-[filter] duration-300",
                                isHoldingCurrent
                                    ? firstWaveBright ? "brightness-100" : "brightness-75"
                                    : "brightness-100"
                            )}
                        >
                            👋
                        </div>
                        <div
                            className={clsx(
                                "absolute top-4 -right-14 rotate-36 text-5xl -scale-x-100 transition-[filter] duration-300",
                                isHoldingCurrent
                                    ? firstWaveBright ? "brightness-75" : "brightness-100"
                                    : "brightness-100"
                            )}
                        >
                            👋
                        </div>
                    </div>
                </div>
            </MasterViewport>
        </div>
    );
}

export function HelloAdmin() {
    const [helloBlip, setHelloBlip] = usePersistentState({
        storageKey: "helloBlip",
        schema: HelloBlipSchema,
        fallback: createDefaultState(),
    });
    const [isAdding, setIsAdding] = useState(false);
    const [isRevealing, setIsRevealing] = useState(false);
    const [draftName, setDraftName] = useState("");

    function toggleSelected(name: string) {
        setHelloBlip((prev) => {
            const alreadySelected = prev.selectedNames.includes(name);

            return {
                ...prev,
                selectedNames: alreadySelected
                    ? prev.selectedNames.filter((entry) => entry !== name)
                    : [...prev.selectedNames, name],
            };
        });
    }

    function addName() {
        const trimmedName = draftName.trim();
        if (!trimmedName) return;

        setHelloBlip((prev) => {
            if (prev.allNames.includes(trimmedName)) {
                return prev;
            }

            return {
                ...prev,
                allNames: [...prev.allNames, trimmedName],
            };
        });
        setDraftName("");
        setIsAdding(false);
    }

    function cancelAdd() {
        setDraftName("");
        setIsAdding(false);
    }

    function handleWave() {
        if (isRevealing || helloBlip.selectedNames.length === 0) return;

        const targets = [...helloBlip.selectedNames];
        const allNames = [...helloBlip.allNames];

        void revealSelectedNames(targets, allNames, helloBlip.current ?? null);
    }

    async function revealSelectedNames(targets: string[], allNames: string[], initialCurrent: string | null) {
        setIsRevealing(true);

        try {
            setHelloBlip((prev) => ({
                ...prev,
                isPlaying: true,
            }));

            await wait(ENTER_ANIMATION_MS);

            let previousName = initialCurrent;

            for (const target of targets) {
                const revealSequence = buildRevealSequence(allNames, target, previousName);

                for (const revealName of revealSequence) {
                    setHelloBlip((prev) => ({
                        ...prev,
                        next: revealName,
                    }));
                    await wait(REVEAL_SETTLE_MS);
                    previousName = revealName;
                }

                await wait(CURRENT_HOLD_MS);

                setHelloBlip((prev) => {
                    const nextHellos = new Set(prev.hellos ?? []);
                    nextHellos.add(target);

                    return {
                        ...prev,
                        selectedNames: prev.selectedNames.filter((name) => name !== target),
                        hellos: prev.allNames.filter((name) => nextHellos.has(name)),
                    };
                });
            }
        } finally {
            setIsRevealing(false);
        }
    }

    function handleInputKeyDown(evt: KeyboardEvent<HTMLInputElement>) {
        if (evt.key === "Enter") {
            evt.preventDefault();
            addName();
        }

        if (evt.key === "Escape") {
            evt.preventDefault();
            cancelAdd();
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
                {helloBlip.allNames.map((name) => {
                    const isSelected = helloBlip.selectedNames.includes(name);

                    return (
                        <Button
                            key={name}
                            type="button"
                            size="lg"
                            variant="b"
                            mode={isSelected ? "activated" : "normal"}
                            disabled={isRevealing}
                            className={clsx(
                                "ring-black",
                                isSelected && "bg-amber-200 text-black ring-amber-300",
                                // wasWaved && !isSelected && "border-stone-700 bg-stone-200 text-stone-900 ring-2 ring-stone-500"
                            )}
                            onClick={() => toggleSelected(name)}
                        >
                            {name}
                        </Button>
                    );
                })}

                {isAdding ? (
                    <div className="flex items-center gap-2">
                        <input
                            autoFocus
                            type="text"
                            value={draftName}
                            onChange={(evt) => setDraftName(evt.target.value)}
                            onKeyDown={handleInputKeyDown}
                            className="h-9 rounded-lg border border-black px-3 text-black"
                        />
                        <Button
                            type="button"
                            size="lg"
                            variant="c"
                            className="ring-black"
                            onClick={cancelAdd}
                        >
                            X
                        </Button>
                    </div>
                ) : (
                    <Button
                        type="button"
                        size="lg"
                        disabled={isRevealing}
                        className="min-w-10 ring-black"
                        onClick={() => setIsAdding(true)}
                    >
                        +
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    size="lg"
                    className="ring-black"
                    mode={helloBlip.selectedNames.length > 0 ? "activated" : "normal"}
                    disabled={helloBlip.selectedNames.length === 0 || isRevealing}
                    onClick={handleWave}
                >
                    {isRevealing ? "Waving..." : "Wave"}
                </Button>
                <div className="text-sm text-black/70">
                    Click to queue names in order. Wave flips through a few random cards, then lands on each queued name and holds it for five seconds.
                </div>
            </div>
        </div>
    );
}

function HelloCard({ name, className }: { name: string; className?: string }) {
    return (
        <div
            className={clsx(
                "flex h-28 w-full items-center justify-center rounded-lg border border-black bg-amber-100 px-8 text-center font-[Atomic_Age] text-xl text-sky-900 shadow-2xl shadow-black",
                className
            )}
        >
            <span className="leading-none">{name}</span>
        </div>
    );
}

function buildRevealSequence(allNames: string[], target: string, previousName: string | null) {
    const sequence: string[] = [];
    let lastName = previousName;

    for (let i = 0; i < REVEAL_RANDOM_COUNT; i += 1) {
        const randomName = pickRandomName(allNames, target, lastName);
        if (randomName == null) break;
        sequence.push(randomName);
        lastName = randomName;
    }

    sequence.push(target);

    return sequence;
}

function pickRandomName(allNames: string[], target: string, previousName: string | null) {
    const candidates = allNames.filter((name) => name !== target && name !== previousName);

    if (candidates.length === 0) {
        const fallbackCandidates = allNames.filter((name) => name !== previousName);
        if (fallbackCandidates.length === 0) return null;
        return fallbackCandidates[Math.floor(Math.random() * fallbackCandidates.length)];
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
}

function wait(ms: number) {
    return new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
    });
}
