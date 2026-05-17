import { useCallback, useEffect, useRef, useState } from 'react';
import typewriter from './assets/typewriter.mp3';
import typewriterOut from './assets/typewriter_out.mp3';
import paper from './assets/typerwriter_paper.png';

import { rheazons as rheazonsData } from './data';
import { usePersistentState } from '../../hooks/usePersistentState';
import { WhySoAngryBlipSchema, type BlipProps, type Rheason, type WhySoAngryBlip } from './types';
import clsx from 'clsx';


const EXIT_DURATION_MS = 700;
const WHY_SO_ANGRY_STORAGE_KEY = 'whySoAngryBlip';

export default function WhySoAngry({ endBlip, deactivateRequestId }: BlipProps) {
    const audioInRef = useRef(new Audio(typewriter));
    const audioOutRef = useRef(new Audio(typewriterOut));
    const year = new Date().getFullYear();
    const [whySoAngryBlip, setWhySoAngryBlip] = usePersistentState({
        storageKey: WHY_SO_ANGRY_STORAGE_KEY,
        schema: WhySoAngryBlipSchema,
        fallback: { used: [] }
    });
    const [isExiting, setIsExiting] = useState(false);
    const [activeRheason, setActiveRheason] = useState<Rheason | null>(null);
    const lastHandledDeactivateId = useRef<number | undefined>(undefined);

    const playSound = useCallback(() => {
        audioInRef.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const playExitSound = useCallback(() => {
        audioOutRef.current.currentTime = 0;
        audioOutRef.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    function getNextRheazon(usedRheazons: WhySoAngryBlip["used"] = whySoAngryBlip.used): Rheason {
        const availableRheazons = rheazonsData.filter((rheazon) =>
            !usedRheazons.some((usedRheazon) => isSameRheazon(usedRheazon, rheazon))
        );

        if (availableRheazons.length === 0) {
            return getNextRheazon([]);
        }

        const nextRheazon = availableRheazons[Math.floor(Math.random() * availableRheazons.length)];
        setWhySoAngryBlip({ used: [...usedRheazons, nextRheazon] });
        return nextRheazon;
    }

    useEffect(() => {
        playSound();
    }, []);

    useEffect(() => {
        setActiveRheason(getNextRheazon());
    }, []);

    useEffect(() => {
        if (!deactivateRequestId || deactivateRequestId === lastHandledDeactivateId.current) {
            return;
        }

        lastHandledDeactivateId.current = deactivateRequestId;
        setIsExiting(true);
        playExitSound();

        const timeoutId = window.setTimeout(() => {
            endBlip();
        }, EXIT_DURATION_MS);

        return () => window.clearTimeout(timeoutId);
    }, [deactivateRequestId, endBlip, playExitSound]);

    if (!activeRheason) {
        return null;
    }

    const { person, saying } = activeRheason;

    return (
        <div className={clsx(
            'w-full h-full origin-top pt-8',
            isExiting ? 'animate-whyangry-exit' : 'animate-whyangry'
        )}>
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

function isSameRheazon(left: Rheason, right: Rheason) {
    return left.person === right.person && left.saying === right.saying;
}
