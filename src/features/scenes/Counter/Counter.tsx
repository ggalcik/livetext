import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";
import { format, parse } from "date-fns";
import './Counter.css';
import { CounterSceneSchema, type Counter } from "./types";
import dling from '/src/assets/dling.mp3';
import notebook from '../../../assets/notebook.png'
import { usePersistentState } from "../../../hooks/usePersistentState";
import { transform } from "zod";


export default function Counter() {
    const [scene] = usePersistentState({
        storageKey: 'counterScene',
        schema: CounterSceneSchema,
        fallback: { counters: [], currentDate: format(new Date(), 'yyyyMMdd') }
    })

    const audio = new Audio(dling);

    const playSound = useCallback(() => {
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const activeCounters = scene.counters.filter((c) => c.show);

    // TODO: display history counters
    //     const showingHistory = !!(scene.showDate && scene.history && scene.history[scene.showDate].length > 0);
    // const showingDate = scene.showDate || format(new Date(), 'yyyyMMdd');
    // const countersToShow = showingHistory && scene.showDate && scene.history
    //     ? scene.history[scene.showDate]
    //     : scene.counters.filter((c) => c.show);
    function getModScale(
        numCounters: number,
        topScale = 0.85,
        bottomScale = 0.55
    ): number {
        const minCount = 5;
        const maxCount = 10;

        if (numCounters <= minCount) return topScale;
        if (numCounters >= maxCount) return bottomScale;

        const ratio = (numCounters - minCount) / (maxCount - minCount);
        const scale = topScale - (topScale - bottomScale) * ratio;
        return Math.round(scale * 1000) / 1000;
    }




    return (
        <div className="absolute w-full h-full bg-amber-900">

            <MasterViewport name="counter" resizable={false}>
                <div className={`absolute w-full h-full origin-top-left`}
                    style={{transform: `scale(${getModScale(activeCounters.length)})`  }} 
                >

                <div className={`absolute w-200 h-200 -left-30 top-0 bg-cover`}
                    style={{ backgroundImage: `url(${notebook})` }}>

                </div>

                <div className="p-4 relative">
                    <div className="absolute w-[100vw]">
                        <div className="text-lg font-[Ink_Free] -rotate-6 mt-2 text-black ">The repetiton counters for</div>
                        <div className="text-3xl leading-6 font-[Ink_Free] -rotate-2  font-bold  ml-35 mt-2 text-black ">
                            {parse(scene.currentDate, 'yyyyMMdd', new Date()).toDateString()} A.D.
                        </div>
                    </div>
                    <div className="grid gap-2 text-blue-800 mt-21">
                        {activeCounters.map((c) => (
                            <CounterRow key={c.id} counter={c} playSound={playSound} />
                        ))}
                    </div>
                </div>
        </div>
            </MasterViewport >
        </div >
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
    }, [counter.lastIncrement, playSound, counter.play]);

    return (
        <div
            className={`flex w-120 text-4xl font-[Gabriola] font-bold leading-[34px] justify-between p-2 gap-4`} >
            <div className={`${animating && "animate-tada-color "}`} >{counter.name}</div>
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