import { useState, useEffect } from "react";
import { CounterSceneSchema, type Counter, type CounterScene } from "./types";
import CounterAdminRow from "./CounterAdminRow";
import { Button } from "../../../components/Button";
import { usePersistentState } from "../../../hooks/usePersistentState";
import { parse, format } from "date-fns";
import { addCounter, doDayReset, sortAlphaUp, sortCheckedUp, todayKey } from "./counterHelpers";

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

    function handleAddCounter(addBlank = false) {
        const added = addCounter(scene, setScene, {
            name: newName,
            value: newValue,
            addBlank,
        });

        if (!added) return;
        setNewName("");
        setNewValue("");
    }

    function updateScene(counters: Counter[]) {
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

    function handleDayReset() {
        doDayReset(scene, setScene);
        setConfirmReset(false);
    }

    const maxActive = scene.counters.filter(i => i.show).length >= 10;

    return (
        <div className="">



            <div className="p-4 border border-gray-400 flex justify-between bg-amber-50">

                <div className="">
                    Display: <span className="font-bold">
                        {format(parse(scene.currentDate, 'yyyyMMdd', new Date()), "eee MMM d yyyy G")}
                    </span>

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
                                    onClick={handleDayReset}
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

            <div className="flex gap-2 py-4">
                <Button onClick={() => sortCheckedUp(scene, setScene)}>Sort checked up</Button>
                <Button onClick={() => sortAlphaUp(scene, setScene)}>Sort alpha up</Button>
            </div>

            <div className="lg:columns-2 space-y-1 scale-100 origin-top-left bg-green-100">
                {scene.counters.map((c) => (
                    <CounterAdminRow
                        key={c.id}
                        counter={c}
                        onUpdate={updateCounter}
                        onDelete={deleteCounter}
                        maxActive={maxActive}
                    />
                ))}

                {/* Add new counter row */}
                <div className="flex gap-2">
                    <div>
                        <Button
                            onClick={() => handleAddCounter(true)}>Add blank</Button>
                    </div>
                    <input
                        className="flex-1 border p-1 bg-white"
                        placeholder="Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddCounter()}
                    />
                    <input
                        className="w-20 border p-1 bg-white"
                        placeholder="0"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddCounter()}
                    />
                </div>
            </div>



        </div>
    );
}
