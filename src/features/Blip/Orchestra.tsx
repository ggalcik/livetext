import React, { useEffect, useMemo, useRef, useState } from "react";

import orchestraRising from "../../local/panels/orchestra_rising.mp4";
import applauseVid from "../../local/panels/end_applause.mp4";
import booYouSuckVid from "../../local/panels/boo_you_suck.mp4";

import { Button } from "../../components/Button";
import type { BlipProps } from "./types";
import './Blip.css';

import { gGlobal } from "../Global/global";
import clsx from "clsx";
const DELAY_SECONDS = 3;


type ClipChoice = "applause" | "boo";

function choiceToSrc(choice: ClipChoice): string {
  return choice === "applause" ? applauseVid : booYouSuckVid;
}

export default function Orchestra({ endBlip }: BlipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showControls, setShowControls] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);

  // null means we're still on orchestraRising
  const [selectedChoice, setSelectedChoice] = useState<ClipChoice | null>(null);

  const activeSrc = useMemo(() => {
    return selectedChoice ? choiceToSrc(selectedChoice) : orchestraRising;
  }, [selectedChoice]);

  const isRising = selectedChoice === null;

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

  // Load + play whenever activeSrc changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = activeSrc;
    video.loop = isRising;            // rising loops, selected clips do not
    video.volume = isRising ? 1 : 0.2;

    video.load();
    void video.play().catch(() => {
      // autoplay might be blocked; ignore quietly
    });
  }, [activeSrc, isRising]);

  // Call endClip when the selected clip finishes
  function handleEnded() {
    if (!isRising) {
      endBlip();
    }
  }

  return (
    <div className="w-full h-full bg-black opacity-0 animate-fadein-orchestra">
      {/* Controls at the top */}
      <div className={clsx("absolute left-0 right-0 p-4 flex flex-col gap-3",
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


      <div className={clsx("absolute left-0 right-0",
        gGlobal.layout.crampedPortrait ? 'top-0' : 'bottom-0'
      )}>
        <video
          ref={videoRef}
          className="max-w-[150%] max-h-full"
          onEnded={handleEnded}
          playsInline
        />
      </div>
    </div>
  );
}
