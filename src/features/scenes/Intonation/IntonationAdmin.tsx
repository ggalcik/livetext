import { Button } from "../../../components/Button";
import { usePersistentState } from "../../../hooks/usePersistentState"
import glog from "../../../components/glog";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IIntonementSceneSchema, intonementSections, type IIntonementType } from './types';
import { intonations } from './data';
import clsx from "clsx";

const ADVANCE_DELAY = 1500;

export default function IntonationsAdmin() {
    const [intonationScene, setIntonationScene] = usePersistentState({
        storageKey: 'intonationScene',
        schema: IIntonementSceneSchema,
        fallback: { active: 'Intro' }
    })
    const [advanceActive, setAdvanceActive] = useState(true);
    const [advanceCountdown, setAdvanceCountdown] = useState(0);

    const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const advanceDeadlineRef = useRef<number | null>(null);

    function handleAdvance() {
        if (advanceTimeoutRef.current) {
            clearTimeout(advanceTimeoutRef.current);
            setAdvanceActive(true);
            setAdvanceCountdown(0);
            advanceTimeoutRef.current = null;
            advanceDeadlineRef.current = null;
        } else {
            setAdvanceActive(false);
            const currentIdx = intonementSections.findIndex(
                intonment => intonment === intonationScene.active
            );
            const nextIdx = (currentIdx + 1) % intonementSections.length;
            advanceDeadlineRef.current = Date.now() + ADVANCE_DELAY;
            setAdvanceCountdown(ADVANCE_DELAY / 1000);

            advanceTimeoutRef.current = setTimeout(() => {
                setIntonationScene({
                    active: intonementSections[nextIdx],
                    advanced: true,
                });
                setAdvanceActive(true);
                setAdvanceCountdown(0);
                advanceTimeoutRef.current = null;
                advanceDeadlineRef.current = null;
            }, ADVANCE_DELAY);
        }
    }

    useEffect(() => {
        if (advanceActive) return;

        const interval = setInterval(() => {
            if (!advanceDeadlineRef.current) return;

            const remainingMs = Math.max(0, advanceDeadlineRef.current - Date.now());
            setAdvanceCountdown(remainingMs / 1000);
        }, 100);

        return () => clearInterval(interval);
    }, [advanceActive]);

    useEffect(() => {
        return () => {
            if (advanceTimeoutRef.current) {
                clearTimeout(advanceTimeoutRef.current);
            }

            advanceDeadlineRef.current = null;
        };
    }, []);

    function switchIntonation(intonation: IIntonementType) {
        setIntonationScene({ active: intonation });
        setAdvanceActive(true);
    }

    return (

        <div className="text-black flex gap-6">
            <div className=" inline-flex  flex-col gap-4">

                <Button className={'h-16'}
                    onClick={handleAdvance}
                    mode={advanceActive ? 'normal' : 'alert'}
                    size='xl'>
                    {advanceActive ? 'Advance' : `Cancel (${advanceCountdown.toFixed(1)}s)`}
                </Button>

                <div className="border inline-flex bg-green-200 flex-col gap-2 p-2">
                    {intonementSections.map((intonement, i) => {
                        return (
                            <div key={intonement}>
                                <Button className={
                                    intonement === intonationScene.active
                                        ? 'ring-4 w-full ring-black'
                                        : 'ring-4 w-full ring-green-200 opacity-80'}
                                    onClick={() => switchIntonation(intonement)}

                                    size='xl'>
                                    {intonement}
                                </Button>
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className="text-2xl w-full"
                dangerouslySetInnerHTML={{ __html: intonations[intonationScene.active].replace(/[\r\n]+/g, '<br>') }}
            />




        </div>

    )
} 
