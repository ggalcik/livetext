import { useCallback, useEffect } from 'react';
// import driveIn from './assets/honkers_in.mp3';
// import honkhonk from './assets/honkers1.mp3';
import honkersAudio from './assets/honkers_full.mp3';
// import driveOut from './assets/honkers_out.mp3';
import honkers from './assets/holy_honkers_blip.png';
import type { BlipProps } from './types';




export default function HolyHonkers({endBlip}: BlipProps) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 4000);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    const audioHonk = new Audio(honkersAudio);
    // const audioIn = new Audio(driveIn);
    // const audioOut = new Audio(driveOut);

    const playSound = useCallback((audio:HTMLAudioElement) => {
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    useEffect(() => {

        playSound(audioHonk)


    }, []);

    return (
        <div className="inset-0 animate-honkers origin-bottom">
            <img className="w-4/5 m-auto translate-y-40" src={honkers} />
        </div>
    );
}