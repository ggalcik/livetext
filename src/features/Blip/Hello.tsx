import { format } from "date-fns";
import { useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { Button } from "../../components/Button";
import { usePersistentState } from "../../hooks/usePersistentState";
import { HelloBlipSchema } from "./types";

function getTodayDate() {
    return format(new Date(), "yyyyMMdd");
}

function createDefaultState() {
    return {
        todayDate: getTodayDate(),
        allNames: [],
        selectedNames: [],
    };
}

export default function Hello() {
    const [helloBlip] = usePersistentState({
        storageKey: "helloBlip",
        schema: HelloBlipSchema,
        fallback: createDefaultState(),
    });

    const selectedLookup = new Map(
        helloBlip.selectedNames.map((name, index) => [name, index + 1])
    );
    const wavedNames = new Set(helloBlip.hellos ?? []);

    return (
        <div className="absolute inset-0 text-white">
            <MasterViewport name="blip_hello">
                <div className="flex h-full w-full flex-wrap content-center justify-center gap-4 bg-black/40 px-[8%] py-[10%] backdrop-blur-sm">
                    {helloBlip.allNames.map((name) => {
                        const queuePosition = selectedLookup.get(name);
                        const isSelected = queuePosition !== undefined;
                        const wasWaved = wavedNames.has(name);

                        return (
                            <div
                                key={name}
                                className={clsx(
                                    "min-w-32 rounded-xl border border-black px-5 py-3 text-center font-[Candara] text-3xl shadow-lg shadow-black",
                                    isSelected && "bg-amber-200 text-black ring-4 ring-amber-300",
                                    !isSelected && wasWaved && "border-stone-700 bg-stone-200 text-stone-900 ring-2 ring-stone-500",
                                    !isSelected && !wasWaved && "bg-sky-900 text-amber-100"
                                )}
                            >
                                {isSelected ? `${queuePosition}. ${name}` : name}
                            </div>
                        );
                    })}
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

    const wavedNames = new Set(helloBlip.hellos ?? []);

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
        setHelloBlip((prev) => {
            if (prev.selectedNames.length === 0) return prev;

            const existingHellos = new Set(prev.hellos ?? []);

            for (const name of prev.selectedNames) {
                existingHellos.add(name);
            }

            return {
                ...prev,
                selectedNames: [],
                hellos: prev.allNames.filter((name) => existingHellos.has(name)),
            };
        });
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
                    const wasWaved = wavedNames.has(name);

                    return (
                        <Button
                            key={name}
                            type="button"
                            size="lg"
                            variant="b"
                            mode={isSelected ? "activated" : "normal"}
                            className={clsx(
                                "ring-black",
                                isSelected && "bg-amber-200 text-black ring-amber-300",
                                wasWaved && !isSelected && "border-stone-700 bg-stone-200 text-stone-900 ring-2 ring-stone-500"
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
                    disabled={helloBlip.selectedNames.length === 0}
                    onClick={handleWave}
                >
                    Wave
                </Button>
                <div className="text-sm text-black/70">
                    Click to queue names in order. Wave clears the queue and marks them as previously waved.
                </div>
            </div>
        </div>
    );
}
