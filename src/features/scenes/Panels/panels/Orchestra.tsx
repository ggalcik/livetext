import { useCallback, useEffect, useRef, useState } from "react";

import orchestraRising from "../../../../local/panels/orchestra_rising.mp4";

import applauseVid from "../../../../local/panels/end_applause.mp4";
import booYouSuckVid from "../../../../local/panels/boo_you_suck.mp4";

import { IPanelSceneSchema, type IPanelOrchestra } from "../types";
import { usePersistentState } from "../../../../hooks/usePersistentState";
import { Button } from "../../../../components/Button";
import glog from "../../../../components/glog";

const DELAY_SECONDS = 3;
const DELAY_MS = DELAY_SECONDS * 1000;

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
  const [countdown, setCountdown] = useState<number | null>(null);

  const pendingVideoRef = useRef<string | undefined>(undefined);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {

      if (panelScene.active?.panel === 'Orchestra') {
        setStopVideo(undefined);
      }
    
  }, []);



  const setStopVideoTimer = useCallback(
    (videoValue: string | undefined) => {
      if (countdown !== null) {
        console.warn("Countdown already active. Ignoring new request.");
        return;
      }

      pendingVideoRef.current = videoValue;
      setCountdown(DELAY_SECONDS);

      const id = setTimeout(() => {
        setStopVideo(pendingVideoRef.current);
        setCountdown(null);
        pendingVideoRef.current = undefined;
      }, DELAY_MS);

      timeoutIdRef.current = id as unknown as number;

    },
    [countdown]
  );

  useEffect(() => {
    let intervalId: number | undefined;

    if (countdown !== null && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000) as unknown as number;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countdown]);

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
    <div>

{!countdown && 
<div>
      <div className="flex gap-2">
        <Button onClick={() => setStopVideo(applauseVid)}>
          applause
        </Button>
        <Button onClick={() => setStopVideoTimer(applauseVid)}>
          ({DELAY_SECONDS}s)
        </Button>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setStopVideo(booYouSuckVid)}>
          boo you suck
        </Button>
        <Button onClick={() => setStopVideoTimer(booYouSuckVid)}>
          ({DELAY_SECONDS}s)
        </Button>
      </div>
      </div>
}

      {countdown && <div className="font-bold text-2xl">{countdown} second{countdown > 1 && 's'}...</div>}

    </div>
  )


}

export function Orchestra() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [panelScene] = usePersistentState({
    storageKey: 'panelsScene',
    schema: IPanelSceneSchema,
    fallback: { active: null }
  });
  if (!panelScene.active || panelScene.active.panel !== 'Orchestra') return null;

  const thePanel = panelScene.active;
  const thisVideo = thePanel.stopVideo || orchestraRising;
  const isStopVideo = !!thePanel.stopVideo;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = thisVideo;
    video.load();
    video.volume = isStopVideo ? .2 : 1;
    video.play().catch(error => {
      console.warn(`Video playback failed for ${video.src}:`, error);
    });

    // Cleanup: Pause the video when the component unmounts
    return () => {
      video.pause();
      video.currentTime = 0;
    };

  }, [thisVideo]);

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
