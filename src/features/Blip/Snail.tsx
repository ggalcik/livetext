import { useCallback, useEffect } from 'react';
import snailAudio from './assets/snail universe.mp3';
import snailAudioNyehless from './assets/snail nyehless.mp3';
import snailBackdrop from './assets/snail_backdrop.jpg';
import snailIdol from './assets/Snail.png';
import snailFart from './assets/Galaxy.png';
import nyeh from './assets/nyeh.png';
import type { BlipProps } from './types';
import './Blip.css';
import glog from '../../components/glog';
import { gGlobal } from '../Global/global';

import chant1a from './assets/snail_choral_1a.mp3';
import chant1b from './assets/snail_choral_1b.mp3';
import chant2 from './assets/snail_choral_2.mp3';
import chant3 from './assets/snail_choral_3.mp3';
import chantN from './assets/snail_choral_nyeh.mp3';

const variantAudio:Record<string,string> = {
    '1a': chant1a,
    '1b': chant1b,
    '2': chant2,
    '3': chant3,
    'N': chantN,
}



export default function Snail({ endBlip, variant, opts }: BlipProps) {
    const shell = variant === 'shell';
    // const playAudio = (opts?.variant && typeof opts.variant === 'string') ? variantAudio[opts.variant] : snailAudio;
    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 8000);

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
        const background = new Audio(variant ? snailAudioNyehless : snailAudio);
        const choir = variant && variantAudio[variant] &&  new Audio(variantAudio[variant]);
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

    const crampedStyle = gGlobal.layout.crampedPortrait ? 'bottom-1/5 scale-95 origin-bottom' : '';

    return (
        <div className={`w-full h-full relative animate-snail-blip bg-black ${crampedStyle}`} >
            <img src={snailBackdrop} className='absolute bottom-0 scale-150  animate-snail-universe' />
            {!shell &&
                <div className="absolute right-1/12 bottom-1/2 flex flex-col items-end font-[Broadway] text-blue-400 ">
                    <div className="animate-snail-text-1 opacity-0  text-2xl">The</div>
                    <div className="animate-snail-text-2 opacity-0  text-5xl">Ontological</div>
                    <div className="animate-snail-text-3 opacity-0  text-5xl">Snail</div>
                    <div className="animate-snail-text-4 opacity-0  text-2xl">that</div>
                    <div className="animate-snail-text-5 opacity-0  text-5xl">Farts</div>
                    <div className="animate-snail-text-6 opacity-0  text-5xl">Universes</div>
                </div>
            }
            <div className='absolute animate-galaxy-fart bottom-0 translate-30'>
                <img src={snailFart} className='animate-galaxy-spin  xopacity-0 scale-60 ' />
            </div>
            <img src={snailIdol} className='absolute animate-snail bottom-0 right-0 scale-80 origin-bottom rotate-12' />
            {!shell && <img src={nyeh} className='absolute animate-nyeh bottom-1/4 right-1/4' /> }
            {/* <img className="w-4/5 m-auto translate-y-40" src={honkers} /> */}
        </div>
    );
}
