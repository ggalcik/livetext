import { useEffect, useState } from "react";
import NamesDisplay from "./NamesDisplay";
import { NamesDisplaySchema, type NamesDisplayData, type BlipProps } from "./types";
import namesIn from "./assets/names_in3.mp3";
import namesOut from "./assets/names_out.mp3";

const EXIT_DURATION_MS = 1000;

export default function OverNames({ endBlip, obsAction, obsActionRequestId }: BlipProps) {
    const [display, setDisplay] = useState<NamesDisplayData>();
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (!obsAction?.startsWith("show:")) return;
        try {
            const result = NamesDisplaySchema.safeParse(JSON.parse(obsAction.slice(5)));
            if (result.success) setDisplay(result.data);
        } catch (error) {
            console.warn("Invalid names action:", error);
        }
    }, [obsAction, obsActionRequestId]);

    useEffect(() => {
        const audio = new Audio(namesIn);
        void audio.play().catch((error) => console.warn("Could not play sound:", error));
        return () => audio.pause();
    }, []);

    useEffect(() => {
        if (obsAction !== "end") return;
        setIsExiting(true);
        const audio = new Audio(namesOut);
        void audio.play().catch((error) => console.warn("Could not play sound:", error));
        const timeout = window.setTimeout(endBlip, EXIT_DURATION_MS);
        return () => {
            window.clearTimeout(timeout);
            audio.pause();
        };
    }, [obsAction, obsActionRequestId, endBlip]);

    if (!display) return null;
    return (
        <div className="absolute w-full h-full text-white scale-60">
            <NamesDisplay {...display} isExiting={isExiting} />
        </div>
    );
}
