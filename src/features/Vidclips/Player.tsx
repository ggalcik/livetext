import { useEffect, useRef, useState } from "react";

import { resolvePublicAssetPath } from "../../helpers/assetPaths";
import type { VidSettings } from "./types";
import PlayerControls from "./PlayerControls";

interface IPlayer {
    vidSettings: VidSettings,
    onPlaybackProgress?: (currentTime: number, paused: boolean) => void,
    onPlaybackChange?: (currentTime: number, paused: boolean) => void,
    handleVidStop: () => void
}

export default function Player({ vidSettings, handleVidStop, onPlaybackChange, onPlaybackProgress }: IPlayer) {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { filename, loop } = vidSettings;



    // Update progress while playing
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const update = () => {
            if (!video.duration) return;
            setProgress((video.currentTime / video.duration) * 100);
        };

        video.play();
        video.addEventListener("timeupdate", update);
        return () => video.removeEventListener("timeupdate", update);
    }, [vidSettings]);

    const videoUrl = filename ? resolvePublicAssetPath(`video/${filename}`) : "";


    return (
        <div className="pointer-events-none p-4 absolute w-full h-full">

            {filename &&
                <>
                        <video
                            ref={videoRef}
                            onTimeUpdate={(event) => onPlaybackProgress?.(event.currentTarget.currentTime, event.currentTarget.paused)}
                            onPlay={(event) => onPlaybackChange?.(event.currentTarget.currentTime, false)}
                            onPause={(event) => onPlaybackChange?.(event.currentTarget.currentTime, true)}
                            onSeeked={(event) => onPlaybackChange?.(event.currentTarget.currentTime, event.currentTarget.paused)}
                            src={videoUrl}
                            loop={loop}
                            // Keep a silent playback clock for the existing controls.
                            // The visible and audible output is rendered only in OBS.
                            muted
                            autoPlay={true}
                            onEnded={handleVidStop}

                            className="hidden"
                        />


                    <PlayerControls 
                    videoRef={videoRef} 
                    progress={progress} 
                    setProgress={setProgress} 
                    handleVidStop={handleVidStop}
                    />

                </>
            }


        </div>
    );
}
