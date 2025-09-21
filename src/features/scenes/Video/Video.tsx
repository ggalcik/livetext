import { useEffect, useRef, useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

type VideoScene = {
  preview: string | null;
  live: string | null;
  loop: boolean;
};

const STORAGE_KEY = "videoScene";

export default function LiveVideoPlayer() {
  const [scene, setScene] = useState<VideoScene | null>(null);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load from localStorage
  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setScene(JSON.parse(saved));
        } catch {
          console.warn("Invalid JSON in videoScene");
        }
      } else {
        setScene(null);
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
  }, [scene?.live]);

  if (!scene?.live) return null;

  const videoUrl = `/src/local/video/${scene.live}`; // adjust to your file import scheme

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

  return (
    <div className="p-4 absolute w-full h-full">

    
      <MasterViewport name="video" needCtrl={true}>
      <video
        ref={videoRef}
        src={videoUrl}
        loop={scene.loop}
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
          className="flex-1"
        />
      </div>

    </div>
  );
}
