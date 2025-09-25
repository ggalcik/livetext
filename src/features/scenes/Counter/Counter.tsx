import { useEffect, useRef, useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";
import { dateStr } from "../../../components/util";
import './Counter.css';
import { type Counter } from "./types";
import dling from '/src/assets/dling.mp3';
import notebook from '../../../assets/notebook.png'

type CounterScene = {
    counters: Counter[];
    history: Record<string, Counter[]>;
};

export default function Counter() {
    const [scene, setScene] = useState<CounterScene>({ counters: [], history: {} });
    const audio = new Audio(dling);

    const playSound = () => {
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    };

    // load once + subscribe to storage events
    useEffect(() => {
        const load = () => {
            const raw = localStorage.getItem("counterScene");
            if (raw) {
                try {
                    setScene(JSON.parse(raw));
                } catch {
                    console.warn("Bad counterScene JSON");
                }
            }
        };
        load();
        window.addEventListener("storage", load);
        return () => window.removeEventListener("storage", load);
    }, []);

    const activeCounters = scene.counters.filter((c) => c.show);




    return (
        <div className="absolute w-full h-full bg-amber-900">

            <MasterViewport name="counter">
                <>
                    <div className={`absolute w-200 h-200 -left-30 top-0 bg-cover`}
                        style={{ backgroundImage: `url(${notebook})` }}>

                    </div>

                    <div className="p-4 relative">
                        <div className="text-lg text-white text-center">The Same Old Same Old counters for</div>
                        <div className="text-lg font-bold mb-4 text-white text-center">{dateStr()} A.D.</div>
                        <div className="grid gap-2">
                            {activeCounters.map((c) => (
                                <CounterRow key={c.id} counter={c} playSound={playSound} />
                            ))}
                        </div>
                    </div>
                </>
            </MasterViewport>
        </div>
    );
}

interface ICounterRow {
    counter: Counter;
    playSound: () => void
}

function CounterRow({ counter, playSound }: ICounterRow) {
    const [animating, setAnimating] = useState(false);
    const prevIncrement = useRef<number | null>(null);

    useEffect(() => {
        // skip the first render
        if (prevIncrement.current === null) {
            prevIncrement.current = counter.lastIncrement;
            return;
        }

        if (counter.lastIncrement !== prevIncrement.current) {
            prevIncrement.current = counter.lastIncrement;
            setAnimating(true);
            playSound();
        }
    }, [counter.lastIncrement]);

    return (
        <div
            className={`flex w-100 text-3xl font-[Gabriola] font-bold leading-[34px] justify-between p-2 gap-4 `}
            onAnimationEnd={() => setAnimating(false)}
        >
            <span
            //  className={`${animating && "animate-tada " }`}
            >{counter.name}</span>
            <span
                className={`${animating && "animate-tada "}`}
                onAnimationEnd={() => setAnimating(false)}
            >{counter.value}</span>
        </div>
    );
}
