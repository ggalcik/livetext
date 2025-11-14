import { useCallback, useEffect, useRef } from 'react';
import orchestra from '../../../../local/video/orchestra.mp4';
import applause from '../../../../local/soundboard/applause_polite.mp3';
import crowd_lose from '../../../../local/soundboard/crowd lose.mp3';
import boo_you_suck from '../../../../local/soundboard/boo you suck.mp3';


import './Orchestra.css';

export function OrchestraBackground() {
  return <div className="absolute top-0 left-0 w-full h-full bg-black"
  ></div>
}

export function Orchestra() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Fade-in: opacity 0 → 1 between 4s and 15s
    let fadeInterval: number | null = null;
    const fadeStart = 4;
    const fadeEnd = 15;

    const onTimeUpdate = () => {
      const t = video.currentTime;
      if (t < fadeStart) container.style.opacity = "0";
      else if (t >= fadeEnd) container.style.opacity = "1";
      else {
        const p = (t - fadeStart) / (fadeEnd - fadeStart);
        container.style.opacity = String(p);
      }

      // Volume ramp: 0.2 → 1.0 from 0s–60s
      const vStart = 0.2;
      const vEnd = 1.0;
      const vDuration = 60;
      const ratio = Math.min(t / vDuration, 1);
      video.volume = vStart + (vEnd - vStart) * ratio;
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="opacity-0 transition-opacity duration-[1000ms]" // allows smoother changes
    >
      <video
        ref={videoRef}
        src={orchestra}
        autoPlay
        className="max-w-full max-h-full border"
      />
    </div>
  );
}


