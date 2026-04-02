import { useCallback, useEffect } from 'react';
import honkersAudio from './assets/honkers_in_2.mp3';
import honkers from './assets/holy_honkers_blip.png';
import sulfur from './assets/holy_sulfur_blip.png';
import type { BlipProps } from './types';
import clsx from 'clsx';
import { gGlobal } from '../Global/global';


export default function HolyHonkers({ endBlip, opts }: BlipProps) {
    const isSulfur = opts?.alt;
    const theImage = isSulfur ? sulfur : honkers;

    useEffect(() => {
        const timeout = setTimeout(() => {
            endBlip();
        }, 10000);

        return () => clearTimeout(timeout);
    }, [endBlip]);

    const audioHonk = new Audio(honkersAudio);
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

    const sulfurImgStyle = isSulfur ? 'w-5/6' : 'w-2/3';

    return (
        <div className={clsx(`absolute `,
        gGlobal.layout.crampedPortrait ? 'top-30' : 'bottom-0')}>
            <div className={` animate-honkers origin-bottom `}>
                <img className={` ${sulfurImgStyle}  m-auto bottom-0`} src={theImage} />
            </div>
        </div>
    );
}