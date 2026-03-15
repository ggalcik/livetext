import { useCallback, useEffect } from 'react';
import snailAudio from './assets/snail universe.mp3';
import snailBackdrop from './assets/snail_backdrop.jpg';
import snailIdol from './assets/Snail.png';
import snailFart from './assets/Galaxy.png';
import nyeh from './assets/nyeh.png';
import type { BlipProps } from './types';
import './Blip.css';
import glog from '../../components/glog';




export default function Snail({ endBlip, opts }: BlipProps) {
    const shell = opts?.shell;
    glog('shell: %o', shell);
    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 8000);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    const audioSnail = new Audio(snailAudio);

    const playSound = useCallback((audio: HTMLAudioElement) => {
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
        playSound(audioSnail)
        return () => stopSound(audioSnail);
    }, []);

    return (
        <div className="w-full h-full relative animate-snail-blip bg-black">
            <img src={snailBackdrop} className='absolute bottom-0 scale-150 opacity-40 animate-snail-universe' />
            {!shell &&
                <div className=" absolute right-1/12 bottom-1/2 flex flex-col items-end font-[Broadway] text-blue-400 mix-blend-difference">
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