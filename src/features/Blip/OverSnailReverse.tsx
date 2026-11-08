import { useCallback, useEffect } from 'react';
import snailUniverseOBS from './assets/snail universe obs.mp3';
import snailBackdrop from './assets/snail_backdrop.jpg';
import snailIdol from './assets/Snail.png';
import snailFart from './assets/Galaxy.png';
import nyeh from './assets/nyeh.png';
import nyehAudio from './assets/nyeh_me.mp3';
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
};

export default function OverSnailReverse({ endBlip, variant }: BlipProps) {
    const shell = variant === 'shell';

    useEffect(() => {
        const timeout = setTimeout(endBlip, 12000);
        return () => clearTimeout(timeout);
    }, [endBlip]);

    const playSound = useCallback((audio: HTMLAudioElement, volume = 1) => {
        audio.volume = volume;
        audio.play().catch((err) => {
            console.warn('Could not play sound:', err);
        });
    }, []);

    const stopSound = useCallback((audio: HTMLAudioElement) => {
        audio.pause();
        audio.currentTime = 0;
    }, []);

    useEffect(() => {
        if (shell) return;
        const background = new Audio(snailUniverseOBS);
        const nyehSound = !variant ? new Audio(nyehAudio) : undefined;
        const choir = variant && variantAudio[variant] && new Audio(variantAudio[variant]);
        playSound(background);
        // NYEH starts becoming visible at 25% of its 10-second animation.
        const nyehTimeout = nyehSound
            ? setTimeout(() => playSound(nyehSound), 2500)
            : undefined;
        const choirTimeout = choir
            ? setTimeout(() => playSound(choir, 0.5), variant === 'N' ? 2500 : 1000)
            : undefined;

        return () => {
            if (nyehTimeout) clearTimeout(nyehTimeout);
            if (nyehSound) stopSound(nyehSound);
            if (choirTimeout) clearTimeout(choirTimeout);
            stopSound(background);
            if (choir) stopSound(choir);
        };
    }, [playSound, shell, stopSound, variant]);

    const nyehImg = variant === 'Xeno' ? nyeh_xeno : nyeh;

    return (
        <>
            <div className="w-full h-full relative animate-over-snail-blip origin-bottom">
                <img src={snailBackdrop} className={`absolute bottom-20 ${shell ? 'scale-300' : 'scale-150'} animate-over-snail-universe-reverse`} />
                {!shell &&
                    <div className="absolute left-1/6 bottom-1/2 flex flex-col items-start text-left font-[Broadway] text-white drop-shadow-xl drop-shadow-black">
                        <div className="animate-snail-text-1 opacity-0 text-2xl">The</div>
                        <div className="animate-snail-text-2 opacity-0 text-5xl">Ontological</div>
                        <div className="animate-snail-text-3 opacity-0 text-5xl">Snail</div>
                        <div className="animate-snail-text-4 opacity-0 text-2xl">that</div>
                        <div className="animate-snail-text-5 opacity-0 text-5xl">Expresses</div>
                        <div className="animate-snail-text-6 opacity-0 text-5xl">Universes</div>
                    </div>
                }
                <div className="absolute left-0 animate-galaxy-fart-reverse bottom-0">
                    <img src={snailFart} className="animate-galaxy-spin xopacity-0 scale-60" />
                </div>
                {!shell && <img src={nyehImg} className={`absolute ${variant === 'Xeno' ? 'animate-xeno-reverse' : 'animate-nyeh-reverse'} bottom-1/4 left-1/4`} />}
            </div>
            <div className="absolute bottom-0 left-0 origin-bottom-left animate-over-snail-reverse">
                <img src={snailIdol} className="block -scale-x-100 -rotate-12" />
            </div>
        </>
    );
}
