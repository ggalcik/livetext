import { format, parse } from "date-fns";
import { useState } from "react";
import { z } from "zod";
import { Button } from "../../components/Button";
import { usePersistentState } from "../../hooks/usePersistentState";
import type { BlipProps } from "./types";

const AngryBlipSchema = z.object({
  value: z.string(),
  currentDate: z.string(),
  history: z.record(z.string(), z.string()).optional(),
});

// Include the value in the action because OBS can run in a separate browser
// with its own local storage.
const SHOW_ACTION_PREFIX = "show:";

function AngryFlame({ color, mirrored = false }: { color: string; mirrored?: boolean }) {
  return (
        <svg
          aria-hidden="true"
          viewBox="0 0 600 360"
          preserveAspectRatio="none"
          style={{
            color,
            transform: mirrored ? "scaleX(-1)" : undefined,
            position: "absolute",
            top: -80,
            left: 0,
            width: "100%",
            height: "calc(100% + 60px)",
            pointerEvents: "none",
          }}
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

export default function Angry({ obsAction }: BlipProps) {
  if (!obsAction?.startsWith(SHOW_ACTION_PREFIX)) return null;
  const value = obsAction.slice(SHOW_ACTION_PREFIX.length);

  return (
    <div className="relative h-full w-full">
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          boxSizing: "border-box",
          width: "60%",
          padding: "4 0px",
          font: 'bold 60px/1.3 "Agency FB"',
          color: "white",
          textAlign: "center",
          overflowWrap: "anywhere",
        }}
      >
        <AngryFlame color="#a80000" mirrored />
        <AngryFlame color="red" />
        <div style={{ position: "relative", lineHeight: 1 }}>I am {value}% angy!!!@!</div>
        <div style={{ position: "relative", fontSize: "40%", transform: "translate(10%)" }}>
          stats don't lie!
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
