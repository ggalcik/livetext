import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { Button } from "../../components/Button";
import { usePersistentState } from "../../hooks/usePersistentState";
import { HelloBlipSchema, type BlipProps } from "./types";
import flipClick from "./assets/flipclick.mp3";
import namesIn from "./assets/names_in3.mp3";
import namesOut from "./assets/names_out.mp3";
import "./Blip.css";

const REVEAL_STEP_MS = 100;
const REVEAL_RANDOM_COUNT = 4;
const CURRENT_HOLD_MS = 4000;
const ENTER_ANIMATION_MS = 450;
const EXIT_ANIMATION_MS = 450;

type HelloRuntime = {
    phase: "hidden" | "entering" | "revealing" | "holding" | "exiting";
    current: string | null;
    next: string | null;
};

function getTodayDate() {
    return format(new Date(), "yyyyMMdd");
}

function createDefaultState() {
    return {
        todayDate: getTodayDate(),
        allNames: [],
        selectedNames: [],
        waveRequestId: undefined,
        waveActive: false,
    };
}

export default function Hello({ endBlip }: BlipProps) {
    const [helloBlip, setHelloBlip] = usePersistentState({
        storageKey: "helloBlip",
        schema: HelloBlipSchema,
        fallback: createDefaultState(),
    });
    const [runtime, setRuntime] = useState<HelloRuntime>({
        phase: "hidden",
        current: null,
        next: null,
    });
    const [holdPhase, setHoldPhase] = useState(0);
    const currentRef = useRef<string | null>(null);
    const runTokenRef = useRef(0);
    const isMountedRef = useRef(true);
    const lastHandledRequestRef = useRef<number | undefined>(undefined);
    const audioInRef = useRef(new Audio(namesIn));
    const audioOutRef = useRef(new Audio(namesOut));
    const audioFlipRef = useRef(new Audio(flipClick));
    const current = runtime.current;
    const next = runtime.next;
    const isExiting = runtime.phase === "exiting";
    const isPanelVisible = runtime.phase !== "hidden";
    const isHoldingCurrent = runtime.phase === "holding" && current != null;
    const firstWaveBright = holdPhase % 2 === 0;

    useEffect(() => {
        currentRef.current = current;
    }, [current]);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            runTokenRef.current += 1;
        };
    }, []);

    const playEnterSound = useCallback(() => {
        audioInRef.current.currentTime = 0;
        audioInRef.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const playExitSound = useCallback(() => {
        audioOutRef.current.currentTime = 0;
        audioOutRef.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const playFlipSound = useCallback(() => {
        audioFlipRef.current.currentTime = 0;
        audioFlipRef.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const runWaveSequence = useCallback(async (token: number, targets: string[], allNames: string[]) => {
        const initialCard = pickInitialRevealName(allNames, targets[0] ?? null);
        playEnterSound();
        setRuntime({
            phase: "entering",
            current: initialCard,
            next: null,
        });
        if (!(await waitForRun(token, ENTER_ANIMATION_MS, isMountedRef, runTokenRef))) return;

        let previousName = initialCard;

        for (const target of targets) {
            const revealSequence = buildRevealSequence(allNames, target, previousName);

            for (const revealName of revealSequence) {
                playFlipSound();
                setRuntime((prev) => ({
                    ...prev,
                    phase: "revealing",
                    next: revealName,
                }));
                if (!(await waitForRun(token, REVEAL_STEP_MS, isMountedRef, runTokenRef))) return;

                setRuntime((prev) => ({
                    ...prev,
                    phase: "revealing",
                    current: revealName,
                    next: null,
                }));
                previousName = revealName;
            }

            setRuntime((prev) => ({
                ...prev,
                phase: "holding",
                current: target,
                next: null,
            }));

            if (!(await waitForRun(token, CURRENT_HOLD_MS, isMountedRef, runTokenRef))) return;

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

        playExitSound();
        setRuntime((prev) => ({
            ...prev,
            phase: "exiting",
            next: null,
        }));
        if (!(await waitForRun(token, EXIT_ANIMATION_MS, isMountedRef, runTokenRef))) return;

        setHelloBlip((prev) => ({
            ...prev,
            waveActive: false,
            waveRequestId: undefined,
        }));
        endBlip();
    }, [endBlip, playEnterSound, playExitSound, playFlipSound, setHelloBlip]);

    useEffect(() => {
        const requestId = helloBlip.waveRequestId;
        if (!helloBlip.waveActive || requestId == null) return;
        if (requestId === lastHandledRequestRef.current) return;

        lastHandledRequestRef.current = requestId;

        const targets = [...helloBlip.selectedNames];
        if (targets.length === 0) {
            setHelloBlip((prev) => ({
                ...prev,
                waveActive: false,
                waveRequestId: undefined,
            }));
            return;
        }

        const token = ++runTokenRef.current;
        void runWaveSequence(token, targets, [...helloBlip.allNames]);
    }, [
        helloBlip.allNames,
        helloBlip.selectedNames,
        helloBlip.waveActive,
        helloBlip.waveRequestId,
        runWaveSequence,
        setHelloBlip,
    ]);

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
    }, [isHoldingCurrent]);

    return (
        <div className="absolute inset-0 text-white">
            <MasterViewport name="blip_hello">
                <div
                    className={clsx(
                        "flex h-full w-full flex-col items-center justify-center bg-black/40 px-[8%] py-[10%] backdrop-blur-sm",
                        !isPanelVisible && "invisible translate-x-[120%] opacity-0",
                        runtime.phase === "entering" && "animate-hello-panel-enter",
                        isPanelVisible && !isExiting && runtime.phase !== "entering" && "translate-x-0 opacity-100",
                        isExiting && "animate-hello-panel-exit"
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
                            "border-amber-700 relative border-8  p-3 px-12 font-[Carter_One] text-4xl text-blue-800 transition-[filter] duration-100",
                            isHoldingCurrent ? "brightness-100 animate-hellosign-on" : "brightness-[20%] bg-stone-400"
                        )}
                    >
                        Hello.
                        <div
                            className={clsx(
                                "absolute -top-0 -right-14 rotate-12 text-5xl -scale-x-100 transition-[filter] duration-300",
                                isHoldingCurrent
                                    ? firstWaveBright ? "brightness-100" : "brightness-75"
                                    : "brightness-100"
                            )}
                        >
                            {"\u{1F44B}"}
                        </div>
                        <div
                            className={clsx(
                                "absolute top-10 -right-16 rotate-42 text-5xl -scale-x-100 transition-[filter] duration-300",
                                isHoldingCurrent
                                    ? firstWaveBright ? "brightness-75" : "brightness-100"
                                    : "brightness-100"
                            )}
                        >
                            {"\u{1F44B}"}
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
    const [draftName, setDraftName] = useState("");
    const isRevealing = helloBlip.waveActive === true;

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

        setHelloBlip((prev) => ({
            ...prev,
            waveActive: true,
            waveRequestId: Date.now(),
        }));
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
                {getAlphaSortedNames(helloBlip.allNames).map((name) => {
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
                                isSelected && "bg-amber-200 text-black ring-amber-300 hover:bg-amber-200 hover:text-black"
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
                    Click to queue names in order. Wave flips through a few random cards, then lands on each queued name and holds it for two seconds.
                </div>
            </div>
        </div>
    );
}

function HelloCard({ name, className }: { name: string; className?: string }) {
    return (
        <div
            className={clsx(
                "flex h-28 w-full items-center justify-center rounded-lg border border-black bg-amber-100 px-8 ",
                "text-center font-[Gill_Sans_MT] font-bold [font-variant:small-caps] text-2xl text-sky-900 shadow-2xl shadow-black",
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

function pickInitialRevealName(allNames: string[], firstTarget: string | null) {
    const candidates = allNames.filter((name) => name !== firstTarget);

    if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    return firstTarget;
}

function getAlphaSortedNames(names: string[]) {
    return [...names].sort((a, b) =>
        getLetterOnlySortKey(a).localeCompare(getLetterOnlySortKey(b)) || a.localeCompare(b)
    );
}

function getLetterOnlySortKey(name: string) {
    const lettersOnly = name
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z]/gi, "")
        .toLowerCase();

    return lettersOnly || name.toLowerCase();
}

function waitForRun(
    token: number,
    ms: number,
    isMountedRef: React.RefObject<boolean>,
    runTokenRef: React.RefObject<number>
) {
    return new Promise<boolean>((resolve) => {
        window.setTimeout(() => {
            resolve(isMountedRef.current === true && runTokenRef.current === token);
        }, ms);
    });
}
