import { useCallback, useEffect, useRef, useState } from 'react';
import typewriter from './assets/typewriter.mp3';
import typewriterOut from './assets/typewriter_out.mp3';
import paper from './assets/typerwriter_paper.png';

import { rheazons as rheazonsData } from './data';
import { usePersistentState } from '../../hooks/usePersistentState';
import { WhySoAngryBlipSchema, type BlipProps, type Rheason, type WhySoAngryBlip } from './types';
import clsx from 'clsx';
import glog from '../../components/glog';
import { Button } from '../../components/Button';
import { BlipDataSchema } from './types';
import { produce } from 'immer';


const EXIT_DURATION_MS = 700;
const WHY_SO_ANGRY_STORAGE_KEY = 'whySoAngryBlip';
const PICK_VARIANT = "Pick";

export function WhySoAngryPick({ sendAction }: { sendAction?: (action: string) => void } = {}) {
    const [obsSelectedIndex, setObsSelectedIndex] = useState<number>();
    const [whySoAngryBlip] = usePersistentState({
        storageKey: WHY_SO_ANGRY_STORAGE_KEY,
        schema: WhySoAngryBlipSchema,
        fallback: { used: [] }
    });
    const [blipData, setBlipData] = usePersistentState({
        storageKey: 'blipData',
        schema: BlipDataSchema,
        fallback: {}
    });

    if (!sendAction && (blipData.showBlip !== "Why Angry" || blipData.showBlipVariant !== PICK_VARIANT)) {
        return null;
    }

    function selectRheason(index: number) {
        if (sendAction) {
            sendAction(obsSelectedIndex === index ? "end" : `pick:${index}`);
            setObsSelectedIndex(index);
            return;
        }
        setBlipData(produce((draft) => {
            if (draft.showBlip !== "Why Angry" || draft.showBlipVariant !== PICK_VARIANT) {
                return;
            }

            if (draft.showBlipSelection === index) {
                draft.deactivateRequestId = Date.now();
                return;
            }

            draft.showBlipSelection = index;
            draft.deactivateRequestId = undefined;
        }));
    }

    return (
        <div className="columns-3 gap-2">
            {rheazonsData.map((rheason, index) => {
                const isSelected = (sendAction ? obsSelectedIndex : blipData.showBlipSelection) === index;
                const isUsed = whySoAngryBlip.used.some((usedRheason) => isSameRheazon(usedRheason, rheason));

                return (
                    <Button
                        key={`${rheason.person}-${index}`}
                        type="button"
                        size="med"
                        variant="b"
                        mode={isSelected ? "activated" : "normal"}
                        className={clsx(
                            "mb-2 h-auto w-full break-inside-avoid whitespace-normal py-1 text-left ring-black",
                            isUsed && "bg-stone-200 hover:bg-stone-200"
                        )}
                        onClick={() => selectRheason(index)}
                    >
                        {rheason.saying}
                    </Button>
                );
            })}
        </div>
    );
}

export default function WhySoAngry({ endBlip, deactivateRequestId, variant, selection, source, obsAction, obsActionRequestId }: BlipProps) {
    const [obsSelection, setObsSelection] = useState<number>();
    const [obsDeactivateId, setObsDeactivateId] = useState<number>();
    const selectedIndex = source === "OBS" ? obsSelection : selection;
    const requestedDeactivateId = deactivateRequestId ?? obsDeactivateId;

    useEffect(() => {
        if (obsAction === "end") setObsDeactivateId(Date.now());
        if (obsAction?.startsWith("pick:")) {
            const index = Number(obsAction.slice(5));
            if (Number.isInteger(index) && rheazonsData[index]) setObsSelection(index);
        }
    }, [obsAction, obsActionRequestId]);

    const audioInRef = useRef(new Audio(typewriter));
    const audioOutRef = useRef(new Audio(typewriterOut));
    useEffect(() => {
        const audioIn = audioInRef.current;
        const audioOut = audioOutRef.current;
        return () => { audioIn.pause(); audioOut.pause(); };
    }, []);
    const year = new Date().getFullYear();
    const [whySoAngryBlip, setWhySoAngryBlip] = usePersistentState({
        storageKey: WHY_SO_ANGRY_STORAGE_KEY,
        schema: WhySoAngryBlipSchema,
        fallback: { used: [] }
    });
    const [isExiting, setIsExiting] = useState(false);
    const [hasExitRequested, setHasExitRequested] = useState(false);
    const lastHandledDeactivateId = useRef<number | undefined>(undefined);

    const playSound = useCallback(() => {
        audioInRef.current.currentTime = 0;
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

    function activateSpecificRheason(rheason: Rheason, includeInUsed = false) {
        setIsExiting(false);
        setHasExitRequested(false);
        setWhySoAngryBlip((prev) => ({
            used: includeInUsed
                ? [...prev.used, rheason]
                : prev.used,
            active: rheason,
        }));
    }

    useEffect(() => {
        if (!variant) {
            const nextRheason = getNextRheazon();
            activateSpecificRheason(nextRheason);
        }
    }, [variant]);

    useEffect(() => {
        if ((source !== "OBS" && variant !== PICK_VARIANT) || selectedIndex == null) {
            return;
        }

        const selectedRheason = rheazonsData[selectedIndex];
        if (!selectedRheason) {
            return;
        }

        activateSpecificRheason(selectedRheason);
    }, [selectedIndex, source, variant]);

    useEffect(() => {
        if (whySoAngryBlip.active && (variant !== PICK_VARIANT || selectedIndex != null)) {
            glog('WhoSoAngry - intro sound');
            playSound();
        }
    }, [playSound, selectedIndex, variant, whySoAngryBlip.active]);

    useEffect(() => {
        if (hasExitRequested && !whySoAngryBlip.active) {
            endBlip();
        }
    }, [endBlip, hasExitRequested, whySoAngryBlip.active]);

    useEffect(() => {
        if (!requestedDeactivateId || requestedDeactivateId === lastHandledDeactivateId.current) {
            return;
        }

        lastHandledDeactivateId.current = requestedDeactivateId;

        if (!whySoAngryBlip.active) {
            endBlip();
            return;
        }

        setIsExiting(true);
        playExitSound();

        const timeoutId = window.setTimeout(() => {
            setHasExitRequested(true);
            setWhySoAngryBlip((prev) => ({
                used: prev.used,
            }));
        }, EXIT_DURATION_MS);

        return () => window.clearTimeout(timeoutId);
    }, [requestedDeactivateId, endBlip, playExitSound, whySoAngryBlip.active]);

    if (!whySoAngryBlip.active || (variant === PICK_VARIANT && selectedIndex == null)) {
        return null;
    }

    const { person, saying } = whySoAngryBlip.active;

    return (
        <div className={clsx(
            'w-full h-full  pt-8',
            source === 'OBS' && 'scale-70',
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

export function WhySoAngryAdmin({ sendAction }: { sendAction: (action: string) => void }) {
    return <WhySoAngryPick sendAction={sendAction} />;
}
