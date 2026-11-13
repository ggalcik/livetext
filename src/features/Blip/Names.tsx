import { useCallback, useEffect, useRef, useState } from "react";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { Button } from "../../components/Button";
import { gGlobal } from "../Global/global";
import { format } from "date-fns";
import { toDisplayDate } from "./helpers";
import { usePersistentState } from "../../hooks/usePersistentState";
import { NamesBlipSchema, type BlipProps, type NamesDisplayData } from "./types";
import clsx from "clsx";
import NamesDisplay from "./NamesDisplay";
import namesIn from "./assets/names_in3.mp3";
import namesOut from "./assets/names_out.mp3";

const EXIT_DURATION_MS = 1000;

export default function Names({ endBlip, deactivateRequestId, sendAction }: BlipProps & { sendAction?: (action: string) => void }) {
    const [confirmReset, setConfirmReset] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [showNamesIndex, setShowNamesIndex] = useState(0);
    const audioInRef = useRef(new Audio(namesIn));
    const audioOutRef = useRef(new Audio(namesOut));
    const crampedStyle = gGlobal.layout.crampedPortrait;
    const [blip, setBlip] = usePersistentState({
        storageKey: "NamesBlip",
        schema: NamesBlipSchema,
        fallback: { names: "", currentDate: format(new Date(), "yyyyMMdd") }
    });
    const today = format(new Date(), "yyyyMMdd");
    const historyEntries = blip.history ? Object.keys(blip.history).reverse() : [];
    const historyDate = showNamesIndex ? historyEntries[showNamesIndex - 1] : undefined;
    const displayDate = historyDate ?? blip.currentDate;
    const displayNames = historyDate && blip.history ? blip.history[historyDate] : blip.names;

    useEffect(() => {
        if (sendAction) sendAction(`show:${JSON.stringify({ names: displayNames, currentDate: displayDate, historical: Boolean(historyDate) } satisfies NamesDisplayData)}`);
    }, [sendAction, displayNames, displayDate, historyDate]);
    const lastHandledDeactivateId = useRef<number | undefined>(undefined);

    const playExitSound = useCallback(() => {
        audioOutRef.current.currentTime = 0;
        audioOutRef.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    const playSound = useCallback(() => {
        audioInRef.current.currentTime = 0;
        audioInRef.current.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    function handleDayReset() {
        setBlip((prev) => ({
            names: "",
            currentDate: today,
            history: {
                ...(prev.history ?? {}),
                [prev.currentDate]: prev.names,
            },
        }));
        setConfirmReset(false);
        setShowNamesIndex(0);
    }

    useEffect(() => {
        if (!sendAction) playSound();
        const audioIn = audioInRef.current;
        const audioOut = audioOutRef.current;
        return () => { audioIn.pause(); audioOut.pause(); };
    }, [playSound, sendAction]);

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

    const presentation = (
        <NamesDisplay names={displayNames} currentDate={displayDate} historical={Boolean(historyDate)} isExiting={isExiting}>
                    {historyEntries.length > 0 && (
                        <input
                            type="range"
                            min="0"
                            max={historyEntries.length}
                            className="pointer-events-none absolute right-0 top-6 z-10 w-6 opacity-0 transition-opacity group-hover/names:pointer-events-auto group-hover/names:opacity-100"
                            style={{ writingMode: "vertical-lr" }}
                            value={showNamesIndex}
                            onChange={(event) => setShowNamesIndex(Number(event.target.value))}
                            aria-label="Names history"
                        />
                    )}
        </NamesDisplay>
    );

    return (
        <div className={sendAction ? "text-black" : "absolute w-full h-full text-white"}>
            {!sendAction && <MasterViewport name="blip_names" needCtrl>{presentation}</MasterViewport>}
            <div className={sendAction ? "" : crampedStyle ? "absolute left-4 bottom-4 w-2/3" : "absolute left-4 top-4 w-2/3"}>
                <div className="flex flex-col gap-2">
                    {sendAction && <>
                        <select aria-label="Names history" value={showNamesIndex} onChange={(event) => setShowNamesIndex(Number(event.target.value))}>
                            <option value={0}>Today</option>
                            {historyEntries.map((date, index) => <option key={date} value={index + 1}>{toDisplayDate(date)}</option>)}
                        </select>
                    </>}
                    <textarea
                        rows={4}
                        className={clsx("w-full resize-none rounded border p-2", sendAction ? "border-black/30 bg-white text-black" : "border-white/30 bg-black/20 text-white")}
                        value={blip.names}
                        onChange={(e) => setBlip((prev) => ({ ...prev, names: e.target.value }))}
                    />
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            className="w-20"
                            onClick={() => setConfirmReset((prev) => !prev)}
                        >
                            {confirmReset ? "Cancel" : "Day reset"}
                        </Button>
                        {confirmReset && (
                            <Button type="button" className="w-16" onClick={handleDayReset}>
                                Sure?
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function NamesAdmin({ sendAction }: { sendAction: (action: string) => void }) {
    return <Names endBlip={() => {}} sendAction={sendAction} />;
}
