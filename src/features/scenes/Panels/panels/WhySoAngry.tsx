import { useCallback, useEffect } from 'react';
import dling from '/src/assets/ding.mp3';
import paper from './assets/blank-newspaper.jpg';

import {rheazons as rheazonsData} from './data';

export function WhySoAngryBackground() {

    return <div className="absolute top-0 left-0 w-full h-full  bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${paper})` }}></div>
}

export function WhySoAngryAdmin() {
    // return <>
    //     <div className='w-120 h-40 overflow-y-scroll px-2 text-sm border mb-4'>
    //         {rheazonsData.map(item => <div className='border-b-gray-400 border-b py-1'>{item}</div>)}
    //     </div>
    //     <div className='w-120 h-40 overflow-y-scroll px-2 border'>
    //         Because I really neweded help from Jesus, but when I turned around there was only one set of footprints<br />
    //         The kids are walking on my azaleas again<br />
    //         You become an atheist, you get the anger for free<br />
    //         A = A, where A = anger, and A = Atheist
    //     </div>
    // </>
    return <></>;
}

export function WhySoAngry() {
    const audio = new Audio(dling);
    const year = new Date().getFullYear();

    const playSound = useCallback(() => {
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    // TODO: write used rheazons to storage, choose new ones that don't match, clear used reasons when all exhausted
    const {person, saying} = rheazonsData[Math.floor(Math.random() * rheazonsData.length)]

    useEffect(() => {
        playSound();
    }, []);

    return (
        <>
            <div className="absolute top-0  left-0 text-3xl text-black font-bold font-[Book_Antiqua]">
               &ldquo;{saying}&rdquo;
                </div>
            <div className="absolute bottom-0  left-0  text-2xl text-gray-700 font-bold font-[Book_Antiqua]">
                <span className='text-4xl'>&copy;</span>opyright {year}<br /
                >{person}<br />All Rights Reserved.</div>
        </>
    );
}