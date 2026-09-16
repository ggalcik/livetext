import { useEffect, useRef, useState } from "react";

import applauseVid from "../../local/panels/end_applause.mp4";
import booYouSuckVid from "../../local/panels/boo_you_suck.mp4";
import orchestraRising from "../../local/panels/orchestra_rising.mp4";
import type { BlipProps } from "./types";
import { Button } from "../../components/Button";
import "./Blip.css";

const ORCHESTRA_ACTIONS = [
  "applause",
  "applause-delayed",
  "boo",
  "boo-delayed",
] as const;

type OrchestraAction = (typeof ORCHESTRA_ACTIONS)[number];
type Ending = "applause" | "boo";

const ORCHESTRA_ADMIN_ACTIONS: {
  label: string;
  action: OrchestraAction;
  delaySeconds?: number;
}[] = [
  { label: "applause", action: "applause" },
  { label: "applause 3s", action: "applause-delayed", delaySeconds: 3 },
  { label: "boo", action: "boo" },
  { label: "boo 3s", action: "boo-delayed", delaySeconds: 3 },
];

function endingSource(ending: Ending) {
  return ending === "applause" ? applauseVid : booYouSuckVid;
}

export default function OverOrchestra({
  endBlip,
  obsAction,
  obsActionRequestId,
}: BlipProps) {
  const [ending, setEnding] = useState<Ending | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!obsAction || !ORCHESTRA_ACTIONS.includes(obsAction as OrchestraAction)) return;

    if (timerRef.current !== null) window.clearTimeout(timerRef.current);

    const nextEnding: Ending = obsAction.startsWith("applause") ? "applause" : "boo";
    if (obsAction.endsWith("-delayed")) {
      timerRef.current = window.setTimeout(() => setEnding(nextEnding), 3000);
    } else {
      setEnding(nextEnding);
    }

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [obsAction, obsActionRequestId]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {ending ? (
        <video
          key={ending}
          className="absolute left-0 top-1/4 h-auto w-full"
          src={endingSource(ending)}
          autoPlay
          playsInline
          onEnded={endBlip}
        />
      ) : (
        <video
          className="over-orchestra-rising absolute left-0 top-1/4 h-auto w-full"
          src={orchestraRising}
          autoPlay
          playsInline
        />
      )}
    </div>
  );
}

export function OverOrchestraAdmin({
  sendAction,
}: {
  sendAction: (action: string) => void;
}) {
  const [activeAction, setActiveAction] = useState<{
    action: OrchestraAction;
    requestId: number;
  } | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!activeAction) return;
    const delaySeconds = ORCHESTRA_ADMIN_ACTIONS.find(
      ({ action }) => action === activeAction.action,
    )?.delaySeconds;
    if (!delaySeconds) return;

    setCountdown(delaySeconds);
    const intervalId = window.setInterval(() => {
      setCountdown((current) => {
        if (current === null || current <= 1) {
          window.clearInterval(intervalId);
          return null;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [activeAction]);

  const triggerAction = (action: OrchestraAction) => {
    setCountdown(null);
    setActiveAction((current) => ({
      action,
      requestId: (current?.requestId ?? 0) + 1,
    }));
    sendAction(action);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {ORCHESTRA_ADMIN_ACTIONS.map(({ label, action }) => (
          <Button
            key={action}
            size="lg"
            variant="b"
            className={activeAction?.action === action ? "ring-2 ring-black" : undefined}
            mode={activeAction?.action === action ? "activated" : undefined}
            disabled={activeAction !== null}
            onClick={() => triggerAction(action)}
          >
            {label}
          </Button>
        ))}
        {countdown !== null && (
          <span className="text-lg font-bold">{countdown}…</span>
        )}
      </div>
    </div>
  );
}
