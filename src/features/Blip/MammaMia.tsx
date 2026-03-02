import { useCallback, useEffect } from 'react';
import mammaMiaAudio from './assets/mario.mp3';
import mammaMiaMario from './assets/mario.png';
import mammaMiaHand from './assets/mario_hand.png';
import type { BlipProps } from './types';
import './Blip.css';




export default function MammaMia({ endBlip }: BlipProps) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 1800);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    const audioMammaMia = new Audio(mammaMiaAudio);

    const playSound = useCallback((audio: HTMLAudioElement) => {
        audio.volume = 0.2;
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const stopSound = useCallback((audio: HTMLAudioElement) => {
        audio.pause();
        audio.currentTime = 0;
    }, []);

    useEffect(() => {
        // return;
        playSound(audioMammaMia)
        return () => stopSound(audioMammaMia);
    }, []);

    const randDeg = Math.floor(Math.random()*120 - 40);
    
    return (
        <div className="absolute -bottom-1/8 left-1/2 -translate-x-1/2 origin-top -rotate-20 text-white"
        style={{transform: `rotate(${randDeg}deg)`}}>
            <div className='relative animate-mario '>
                <img src={mammaMiaMario} className='' />
                <img src={mammaMiaHand} className='absolute animate-mario-hand top-[-150px] left-[-25px] origin-bottom ' />
            </div>
        </div>
    );
}