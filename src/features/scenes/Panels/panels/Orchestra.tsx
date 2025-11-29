import { useEffect, useRef } from "react";

import orchestraRising from "../../../../local/panels/orchestra_rising.mp4";

import applauseVid from "../../../../local/panels/end_applause.mp4";
import booYouSuckVid from "../../../../local/panels/boo_you_suck.mp4";

import { IPanelSceneSchema, type IPanelOrchestra } from "../types";
import { usePersistentState } from "../../../../hooks/usePersistentState";
import { Button } from "../../../../components/Button";
import glog from "../../../../components/glog";

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
      if (panelScene.active?.panel !== 'Orchestra') {
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

  const [panelScene, setPanelScene] = usePersistentState({
    storageKey: 'panelsScene',
    schema: IPanelSceneSchema,
    fallback: { active: null }
  });
  glog("one");
  if (!panelScene.active || panelScene.active.panel !== 'Orchestra') return null;
  glog("two");

  const thePanel = panelScene.active;
  const thisVideo = thePanel.stopVideo || orchestraRising;
  const isStopVideo = !!thePanel.stopVideo;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let playedInitial = false;

    const loadAndPlayVideo = (src: string) => {
      video.src = src;
      video.load();
      video.play().catch(error => {
        console.warn(`Video playback failed for ${src}:`, error);
      });
    };

    if (!thisVideo) {
      console.log('Loading initial video: orchestraRising');
      loadAndPlayVideo(orchestraRising);
      playedInitial = true;
    }

    else if (thisVideo && !playedInitial) {
      console.log(`Switching video source to: ${thisVideo}`);
      video.pause();
      video.currentTime = 0;

      loadAndPlayVideo(thisVideo);
    }

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
