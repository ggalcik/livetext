import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { Button } from "../../components/Button";
import { usePersistentState } from "../../hooks/usePersistentState";
import { HelloBlipSchema, type BlipProps } from "./types";
import flipClick from "./assets/flipclick.mp3";
import helloWave1 from "./assets/hello_wave1.mp3";
import helloWave2 from "./assets/hello_wave2.mp3";
import namesIn from "./assets/names_in3.mp3";
import namesOut from "./assets/names_out.mp3";
import "./Blip.css";

const REVEAL_STEP_MS = 100;
const REVEAL_RANDOM_COUNT = 8;
const CURRENT_HOLD_MS = 7000;
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
    const helloBlipRef = useRef(helloBlip);
    const currentRef = useRef<string | null>(null);
    const runTokenRef = useRef(0);
    const isMountedRef = useRef(true);
    const lastHandledRequestRef = useRef<number | undefined>(undefined);
    const audioInRef = useRef(new Audio(namesIn));
    const audioOutRef = useRef(new Audio(namesOut));
    const audioFlipRef = useRef(new Audio(flipClick));
    const audioHelloWave1Ref = useRef(new Audio(helloWave1));
    const audioHelloWave2Ref = useRef(new Audio(helloWave2));
    const current = runtime.current;
    const next = runtime.next;
    const isExiting = runtime.phase === "exiting";
    const isPanelVisible = runtime.phase !== "hidden";
    const isHoldingCurrent = runtime.phase === "holding" && current != null;
    const firstWaveBright = holdPhase % 2 === 0;

    useEffect(() => {
        helloBlipRef.current = helloBlip;
    }, [helloBlip]);

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

    const playHelloWave1Sound = useCallback(() => {
        audioHelloWave1Ref.current.currentTime = 0;
        audioHelloWave1Ref.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const playHelloWave2Sound = useCallback(() => {
        audioHelloWave2Ref.current.currentTime = 0;
        audioHelloWave2Ref.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const runWaveSequence = useCallback(async (token: number) => {
        const initialTargets = [...helloBlipRef.current.selectedNames];
        const initialAllNames = [...helloBlipRef.current.allNames];
        const initialCard = pickInitialRevealName(initialAllNames, initialTargets[0] ?? null);
        playEnterSound();
        setRuntime({
            phase: "entering",
            current: initialCard,
            next: null,
        });
        if (!(await waitForRun(token, ENTER_ANIMATION_MS, isMountedRef, runTokenRef))) return;

        let previousName = initialCard;

        while (true) {
            const { selectedNames, allNames } = helloBlipRef.current;
            const target = selectedNames[0];

            if (target == null) {
                break;
            }

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

            const nextHellos = new Set(helloBlipRef.current.hellos ?? []);
            nextHellos.add(target);
            const nextSelectedNames = helloBlipRef.current.selectedNames.filter((name) => name !== target);
            const nextHelloState = {
                ...helloBlipRef.current,
                selectedNames: nextSelectedNames,
                hellos: helloBlipRef.current.allNames.filter((name) => nextHellos.has(name)),
            };

            helloBlipRef.current = nextHelloState;

            setHelloBlip((prev) => {
                const persistedNextHellos = new Set(prev.hellos ?? []);
                persistedNextHellos.add(target);

                return {
                    ...prev,
                    selectedNames: prev.selectedNames.filter((name) => name !== target),
                    hellos: prev.allNames.filter((name) => persistedNextHellos.has(name)),
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

        if (helloBlip.selectedNames.length === 0) {
            setHelloBlip((prev) => ({
                ...prev,
                waveActive: false,
                waveRequestId: undefined,
            }));
            return;
        }

        const token = ++runTokenRef.current;
        void runWaveSequence(token);
    }, [
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

    useEffect(() => {
        if (!isHoldingCurrent) return;

        if (firstWaveBright) {
            // playHelloWave2Sound();
            return;
        }

        playHelloWave1Sound();
    }, [firstWaveBright, isHoldingCurrent, playHelloWave1Sound, playHelloWave2Sound]);

    useEffect(() => {
        if (helloBlip.waveActive) return;
        if (runtime.phase === "hidden" || runtime.phase === "exiting") return;

        const token = ++runTokenRef.current;

        void (async () => {
            playExitSound();
            setRuntime((prev) => ({
                ...prev,
                phase: "exiting",
                next: null,
            }));

            if (!(await waitForRun(token, EXIT_ANIMATION_MS, isMountedRef, runTokenRef))) return;

            setRuntime({
                phase: "hidden",
                current: null,
                next: null,
            });
        })();
    }, [helloBlip.waveActive, playExitSound, runtime.phase]);

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
                        {/* underbar */}
                        <div className={clsx("absolute bg-amber-900 border-amber-900 border-4 -right-12 h-0 w-10 bottom-1  ",
                            "transition-all  duration-300",
                            // "translate-y-0",
                            //                         isHoldingCurrent
                            // ? firstWaveBright ? "translate-y-2" : "translate-y-0"
                            // : "translate-y-2"
                        )}
                        />
                        {/* overbar */}
                        <div className={clsx("absolute bg-amber-700 border-amber-700 border-4 -right-18 h-0 w-16 bottom-6  ",
                            "transition-transform origin-bottom-left duration-300",
                            // isHoldingCurrent
                            //     ? firstWaveBright ? "-rotate-4" : "-rotate-32"
                            //     : "-rotate-4")} />
                            isHoldingCurrent
                                ? firstWaveBright ? "-translate-y-2" : "-translate-y-4"
                                : "-translate-y-2")} />
                        {/* circle */}
                        <div className={clsx("absolute bg-amber-800 border-amber-800 shadow-lg shadow-black border-4 rounded-full -right-15 h-8 w-8 -bottom-2  ",
                            "transition-transform origin-center duration-300",
                            'flex font-sans text-2xl text-black justify-center align-center',
                            isHoldingCurrent
                                ? firstWaveBright ? "-rotate-4" : "-rotate-32"
                                : "-rotate-4"
                        )} >X</div>
                        {/* isHoldingCurrent
                                ? firstWaveBright ? "-rotate-4" : "-rotate-32"
                              : "-rotate-4")} /> */}
                        {/* hand  */}
                        <div
                            className={clsx(
                                "absolute -top-2 -right-20 origin-bottom text-6xl -scale-x-100 transition-[rotate_transform]  duration-300",
                                isHoldingCurrent
                                    ? firstWaveBright ? "rotate-60" : "rotate-32 -translate-x-1"
                                    : "rotate-60"
                            )}
                        >
                            🖐️
                        </div>

                        {/* <div
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
                        </div> */}
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
    // const [isAdding, setIsAdding] = useState(false);
    const [draftName, setDraftName] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [namesToDelete, setNamesToDelete] = useState<string[]>([]);
    const isRevealing = helloBlip.waveActive === true;
    const normalizedDraftName = normalizeSearchText(draftName);

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

    function toggleDeleteSelection(name: string) {
        setNamesToDelete((prev) =>
            prev.includes(name)
                ? prev.filter((entry) => entry !== name)
                : [...prev, name]
        );
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

    function beginDelete() {
        setIsDeleting(true);
        setNamesToDelete([]);
    }

    function cancelDelete() {
        setIsDeleting(false);
        setNamesToDelete([]);
    }

    function confirmDelete() {
        if (namesToDelete.length === 0) {
            cancelDelete();
            return;
        }

        const namesToDeleteSet = new Set(namesToDelete);

        setHelloBlip((prev) => ({
            ...prev,
            allNames: prev.allNames.filter((name) => !namesToDeleteSet.has(name)),
            selectedNames: prev.selectedNames.filter((name) => !namesToDeleteSet.has(name)),
            hellos: prev.hellos?.filter((name) => !namesToDeleteSet.has(name)),
        }));
        cancelDelete();
    }

    function resetWaves() {
        setHelloBlip((prev) => ({
            ...prev,
            hellos: [],
        }));
    }

    function handleWave() {
        if (isRevealing) {
            setHelloBlip((prev) => ({
                ...prev,
                selectedNames: [],
                waveActive: false,
                waveRequestId: undefined,
            }));
            return;
        }

        if (isDeleting || helloBlip.selectedNames.length === 0) return;

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
            <div className="flex gap-3">
                <Button
                    type="button"
                    size="lg"
                    className="ring-black"
                    mode={helloBlip.selectedNames.length > 0 ? "activated" : "normal"}
                    disabled={isRevealing ? false : helloBlip.selectedNames.length === 0 || isDeleting}
                    onClick={handleWave}
                >
                    {isRevealing ? "Stop" : "Wave"}
                </Button>
                
                <input
                    autoFocus
                    type="text"
                    value={draftName}
                    onChange={(evt) => setDraftName(evt.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="h-9 rounded-lg border border-black px-3 text-black bg-white"
                />
                <Button
                    type="button"
                    size="lg"
                    variant="b"
                    className="ml-auto ring-black"
                    disabled={(helloBlip.hellos?.length ?? 0) === 0}
                    onClick={resetWaves}
                >
                    Reset waves
                </Button>

            </div>

            <div className="columns-5">
                {/* <div className="flex flex-wrap gap-2"> */}
                {getAlphaSortedNames(helloBlip.allNames).map((name) => {
                    const isSelected = helloBlip.selectedNames.includes(name);
                    const isMarkedForDelete = namesToDelete.includes(name);
                    const wasWaved = helloBlip.hellos?.includes(name) ?? false;
                    const isDraftMatch =
                        // isAdding &&
                        normalizedDraftName.length > 0 &&
                        normalizeSearchText(name).includes(normalizedDraftName);

                    return (
                        <Button
                            key={name}
                            type="button"
                            size="med"
                            variant="b"
                            mode={!isDeleting && isSelected ? "activated" : "normal"}
                            // disabled={isRevealing}
                            className={clsx(
                                "ring-black text-left mb-1 py-0.5 h-auto",
                                isDeleting && isMarkedForDelete && "bg-red-200 text-black ring-red-300 hover:bg-red-200 hover:text-black",
                                !isDeleting && isSelected && "bg-amber-200 text-black ring-amber-300 hover:bg-amber-200 hover:text-black",
                                !isDeleting && !isSelected && wasWaved && "bg-stone-200 text-black ring-stone-300 hover:bg-stone-200 hover:text-black",
                                !isDeleting && !isSelected && isDraftMatch && "bg-amber-200 text-black ring-sky-300 hover:bg-sky-100 hover:text-black"
                            )}
                            onClick={() => isDeleting ? toggleDeleteSelection(name) : toggleSelected(name)}
                        >
                            {name}
                        </Button>
                    );
                })}

            
            </div>

            <div className="flex items-center gap-2">
<Button
                    type="button"
                    size="lg"
                    variant={isDeleting ? "c" : "b"}
                    className="ring-black"
                    disabled={isRevealing}
                    onClick={() => isDeleting ? cancelDelete() : beginDelete()}
                >
                    {isDeleting ? "Cancel" : "Delete"}
                </Button>
                {isDeleting && (
                    <Button
                        type="button"
                        size="lg"
                        variant="c"
                        className="ring-black"
                        disabled={isRevealing}
                        onClick={confirmDelete}
                    >
                        Delete
                    </Button>
                )}
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
        getAlphaNumericSortKey(a).localeCompare(getAlphaNumericSortKey(b), undefined, { numeric: true }) ||
        a.localeCompare(b, undefined, { numeric: true })
    );
}

function getAlphaNumericSortKey(name: string) {
    const alphaNumericOnly = name
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/gi, "")
        .toLowerCase();

    return alphaNumericOnly || name.toLowerCase();
}

function normalizeSearchText(text: string) {
    return text.trim().toLowerCase();
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
