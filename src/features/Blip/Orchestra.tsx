import React, { useEffect, useMemo, useRef, useState } from "react";

import orchestraRising from "../../local/panels/orchestra_rising.mp4";
import orchestraFiller from "../../local/video/orchestra_filler.mp4";
import applauseVid from "../../local/panels/end_applause.mp4";
import booYouSuckVid from "../../local/panels/boo_you_suck.mp4";
import orchestraImg from "./assets/orchestra.png";

import { Button } from "../../components/Button";
import type { BlipProps } from "./types";
import './Blip.css';

import { gGlobal } from "../Global/global";
import clsx from "clsx";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
const DELAY_SECONDS = 3;
const START_SLIDE = 0;

type ClipChoice = "applause" | "boo";

function choiceToSrc(choice: ClipChoice): string {
  return choice === "applause" ? applauseVid : booYouSuckVid;
}

export default function Orchestra({ endBlip }: BlipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLVideoElement>(null);

  const [showControls, setShowControls] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [fillerStartTime] = useState(() => 60 + Math.random() * (25 * 60 - 60));
  const [currentSlide, setCurrentSlide] = useState(START_SLIDE);

  // null means we're still on orchestraRising
  const [selectedChoice, setSelectedChoice] = useState<ClipChoice | null>(null);

  const activeSrc = useMemo(() => {
    return selectedChoice ? choiceToSrc(selectedChoice) : orchestraRising;
  }, [selectedChoice]);

  const isRising = selectedChoice === null;
  const visibleSrc = isRising ? orchestraFiller : activeSrc;

  function startNow(choice: ClipChoice) {
    setShowControls(false);
    setCountdown(null);
    setSelectedChoice(choice);
  }

  function startAfterDelay(choice: ClipChoice) {
    setShowControls(false);
    setSelectedChoice(null); // keep rising playing during countdown
    setCountdown(DELAY_SECONDS);

    let remaining = DELAY_SECONDS;

    const intervalId = window.setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);

      if (remaining <= 0) {
        window.clearInterval(intervalId);
        setCountdown(null);
        setSelectedChoice(choice);
      }
    }, 1000);

    // safety cleanup if component unmounts mid-countdown
    return () => window.clearInterval(intervalId);
  }



  // Keep the audible track separate while the filler video is visible.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = activeSrc;
    audio.volume = isRising ? 1 : 0.2;
    audio.muted = false;

    audio.load();
    void audio.play().catch(() => {
      // autoplay might be blocked; ignore quietly
    });
  }, [activeSrc, isRising]);

  // Show the looping filler video during the rising audio, then swap back to clips.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = visibleSrc;
    video.muted = isRising;
    video.volume = isRising ? 0 : 0.2;

    const setStartTime = () => {
      if (isRising) {
        video.currentTime = Math.min(fillerStartTime, Math.max(video.duration - 0.1, 0));
      }
    };

    video.load();

    if (isRising) {
      video.addEventListener("loadedmetadata", setStartTime, { once: true });
    }

    void video.play().catch(() => {
      // autoplay might be blocked; ignore quietly
    });

    return () => {
      video.removeEventListener("loadedmetadata", setStartTime);
    };
  }, [fillerStartTime, isRising, visibleSrc]);

  // Call endClip when the selected clip finishes
  function handleEnded() {
    if (!isRising) {
      endBlip();
    }
  }

  // rotate picture animations
  useEffect(() => {
    // return; 

    const interval = setInterval(() => {
      setCurrentSlide(p => (p + 1) % 5)
      // setCurrentSlide(1)
    }, 10000);

    return (() => clearInterval(interval))

  }, [isRising, currentSlide]);


  return (
    <div className="w-full h-full relative bg-black opacity-0 animate-fadein-orchestra">
      {/* Controls at the top */}
      <div className={clsx("absolute left-0 right-0 p-4 flex z-10 flex-col gap-3",
        gGlobal.layout.crampedPortrait ? 'bottom-0' : 'top-0')}>
        {showControls && (
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <Button onClick={() => startNow("applause")}>applause</Button>
              <Button
                onClick={() => {
                  const cleanup = startAfterDelay("applause");
                  void cleanup;
                }}
              >
                (3s)
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => startNow("boo")}>boo you suck</Button>
              <Button
                onClick={() => {
                  const cleanup = startAfterDelay("boo");
                  void cleanup;
                }}
              >
                (3s)
              </Button>
            </div>
          </div>
        )}

        {countdown !== null && (
          <div className="text-white font-bold text-2xl">
            {countdown} second{countdown === 1 ? "" : "s"}...
          </div>
        )}
      </div>


      {/* <div className={clsx("absolute w-[160%] top-10 left-0 right-0",
        gGlobal.layout.crampedPortrait ? 'top-0' : 'bottom-0'
      )}>
        <video ref={audioRef} className="hidden" playsInline           onEnded={handleEnded} />
        <video
          ref={videoRef}
          className="absolute -translate-x-[20%] w-[150%] "
          onEnded={handleEnded}
          playsInline
        />
      </div> */}

      {!selectedChoice &&

        <MasterViewport name={"Blip_Orchestra"} needCtrl={true}>

          <div className="absolute w-full h-full">
            <img src={orchestraImg} className={clsx("absolute transition-opacity duration-5000",
              currentSlide === 4 ? 'opacity-100  animate-orchestra-4' : 'opacity-0',
              "scale-300 origin-bottom-right bottom-0 left-0"
            )} />
            <img src={orchestraImg} className={clsx("absolute transition-opacity duration-5000",
              currentSlide === 3 ? 'opacity-100 animate-orchestra-3' : 'opacity-0',
              "scale-400 origin-bottom-left bottom-0 left-0"
            )} />
            <img src={orchestraImg} className={clsx("absolute transition-opacity duration-5000",
              currentSlide === 2 ? 'opacity-100 animate-orchestra-2' : 'opacity-0',
              "scale-150 origin-top-right",
              "top-0 right-0"
            )} />
            <img src={orchestraImg} className={clsx("absolute transition-opacity duration-5000",
              currentSlide === 1 ? 'opacity-100 animate-orchestra-1' : 'opacity-0',
              "scale-400 origin-bottom-left ",
              "bottom-0 left-0"
            )} />
            <img src={orchestraImg} className={clsx("absolute transition-opacity duration-5000",
              currentSlide === 0 ? 'opacity-100  animate-orchestra-0' : 'opacity-0',
              "scale-130 origin-bottom animate-orchestra-0 translate-y-10",
              "bottom-0 left-0"
            )} />
          </div>
        </MasterViewport>

      }

      {/* <video ref={audioRef} className="hidden" playsInline onEnded={handleEnded} /> */}
      {selectedChoice &&
        <div className={clsx("absolute w-[160%] top-10 left-0 right-0",
          gGlobal.layout.crampedPortrait ? 'top-0' : 'bottom-0'
        )}>
          <video
            ref={videoRef}
            className="absolute -translate-x-[20%] w-[150%] "
            onEnded={handleEnded}
            playsInline
          />
        </div>
      }
    </div>
  );
}
