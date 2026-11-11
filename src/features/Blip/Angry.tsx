import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../../components/Button";
import { usePersistentState } from "../../hooks/usePersistentState";
import type { BlipProps } from "./types";
import "./Angry.css";
import { AudioController } from "../../components/AudioController";
import angerFlameAudio from "./assets/angerflame.mp3";

const AngryBlipSchema = z.object({
  value: z.string(),
  currentDate: z.string(),
  history: z.record(z.string(), z.string()).optional(),
});

// Include the value in the action because OBS can run in a separate browser
// with its own local storage.
const SHOW_ACTION_PREFIX = "show:";

function AngryFlame({ color, mirrored = false, className = "absolute -top-20 left-0 h-[calc(100%+120px)] w-full" }: {
  color: string;
  mirrored?: boolean;
  className?: string;
}) {
  return (
        <svg
          aria-hidden="true"
          viewBox="0 0 600 360"
          preserveAspectRatio="none"
          className={`pointer-events-none origin-bottom motion-reduce:animate-none ${className} ${mirrored
            ? "-scale-x-100 animate-[angry-flame-back_4s_steps(1,end)_500ms_infinite]"
            : "animate-[angry-flame-front_4s_steps(1,end)_500ms_infinite]"}`}
          style={{ color }}
        >
          <path
            d="M 100 344
               C 38 344 12 306 18 257
               C 21 224 46 203 29 159
               C 61 170 70 191 70 208
               C 92 164 45 130 72 79
               C 76 117 116 120 118 151
               C 157 110 127 73 161 34
               C 147 80 205 94 191 139
               C 221 119 222 88 214 72
               C 255 89 264 113 257 142
               C 302 105 265 61 316 12
               C 299 69 365 83 348 137
               C 378 126 392 97 382 65
               C 426 91 442 125 425 158
               C 468 133 444 98 478 61
               C 468 107 526 135 506 187
               C 534 170 540 146 536 130
               C 582 175 562 207 580 245
               C 607 305 566 344 505 344
               Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
  );
}

function AngryArtwork({ value }: { value: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-20 left-0 h-[calc(100%+120px)] w-full origin-bottom scale-x-[0.85] scale-y-[1.20]">
        <AngryFlame color="#a80000" mirrored className="absolute inset-0 h-full w-full" />
      </div>
      <AngryFlame color="red" />
      <div className="relative leading-none">I am {value}% angy!!!@!</div>
      <div className="relative translate-x-[10%] text-[40%]">
        stats don't lie!
      </div>
    </div>
  );
}

export default function Angry({ obsAction, obsActionRequestId }: BlipProps) {
  useEffect(() => {
    if (!obsAction?.startsWith(SHOW_ACTION_PREFIX)) return;
    const audio = new AudioController();
    void audio.playUrl(angerFlameAudio);
    return () => audio.stop();
  }, [obsAction, obsActionRequestId]);

  if (!obsAction?.startsWith(SHOW_ACTION_PREFIX)) return null;
  const value = obsAction.slice(SHOW_ACTION_PREFIX.length);

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute top-1/4 left-1/2 box-border w-3/5 -translate-x-1/2 text-center font-['Agency_FB'] text-[60px] leading-[1.3] font-bold text-white [overflow-wrap:anywhere]"
      >
        <div key={obsActionRequestId} className="relative -mx-3 -mt-[90px] -mb-[50px]">
          <div className="px-3 pt-[90px] pb-[50px] animate-[angry-reveal_500ms_linear_both]">
            <AngryArtwork value={value} />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 px-3 pt-[90px] pb-[50px] [filter:brightness(0)_saturate(100%)_invert(65%)_sepia(90%)_saturate(2400%)_hue-rotate(355deg)] animate-[angry-reveal-edge_500ms_linear_both]">
            <AngryArtwork value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AngryAdmin({ sendAction }: { sendAction: (action: string) => void }) {
  const [angry, setAngry] = usePersistentState({
    storageKey: "AngryBlip",
    schema: AngryBlipSchema,
    fallback: { value: "123", currentDate: format(new Date(), "yyyyMMdd") },
  });
  const [draftValue, setDraftValue] = useState(angry.value);
  const [isShowing, setIsShowing] = useState(false);
  const today = format(new Date(), "yyyyMMdd");
  const lastUpdate = angry.currentDate === today
    ? "today"
    : format(parse(angry.currentDate, "yyyyMMdd", new Date()), "d MMM yyyy");

  const toggleDisplay = () => {
    if (isShowing) {
      sendAction("hide");
      setIsShowing(false);
      return;
    }

    const currentDate = format(new Date(), "yyyyMMdd");
    setAngry((previous) => ({
      value: draftValue,
      currentDate,
      history: previous.currentDate === currentDate ? previous.history : {
        ...previous.history,
        [previous.currentDate]: previous.value,
      },
    }));
    sendAction(`${SHOW_ACTION_PREFIX}${draftValue}`);
    setIsShowing(true);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="lg"
        variant="b"
        mode={isShowing ? "activated" : undefined}
        className="ring-black"
        aria-pressed={isShowing}
        onClick={toggleDisplay}
      >
        Show it
      </Button>
      <input
        type="text"
        aria-label="Angry percentage"
        className="w-24 rounded border border-black/30 bg-white p-2 text-black"
        value={draftValue}
        onChange={(event) => setDraftValue(event.target.value)}
      />
      <span className="text-xs text-gray-600">Last updated: {lastUpdate}</span>
    </div>
  );
}
