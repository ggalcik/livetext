import { useEffect, useRef, useState, type CSSProperties } from "react";
import clsx from "clsx";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import spanishFlea from "./assets/spanish_flea.mp3";
import type { BlipProps } from "./types";
import "./Blip.css";

const AUDIO_VOLUME = 0.3;
const EXIT_DURATION_MS = 3000;
const EARLY_DEACTIVATION_WINDOW_MS = 10_000;
const AUTO_DEACTIVATION_DELAY_MS = 28_000;

export default function WhyDoThis({ endBlip, deactivateRequestId }: BlipProps) {
    const [isExiting, setIsExiting] = useState(false);
    const [internalDeactivateRequestId, setInternalDeactivateRequestId] = useState<number>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const endBlipRef = useRef(endBlip);
    const lastHandledDeactivateId = useRef<number | undefined>(undefined);
    const mountedAtRef = useRef(performance.now());

    useEffect(() => {
        endBlipRef.current = endBlip;
    }, [endBlip]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setInternalDeactivateRequestId(Date.now());
        }, AUTO_DEACTIVATION_DELAY_MS);

        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const audio = new Audio(spanishFlea);
        audio.volume = AUDIO_VOLUME;
        audioRef.current = audio;

        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        const requestedDeactivateId = deactivateRequestId ?? internalDeactivateRequestId;

        if (!requestedDeactivateId || requestedDeactivateId === lastHandledDeactivateId.current) {
            return;
        }

        lastHandledDeactivateId.current = requestedDeactivateId;

        if (performance.now() - mountedAtRef.current < EARLY_DEACTIVATION_WINDOW_MS) {
            endBlipRef.current();
            return;
        }

        setIsExiting(true);

        const audio = audioRef.current;
        const startingVolume = audio?.volume ?? 0;
        const startedAt = performance.now();
        let animationFrameId: number | undefined;

        const fadeAudio = (now: number) => {
            if (!audio) return;

            const progress = Math.min((now - startedAt) / EXIT_DURATION_MS, 1);
            audio.volume = startingVolume * (1 - progress);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(fadeAudio);
            }
        };

        animationFrameId = requestAnimationFrame(fadeAudio);
        const timeoutId = window.setTimeout(() => endBlipRef.current(), EXIT_DURATION_MS);

        return () => {
            window.clearTimeout(timeoutId);
            if (animationFrameId !== undefined) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [deactivateRequestId, internalDeactivateRequestId]);

    return (
        <div className="absolute h-full w-full text-white">
            <MasterViewport name="blip_why_do_this">
                <div
                    style={isExiting ? {
                        animationDuration: `${EXIT_DURATION_MS}ms`,
                    } as CSSProperties : undefined}
                    className={clsx(
                        "flex h-full w-full flex-col bg-[#00f] [container-type:size]",
                        isExiting ? "animate-why-do-this-exit" : "animate-why-do-this-enter"
                    )}
                >
                    <div className="relative z-20 flex h-[25%] shrink-0 items-center justify-center px-[4cqw] text-center font-[Bahnschrift] text-[clamp(2rem,8cqh,6rem)] leading-none font-bold">
                        <div className="border-2 border-white p-4 m-4">Top Ten Reasons Why Greg Does These Lives:</div>
                    </div>
                    <div className="relative z-10 h-[75%] overflow-hidden font-[Bahnschrift] text-[clamp(1.5rem,6cqh,5rem)] leading-tight font-bold indent-[5cqh_hanging_each-line]">
                        <div className="absolute top-full left-0 flex w-full flex-col px-[6cqw] animate-why-do-this-scroll text-yellow-400">
                            <div className="text-yellow-400">1: To show by example that not all online atheists are angry and mean</div>
                            <div className="text-yellow-400">2: To give perspective on my view of atheism (or religion? or anything?) if someone is interested</div>
                            <div className="text-yellow-400">3: I can sit in my office and turn on my computer and have interesting discussions just come to me with minimal effort</div>
                            <div className="text-yellow-400">4: I like performing for a camera</div>
                            <div className="text-yellow-400">5: Some people seem to like listening to me talk about these things and my ego likes that</div>
                            <div className="text-yellow-400">6: How people structure their thoughts and logic around something I think is untrue is interesting to me</div>
                            <div className="text-yellow-400">7: I can disagree with someone about religion and not get upset about it (unlike politics)</div>
                            <div className="text-yellow-400">8: It's good practice in staying calm in the face of someone being rude or awful</div>
                            <div className="text-yellow-400">9: I write the code that does these animations and it's a whole fulfilling hobby in itself</div>
                            <div className="text-yellow-400">10: My regulars! I love that people enjoy listening to me enough to keep coming back, and I seem to attract nice people</div>
                        </div>
                    </div>
                </div>
            </MasterViewport>
        </div>
    );
}
