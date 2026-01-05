import { useEffect } from "react";
import glog from "../../components/glog";

interface IPlayerControls {
    videoRef: React.RefObject<HTMLVideoElement | null>,
    progress: number,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    handleVidStop: () => void;
}

export default function PlayerControls({ videoRef, progress, setProgress, handleVidStop }: IPlayerControls) {
    const video = videoRef.current;


    const handlePlayPause = () => {
        if (!video) return;
        if (video.paused) video.play();
        else video.pause();
    };

    const handleStop = () => {
        if (!video) return;
        video.pause();
        video.currentTime = 0;
        handleVidStop();
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!video || !video.duration) return;
        const pct = Number(e.target.value);
        video.currentTime = (pct / 100) * video.duration;
        setProgress(pct);
    };

    const timeCode = (): string => {
        if (!video || !video.currentTime) return "0:00";
        const min = Math.floor(video.currentTime / 60);
        const sec = Math.floor(video.currentTime % 60)
            .toString()
            .padStart(2, "0");
        return `${min}:${sec}`;
    }

    return (

        <div className="absolute w-11/12 top-4 right-4 flex items-center gap-2">
            <button onClick={handlePlayPause} className="bg-blue-400 px-2 py-1 border rounded">
                Play / Pause
            </button>
            <button onClick={handleStop} className="bg-gray-200 px-2 py-1 border rounded">
                Stop
            </button>
            <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={handleSeek}
                className="flex-16"
            />

            <div className="text-white w-12">{timeCode()}</div>
        </div>
    );
}

