import { useEffect, useRef, type CSSProperties } from "react";

import noBeep from "../scenes/Panels/panels/assets/fail.mp3";
import "./Blip.css";

export default function OverAnalogy() {
  const audioRef = useRef(new Audio(noBeep));

  useEffect(() => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.warn("Could not play sound:", err);
    });

    return () => audio.pause();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center bg-red-600 text-center [container-type:size]">
      <div
        style={{ "--analogy-color": "#fcd34d" } as CSSProperties}
        className="max-w-[80%] animate-analogy-blink px-8 py-6 font-[Carter_One] text-[clamp(55px,7cqw,96px)] text-amber-200"
      >
        AN ANALOGY ISN'T PROOF
      </div>
    </div>
  );
}
