import { useEffect, useRef, type CSSProperties } from "react";
import clsx from "clsx";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import noBeep from "../scenes/Panels/panels/assets/fail.mp3";
import type { BlipProps } from "./types";
import "./Blip.css";

export default function Analogy(_: BlipProps) {
    const audioInRef = useRef(new Audio(noBeep));

    useEffect(() => {
        audioInRef.current.currentTime = 0;
        // audioInRef.current.play().catch((err) => {
        //     console.warn("Could not play sound:", err);
        // });

        // return () => {
        //     audioInRef.current.pause();
        // };
    }, []);

    return (
        <div className="absolute h-full w-full text-white">
            <MasterViewport name="blip_analogy">
                <div
                    className={clsx(
                        "flex h-full w-full items-center justify-center",
                        "bg-red-600/80 text-center backdrop-blur-sm [container-type:size]",
                        "animate-analogy-enter"
                    )}
                >
                    <div
                        style={{ "--analogy-color": "#fcd34d" } as CSSProperties}
                        className="max-w-[80%] px-8 py-6 animate-analogy-blink font-[Carter_One] text-[clamp(55px,7cqw,96px)] text-amber-200 "
                    >
                       AN ANALOGY ISN'T PROOF
                    </div>
                </div>
            </MasterViewport>
        </div>
    );
}
