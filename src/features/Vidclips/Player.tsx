import { useEffect, useRef, useState } from "react";

// import noVideo from "../../../assets/media-player-svgrepo-com.png";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { vidclipDefault, type VidSettings } from "./types";
import PlayerControls from "./PlayerControls";
import { VIDDIR } from "./config";
import glog from "../../components/glog";

interface IPlayer {
    vidSettings: VidSettings,
    handleVidStop: () => void
}

export default function Player({ vidSettings, handleVidStop}: IPlayer) {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { filename, loop, stayOnDone } = vidSettings;



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

    const videoUrl = `${VIDDIR}/${filename}`; // adjust to your file import scheme


    return (
        <div className="p-4 absolute w-full h-full">

            {filename &&
                <>
                    <MasterViewport name={`vidclips_${filename}`}>
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            loop={loop}
                            autoPlay={true}
                            onEnded={handleVidStop}

                            className="max-w-full border max-h-full"
                        />
                    </MasterViewport>


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
