import { useEffect, useRef } from "react";
import type { BlipProps } from "./types";
import egregore1 from "../../features/scenes/Panels/panels/assets/egregore1.png";
import egregore2 from "../../features/scenes/Panels/panels/assets/egregore2.png";
import egregore3 from "../../features/scenes/Panels/panels/assets/egregore3.png";
import egregore4 from "../../features/scenes/Panels/panels/assets/egregore4.png";
import egregore_sound from "./assets/egregore 6.mp3"
import './Blip.css';

export default function Egregore({ endBlip }: BlipProps) {


      const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(egregore_sound);
    const audio = audioRef.current;
    audio.volume = 0.7;
    audio.play().catch((err) => {
      console.warn("Could not play sound:", err);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 9000);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    return (
        <div className="animate-rise-enter translate-x-[5%] w-[90%]">
            <img className="border-8 border-transparent top-0  opacity-0" src={egregore1} />
            <img className="animate-fadein-egregore1 absolute border-8 border-transparent top-0" src={egregore1} />
            <img className="animate-fadein-egregore2 opacity-0 absolute border-8 border-amber-600 top-0" src={egregore2} />
            <img className="animate-fadein-egregore4 opacity-0 absolute border-8 border-transparent top-0" src={egregore4} />
            <div className="egregore-wave animate-charwave-container opacity-0
                absolute top-[45%] left-[50%] -translate-x-[50%] text-center w-full
                text-8xl font-bold font-[Old_English_Text_MT] text-blue-500 tracking-widest mix-blend-screen">
                <span>e</span>
                <span>g</span>
                <span>r</span>
                <span>e</span>
                <span>g</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
            </div>
            <div className="egregore-wave animate-charwave-container opacity-0
                absolute top-[45%] left-[50%] -translate-x-[50%] text-center w-full scale-110
                text-8xl font-bold font-[Old_English_Text_MT] text-red-600 tracking-widest mix-blend-exclusion">
                <span>e</span>
                <span>g</span>
                <span>r</span>
                <span>e</span>
                <span>g</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
            </div>
        </div>
    );

    {/* <img className="border-8 border-amber-600" src={egregore2} /> */ }
    {/* <img className="absolute" src={egregore4} /> */ }
}