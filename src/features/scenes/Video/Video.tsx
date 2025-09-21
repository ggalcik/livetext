import { useEffect, useRef, useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";
import type { VideoSceneDataType } from "./types";



const STORAGE_KEY = "videoScene";

export default function LiveVideoPlayer() {
    const [sceneData, setSceneData] = useState<VideoSceneDataType | null>(null);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Load from localStorage
    useEffect(() => {
        const load = () => {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    setSceneData(JSON.parse(saved));
                } catch {
                    console.warn("Invalid JSON in videoScene");
                }
            } else {
                setSceneData(null);
            }
        };

        load();
        window.addEventListener("storage", load);
        return () => window.removeEventListener("storage", load);
    }, []);

    // Update progress while playing
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const update = () => {
            if (!video.duration) return;
            setProgress((video.currentTime / video.duration) * 100);
        };

        video.addEventListener("timeupdate", update);
        return () => video.removeEventListener("timeupdate", update);
    }, [sceneData?.live]);

      // Jump to file start time if provided
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sceneData?.live) return;

    const fileMeta = sceneData.files.find((f) => f.name === sceneData.live);
    if (!fileMeta?.start) return;

    const trySeek = () => {
      const parts = fileMeta.start!.split(":").map(Number);
      if (parts.length === 2) {
        const seconds = parts[0] * 60 + parts[1];
        if (!isNaN(seconds) && video.duration > seconds) {
          video.currentTime = seconds;
        }
      }
    };

    video.addEventListener("loadedmetadata", trySeek);
    return () => video.removeEventListener("loadedmetadata", trySeek);
  }, [sceneData?.live, sceneData?.files]);


    if (!sceneData?.live) return null;

    const videoUrl = `/src/local/video/${sceneData.live}`; // adjust to your file import scheme

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) video.play();
        else video.pause();
    };

    const handleStop = () => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        const pct = Number(e.target.value);
        video.currentTime = (pct / 100) * video.duration;
        setProgress(pct);
    };

    const timeCode = (): string => {
        const video = videoRef.current;
        if (!video || !video.currentTime) return "";
        const min = Math.floor(video.currentTime / 60);
        const sec = Math.floor(video.currentTime % 60)
            .toString()
            .padStart(2, "0");
        return `${min}:${sec}`;
    }

    return (
        <div className="p-4 absolute w-full h-full">


            <MasterViewport name="video" needCtrl={true}>
                <video
                    ref={videoRef}
                    src={videoUrl}
                    loop={sceneData.opts.loop}
                    className="max-w-full border max-h-full"
                />
            </MasterViewport>

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
                {progress &&
                    <div className="text-white w-12">{timeCode()}</div>}
            </div>

        </div>
    );
}
