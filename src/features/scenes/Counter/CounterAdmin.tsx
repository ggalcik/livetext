import { useState, useEffect } from "react";
import type { Counter, CounterScene } from "./types";
import CounterAdminRow from "./CounterAdminRow";
import { Button } from "../../../components/Button";

function todayKey(): string {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
}

export default function CounterAdmin() {
    const [scene, setScene] = useState<CounterScene>(() => {
        const raw = localStorage.getItem("counterScene");
        if (raw) {
            try {
                return JSON.parse(raw) as CounterScene;
            } catch {
                console.warn("Bad counterScene JSON");
            }
        }
        return { counters: [], history: {} };
    });

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
        const date = todayKey();
        const active = counters.filter((c) => c.show && c.value !== 0 && c.name);
        const history = { ...scene.history, [date]: active };
        setScene({ counters, history });
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

    return (
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
    );
}
