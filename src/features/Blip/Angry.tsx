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
          padding: "60px 20px",
          font: 'bold 60px/1.3 "Agency FB"',
          backgroundColor: "red",
          color: "white",
          textAlign: "center",
          overflowWrap: "anywhere",
        }}
      >
        <div style={{ lineHeight: 1 }}>I am {value}% angy!!!@!</div>
        <div style={{ fontSize: "40%", transform: "translate(10%)" }}>
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
