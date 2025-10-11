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

// TODO: display history banners
    //     const showingHistory = !!(scene.showDate && scene.history && scene.history[scene.showDate].length > 0);
    // const showingDate = scene.showDate || format(new Date(), 'yyyyMMdd');
    // const countersToShow = showingHistory && scene.showDate && scene.history
    //     ? scene.history[scene.showDate]
    //     : scene.counters.filter((c) => c.show);


    return (
        <div className="absolute w-full h-full bg-amber-900">

            <MasterViewport name="counter" noResize>
                <div className="absolute w-full h-full scale-75">

                    <div className={`absolute w-200 h-200 -left-30 top-0 bg-cover`}
                        style={{ backgroundImage: `url(${notebook})` }}>

                    </div>

                    <div className="p-4 relative">
                        <div className="absolute w-[100vw]">
                            <div className="text-lg font-[Ink_Free] -rotate-6 mt-2 text-black ">The Same Old, Same Old counters for</div>
                            <div className="text-2xl leading-6 font-[Ink_Free] -rotate-2  font-bold  ml-40 text-black ">{dateStr()} A.D.</div>
                        </div>
                        <div className="grid gap-2 text-blue-800 mt-21">
                            {activeCounters.map((c) => (
                                <CounterRow key={c.id} counter={c} playSound={playSound} />
                            ))}
                        </div>
                    </div>
                </div>
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
            if (counter.play)
                playSound();
        }
    }, [counter.lastIncrement]);

    return (
        <div
        className={`flex w-100 text-4xl font-[Gabriola] font-bold leading-[34px] justify-between p-2 gap-4 
        ${animating && "animate-tada-color "}`}
 
        >
            <div
            //  className={`${animating && "animate-tada " }`}
            >{counter.name}</div>
            <div className="relative">
                <div
                    className={`${animating && "animate-tada "} scale-150`}
                    onAnimationEnd={() => setAnimating(false)}
                >{counter.value}</div>
                {animating && <Burst />}
                
            </div>
        </div>
    );
}

function Burst() {

    return <div className="absolute inset-0 flex items-center justify-center animate-burst">
        <div className="relative w-8 h-8 scale-150">
             {/* <div className="absolute -translate-1/2 top-1/2 left-1/2  w-16 h-16 rounded-full border border-red-300" /> */}
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 top-1/2 -ml-1 -mt-2 w-0 h-0
                           border-l-[4px] border-r-[4px] border-t-[12px] border-transparent
                           border-t-red-500"
                    style={{ transform: `rotate(${i * 60}deg) translateY(-12px)` }}
                />
            ))}
        </div>
    </div>

}