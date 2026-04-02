import { useCallback, useEffect } from 'react';
import dling from '/src/assets/ding.mp3';
import typewriter from './assets/typewriter.mp3';
import paper from './assets/typerwriter_paper.png';

import { rheazons as rheazonsData } from './data';
import { gGlobal } from '../Global/global';
import type { BlipProps } from './types';


export default function WhySoAngry({ endBlip }: BlipProps) {
    const audio = new Audio(typewriter);
    const year = new Date().getFullYear();

    const playSound = useCallback(() => {
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    // TODO: write used rheazons to storage, choose new ones that don't match, clear used reasons when all exhausted
    const { person, saying } = rheazonsData[Math.floor(Math.random() * rheazonsData.length)]

    useEffect(() => {
        playSound();
    }, []);

    return (
        <div className='w-full h-full origin-top pt-8 animate-whyangry'>
            <div className='absolute w-full h-full'>
                <img className="w-full" src={paper} />
            </div>
            <div className="absolute top-0 left-10 pt-26 pl-12 pr-24 text-3xl text-black font-bold font-[Book_Antiqua]">
                <div>
                    &ldquo;{saying}&rdquo;
                </div>
                <div className=" text-2xl pt-10 text-gray-700 ">
                    <span className='text-4xl'>&copy;</span>opyright {year}<br /
                    >{person}<br />All Rights Reserved.</div>
            </div>
        </div>
    );
}