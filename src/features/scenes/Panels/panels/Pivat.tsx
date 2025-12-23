import {  useEffect, useRef } from "react";


import pivat from "../../../../local/panels/pivat clip.mp4";



export function Pivat() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = pivat;
    video.load();
    video.volume = .5;
    video.play().catch(error => {
      console.warn(`Video playback failed for ${video.src}:`, error);
    });

    // Cleanup: Pause the video when the component unmounts
    return () => {
      video.pause();
      video.currentTime = 0;
    };

  }, []);

  return (
    <div className="space-y-4">

      <video
        ref={videoRef}

        autoPlay
        className="max-w-full max-h-full border"
      />
    </div>


  );
}
