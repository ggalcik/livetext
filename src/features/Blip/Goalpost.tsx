import { useCallback, useEffect } from 'react';
import goalSky from './assets/goalpost back.png';
import goalGrass from './assets/goalpost grass.png';
import goalPost from './assets/goalpost.png';
import goalSound from './assets/goalpost.mp3';
import type { BlipProps } from './types';
import './Blip.css';
import { gGlobal } from '../Global/global';




export default function Goalpost({ endBlip }: BlipProps) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 15000);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    const audioGoal = new Audio(goalSound);

    const playSound = useCallback((audio: HTMLAudioElement) => {
        audio.volume = 0.3;
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    
    const stopSound = useCallback((audio: HTMLAudioElement) => {
        audio.pause();
        audio.currentTime = 0;
    }, []);

    useEffect(() => {
        playSound(audioGoal);

        return () => stopSound(audioGoal);
    }, []);

    return (
        <div className={`w-full h-full relative animate-goalblip bg-blue-400 ${gGlobal.layout.crampedPortrait && '-translate-y-60'}`}>
            <img src={goalSky} className='absolute top-0 scale-120 animate-goal-sky' />
            <div className='absolute animate-goal-ground w-full h-full bottom-0'>
                <img src={goalGrass} className='absolute -bottom-28 w-full' />
                <img src={goalPost} className='absolute animate-goalpost -bottom-20 w-full ' />
            </div>
        </div>
    );
}