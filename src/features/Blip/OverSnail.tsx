import { useCallback, useEffect, useRef } from 'react';
import OverSnailReverse from './OverSnailReverse';
import snailUniverseOBS from './assets/snail universe obs.mp3';
import snailBackdrop from './assets/snail_backdrop.jpg';
import snailIdol from './assets/Snail.png';
import snailFart from './assets/Galaxy.png';
import nyeh from './assets/nyeh.png';
import nyeh_xeno from './assets/nyeh_xeno.png';
import type { BlipProps } from './types';
import './Blip.css';

import chant1a from './assets/snail_choral_1a.mp3';
import chant1b from './assets/snail_choral_1b.mp3';
import chant2 from './assets/snail_choral_2.mp3';
import chant3 from './assets/snail_choral_3.mp3';
import chantN from './assets/snail_choral_nyeh.mp3';
import chantXeno from './assets/snail_choral_xeno.mp3';

const variantAudio: Record<string, string> = {
    '1a': chant1a,
    '1b': chant1b,
    '2': chant2,
    '3': chant3,
    'N': chantN,
    'Xeno': chantXeno
}

const OVER_SNAIL_REVERSE_RATE = 0.7;

export function OverSnailDefault({ endBlip, variant }: BlipProps) {
    const shell = variant === 'shell';

    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 12000);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    const playSound = useCallback((audio: HTMLAudioElement, volume = 1) => {
        audio.volume = volume;
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const stopSound = useCallback((audio: HTMLAudioElement) => {
        audio.pause();
        audio.currentTime = 0;
    }, []);

    useEffect(() => {
        if (shell) return;
        const background = new Audio(snailUniverseOBS);
        const choir = variant && variantAudio[variant] && new Audio(variantAudio[variant]);
        playSound(background);
        const choirTimeout = choir
            ? setTimeout(() => playSound(choir, 0.5), variant === 'N' ? 2500 : 1000)
            : undefined;

        return () => {
            if (choirTimeout) clearTimeout(choirTimeout);
            stopSound(background);
            if (choir) stopSound(choir);
        }
    }, [playSound, shell, stopSound, variant]);

    const nyehImg = variant === 'Xeno' ? nyeh_xeno : nyeh;

    return (
        <>
        <div className="w-full h-full relative animate-over-snail-blip origin-bottom">
            <img src={snailBackdrop} className={`absolute bottom-20 ${shell ? 'scale-300' : 'scale-150'} animate-over-snail-universe`} />
            {!shell &&
                <div className="absolute right-1/6 bottom-1/2 flex flex-col items-end font-[Broadway] text-white drop-shadow-xl drop-shadow-black">
                    <div className="animate-snail-text-1 opacity-0 text-2xl">The</div>
                    <div className="animate-snail-text-2 opacity-0 text-5xl">Ontological</div>
                    <div className="animate-snail-text-3 opacity-0 text-5xl">Snail</div>
                    <div className="animate-snail-text-4 opacity-0 text-2xl">that</div>
                    <div className="animate-snail-text-5 opacity-0 text-5xl">Expresses</div>
                    <div className="animate-snail-text-6 opacity-0 text-5xl">Universes</div>
                </div>
            }
            <div className="absolute animate-galaxy-fart bottom-0 translate-30">
                <img src={snailFart} className="animate-galaxy-spin xopacity-0 scale-60" />
            </div>
            {!shell && <img src={nyehImg} className={`absolute ${variant === 'Xeno' ? 'animate-xeno' : 'animate-nyeh'} bottom-1/4 right-1/4`} />}
        </div>
         <img src={snailIdol} className="absolute animate-over-snail -bottom-0 x-right-20 origin-bottom-right rotate-12 scale-60" />
            </>
    );
}

export default function OverSnail(props: BlipProps) {
    const showReverse = useRef(Math.random() < OVER_SNAIL_REVERSE_RATE).current;

    return showReverse ? <OverSnailReverse {...props} /> : <OverSnailDefault {...props} />;
}
