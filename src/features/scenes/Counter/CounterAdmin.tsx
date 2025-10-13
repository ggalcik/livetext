import { useState, useEffect } from "react";
import { CounterSchema, CounterSceneSchema, type Counter, type CounterScene } from "./types";
import CounterAdminRow from "./CounterAdminRow";
import { Button } from "../../../components/Button";
import { usePersistentState } from "../../../hooks/usePersistentState";
import { parse, format } from "date-fns";

function todayKey(): string {
    return format(new Date(), 'yyyyMMdd');
}

function DateSelector({
    scene,
    setScene,
}: {
    scene: CounterScene;
    setScene: React.Dispatch<React.SetStateAction<CounterScene>>;
}) {
    const dates = Object.keys(scene.history ?? {}).sort().reverse();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setScene({
            ...scene,
            showDate: e.target.value, // save directly in main state
        });
    };

    return (
        <div className="border p-2 max-w-xs">
            <select
                value={scene.showDate ?? "current"}
                onChange={handleChange}
                size={5} // shows 5 rows, scrollable
                className="w-full border rounded"
            >
                <option value="current">current</option>
                {dates.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>
        </div>
    );
}


export default function CounterAdmin() {

    const [scene, setScene] = usePersistentState({
        storageKey: 'counterScene',
        schema: CounterSceneSchema,
        fallback: { counters: [], currentDate: todayKey() }
    })

    const [confirmReset, setConfirmReset] = useState(false);

    const [newName, setNewName] = useState("");
    const [newValue, setNewValue] = useState("");

    // Save to localStorage when scene changes
    useEffect(() => {
        localStorage.setItem("counterScene", JSON.stringify(scene));
    }, [scene]);

    function addCounter(addBlank = false) {
        if (!newName.trim() && !addBlank) return;
        const counter: Counter = {
            id: Math.random().toString(36).slice(2),
            name: newName.trim(),
            value: newValue ? parseInt(newValue, 10) || 0 : 0,
            show: true,
            play: false,
            lastIncrement: 0,
        };
        const counters = [...scene.counters, counter];
        updateScene(counters);
        setNewName("");
        setNewValue("");
    }

    function updateScene(counters: Counter[]) {
        setScene({ ...scene, counters });
    }

    // TODO: only move to history when day reset is clicked. or maybe have it occasionally check date and block updates if off? or do automatically?
    function updateSceneOld(counters: Counter[]) {
        const date = todayKey();
        const active = counters.filter((c) => c.show && c.value !== 0 && c.name)
            .map((c) => ({ name: c.name, value: c.value }));
        const history = { ...scene.history, [date]: active };
        setScene({ ...scene, counters });
    }

    function updateCounter(id: string, update: Partial<Counter>) {
        const counters = scene.counters.map((c) =>
            c.id === id ? { ...c, ...update } : c
        );
        updateScene(counters);
    }

    function deleteCounter(id: string) {
        const counters = scene.counters.filter((c) => c.id !== id);
        updateScene(counters);
    }

  function doDayReset() {
  const date = scene.currentDate || todayKey();

  // 1. Copy current counters to history
  const active = scene.counters
    .filter((c) => c.value !== 0 && c.name)
    .map((c) => ({ name: c.name, value: c.value }));

  const updatedHistory = {
    ...scene.history,
    [date]: active,
  };

  // 2. Reset counters
  const resetCounters = scene.counters.map((counter) => ({
    ...counter,
    value: 0,
    show: false,
    play: true,
  }));

  // 3. Update scene with new date and cleared counters
  setScene({
    ...scene,
    counters: resetCounters,
    history: updatedHistory,
    currentDate: todayKey(),
  });

  setConfirmReset(false);
}

    function doDayResetOld() {
        if (scene.counters) {
            setScene(
                {
                    ...scene,
                    counters: scene.counters.map((counter) => { return { ...counter, value: 0, show: false, play: true } })
                }
            )
            setConfirmReset(false);
        }
    }

    return (
        <div className="flex justify-between gap-8">

            <div className="w-1/2 space-y-4">
                {scene.counters.map((c) => (
                    <CounterAdminRow
                        key={c.id}
                        counter={c}
                        onUpdate={updateCounter}
                        onDelete={deleteCounter}
                    />
                ))}

                {/* Add new counter row */}
                <div className="flex gap-2">
                    <div>
                        <Button
                            onClick={() => addCounter(true)}>Add blank</Button>
                    </div>
                    <input
                        className="flex-1 border p-1"
                        placeholder="Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCounter()}
                    />
                    <input
                        className="w-20 border p-1"
                        placeholder="0"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCounter()}
                    />
                </div>
            </div>

            <div className=" w-1/2 flex justify-between">

                <div className="">
                    Display: { format(parse(scene.currentDate, 'yyyyMMdd', new Date()), "eee MMM d yyyy G") }

                </div>


                {scene.counters.length > 0 &&
                    <div className="">
                        {!confirmReset ? (
                            <button
                                className="px-2 bg-red-200 cursor-pointer"
                                onClick={() => setConfirmReset(true)}
                            >
                                Day reset
                            </button>
                        ) : (
                            <>
                                <button
                                    className="px-2 bg-red-500 text-white cursor-pointer"
                                    onClick={() => doDayReset()}
                                >
                                    Sure?
                                </button>
                                <button className="px-2 cursor-pointer" onClick={() => setConfirmReset(false)}>
                                    ✕
                                </button>
                            </>
                        )}


                    </div>
                }
            </div>

        </div>
    );
}
