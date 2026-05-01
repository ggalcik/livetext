import { useCallback, useEffect } from 'react';
import honkersAudio from './assets/honkers_in_2.mp3';
import sailorAudio from './assets/sailor_in.mp3';
import honkers from './assets/holy_honkers_blip.png';
import sulfur from './assets/holy_sulfur_blip.png';
import sailor from './assets/holy_sailor.png';
import type { BlipProps } from './types';
import clsx from 'clsx';
import { gGlobal } from '../Global/global';


export default function HolyHonkers({ endBlip, variant, opts }: BlipProps) {
    const isSulfur = opts?.alt || variant === 'sulfur';
    const isSailor = variant === 'sailor';
    const theImage = isSulfur ? sulfur : (isSailor ? sailor : honkers);

    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 10000);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    const audioHonk = new Audio(isSailor ? sailorAudio : honkersAudio);
    // const audioIn = new Audio(driveIn);
    // const audioOut = new Audio(driveOut);

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

        playSound(audioHonk)

        return () => stopSound(audioHonk);
    }, []);

    let imgStyle = 'w-2/3';
    if (isSulfur) imgStyle = 'w-5/6';
    if (isSailor) imgStyle = 'w-2/3 -translate-y-[140px]';


    return (
        <div className={clsx(`absolute `,
        gGlobal.layout.crampedPortrait ? 'top-30' : 'bottom-0')}>
            <div className={` animate-honkers origin-bottom `}>
                <img className={` ${imgStyle}  m-auto bottom-0`} src={theImage} />
            </div>
        </div>
    );
}