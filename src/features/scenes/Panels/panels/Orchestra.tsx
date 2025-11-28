import { useEffect, useRef } from "react";
import orchestra from "../../../../local/video/orchestra.mp4";

import applause from "../../../../local/soundboard/applause_polite.mp3";
import crowd_lose from "../../../../local/soundboard/crowd lose.mp3";
import boo_you_suck from "../../../../local/soundboard/boo you suck.mp3";

import applauseVid from "../../../../local/panels/end_applause.mp4";
import booYouSuckVid from "../../../../local/panels/boo_you_suck.mp4";

import { IPanelSceneSchema, type IPanelOrchestra } from "../types";
import { usePersistentState } from "../../../../hooks/usePersistentState";
import { Button } from "../../../../components/Button";

export function OrchestraBackground() {
  return <div className="absolute top-0 left-0 w-full h-full bg-black"
  ></div>
}

export function OrchestraAdmin() {
  const [panelScene, setPanelScene] = usePersistentState({
    storageKey: 'panelsScene',
    schema: IPanelSceneSchema,
    fallback: { active: null }
  })

  useEffect(() => {
    return () => {
      if (panelScene.active?.panel !== 'Orchestra'){
        setStopVideo(undefined);
      }
    }
  }, []);

  if (panelScene.active?.panel !== 'Orchestra') return <></>;

   const stopVideo = panelScene.active.stopVideo;

  function setStopVideo(stop: string | undefined) {
    if (!panelScene.active?.panel) return;
    const currentOrchestraPanel = panelScene.active as IPanelOrchestra;

    setPanelScene(
      {
        ...panelScene, 
        active: {
          ...currentOrchestraPanel,
          stopVideo: stop, 
        },
      }
    )
  }

  if (stopVideo !== undefined) return <></>;


  return (
    <div className="flex gap-2">
      <Button onClick={() => setStopVideo(applauseVid)}>
        applause
      </Button>
      <Button onClick={() => setStopVideo(booYouSuckVid)}>
        boo you suck
      </Button>
    </div>
  )


}

export function Orchestra() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const interjectAudioRef = useRef<HTMLAudioElement | null>(null);
  const [panelScene, setPanelScene] = usePersistentState({
    storageKey: 'panelsScene',
    schema: IPanelSceneSchema,
    fallback: { active: null }
  })


  if (!panelScene.active || panelScene.active.panel !== 'Orchestra') return;
  const thePanel = panelScene.active;
  const stopVideo = thePanel.stopVideo;


  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const onTimeUpdate = () => {
      const t = video.currentTime;

      // Fade-in opacity (4s → 15s)
      const fadeStart = 4;
      const fadeEnd = 15;
      if (t < fadeStart) container.style.opacity = "0";
      else if (t >= fadeEnd) container.style.opacity = "1";
      else container.style.opacity = String((t - fadeStart) / (fadeEnd - fadeStart));

      // Volume ramp (0s → 60s, 0.2 → 1)
      const vStart = 0.2;
      const vEnd = 1.0;
      const vDuration = 60;
      const ratio = Math.min(t / vDuration, 1);
      video.volume = vStart + (vEnd - vStart) * ratio;
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.play().catch(() => { });

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const handleInterjection = (sound: string) => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // 1. Stop video audio (pause sound, not video frame)
    video.muted = true;

    // 2. Fade container opacity from 1 → 0 over 2 seconds
    container.style.transition = "opacity 2s linear";
    container.style.opacity = "0";

    // 3. Play selected audio
    if (interjectAudioRef.current) {
      interjectAudioRef.current.pause();
    }
    const a = new Audio(sound);
    interjectAudioRef.current = a;
    a.play().catch((err) => console.warn("Audio play failed:", err));
  };

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="opacity-0 transition-opacity duration-[1000ms]">
        <video
          ref={videoRef}
          src={orchestra}
          autoPlay
          className="max-w-full max-h-full border"
        />
      </div>

    </div>
  );
}
