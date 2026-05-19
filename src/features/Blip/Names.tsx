import { useEffect, useRef, useState } from "react";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { Button } from "../../components/Button";
import { gGlobal } from "../Global/global";
import { format } from "date-fns";
import { getDailyLineStyle, toDisplayDate } from "./helpers";
import { usePersistentState } from "../../hooks/usePersistentState";
import { NamesBlipSchema, type BlipProps } from "./types";
import clsx from "clsx";

const EXIT_DURATION_MS = 500;

export default function Names({ endBlip, deactivateRequestId }: BlipProps) {
    const [confirmReset, setConfirmReset] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const crampedStyle = gGlobal.layout.crampedPortrait;
    const [blip, setBlip] = usePersistentState({
        storageKey: "NamesBlip",
        schema: NamesBlipSchema,
        fallback: { names: "", currentDate: format(new Date(), "yyyyMMdd") }
    });
    const today = format(Date.now(), "yyyyMMdd");
    const lastHandledDeactivateId = useRef<number | undefined>(undefined);

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
    }

    const lines = blip.names
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    useEffect(() => {
        if (!deactivateRequestId || deactivateRequestId === lastHandledDeactivateId.current) {
            return;
        }

        lastHandledDeactivateId.current = deactivateRequestId;
        setIsExiting(true);

        const timeoutId = window.setTimeout(() => {
            endBlip();
        }, EXIT_DURATION_MS);

        return () => window.clearTimeout(timeoutId);
    }, [deactivateRequestId, endBlip]);

    return (
        <div className="absolute w-full h-full text-white">
            <MasterViewport name="blip_names">
                <div className={clsx(
                    "w-full h-full backdrop-blur-sm [container-type:size] text-center",
                    isExiting ? "animate-names-exit" : "animate-names-enter"
                )}>

                    <div className="font-[Carter_One] border border-black inline-block shadow -rotate-2 p-4 text-center text-4xl bg-blue-800 text-amber-200">My favorite names today</div>
                    <div className="font-[Carter_One] border border-black inline-block shadow rotate-1 translate-x-[70%] -translate-y-[30%] p-2 text-center text-md bg-blue-700 text-amber-200">{toDisplayDate(today)}</div>

                    <div className="flex flex-wrap justify-center gap-2 w-[80%] m-auto">
                        {lines.map((line, index) => (
                            <div
                                key={`${index}-${line}`}
                                className="font-[Candara] border border-black inline-block shadow text-shadow p-2 px-8 text-2xl"
                                style={getDailyLineStyle(today, index)}
                            >
                                {line}
                            </div>
                        ))}
                    </div>

                </div>
            </MasterViewport>
            <div className={crampedStyle ? "absolute left-4 bottom-4 w-2/3" : "absolute left-4 top-4 w-2/3"}>
                <div className="flex flex-col gap-2">
                    <textarea
                        rows={4}
                        className=" w-full resize-none rounded border border-white/30 bg-black/20 p-2 text-white"
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
