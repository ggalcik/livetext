import { useCallback, useRef, useState } from "react";
import type { ObsMessage } from "../../components/Relay/messages";
import { useRelay } from "../../components/Relay/useRelay";
import { getObsVariant, OBS_BLIPS, type ObsBlipConfig } from "./ObsBlipRegistry";
import { OBS_SCENES, type ObsSceneConfig } from "./ObsSceneRegistry";
import type { ObsInsets } from "./types";

function layerStyle(insets?: ObsInsets): React.CSSProperties {
  return insets
    ? {
        position: "absolute",
        top: insets.top,
        right: insets.right,
        bottom: insets.bottom,
        left: insets.left,
      }
    : { position: "absolute", inset: 0 };
}

export default function ObsPage() {
  const [command, setCommand] = useState<Extract<ObsMessage, { type: "blip/play" }> | null>(null);
  const [scene, setScene] = useState<Extract<ObsMessage, { type: "scene/show" }> | null>(null);
  const [blipAction, setBlipAction] = useState<{ action: string; requestId: number } | null>(null);
  const commandRef = useRef(command);
  const activeConfig = command ? OBS_BLIPS[command.blip] as ObsBlipConfig : null;
  const ActiveBlip = activeConfig?.component ?? null;
  const activeVariant = activeConfig
    ? getObsVariant(activeConfig, command?.variant)
    : undefined;
  const activeSceneConfig = scene
    ? OBS_SCENES[scene.scene] as ObsSceneConfig
    : null;
  const ActiveScene = activeSceneConfig?.component ?? null;

  const { send } = useRelay({
    onOpen(sendToRelay) {
      sendToRelay({ type: "scene/request" });
    },
    onMessage(message, replyToRelay) {
      if (message.type === "blip/play" && message.blip in OBS_BLIPS) {
        setBlipAction(null);
        commandRef.current = message;
        setCommand(message);
        const reply: ObsMessage = { ...message, type: "blip/status", status: "started" };
        replyToRelay(reply);
      } else if (message.type === "blip/stop" && message.blip in OBS_BLIPS) {
        if (commandRef.current?.eventId === message.eventId) {
          commandRef.current = null;
        }
        setCommand((current) => current?.eventId === message.eventId ? null : current);
        const reply: ObsMessage = { ...message, type: "blip/status", status: "ended" };
        replyToRelay(reply);
      } else if (message.type === "blip/action" && message.blip in OBS_BLIPS) {
        if (commandRef.current?.blip === message.blip) {
          setBlipAction((current) => ({
            action: message.action,
            requestId: (current?.requestId ?? 0) + 1,
          }));
        }
      } else if (message.type === "scene/show" && message.scene in OBS_SCENES) {
        setScene(message);
      } else if (message.type === "scene/hide" && message.scene in OBS_SCENES) {
        setScene((current) => current?.scene === message.scene ? null : current);
      }
    },
  });

  const finishActiveBlip = useCallback(() => {
    const finished = commandRef.current;
    if (!finished) return;

    commandRef.current = null;
    setCommand(null);

    send({
      type: "blip/status",
      blip: finished.blip,
      eventId: finished.eventId,
      status: "ended",
    });
  }, [send]);

  return (
    <main className="relative  overflow-hidden bg-transparent w-[600px] h-[800px]">
      {scene && ActiveScene && (
        <div style={layerStyle(activeSceneConfig?.insets)}>
          <ActiveScene data={scene.data} />
        </div>
      )}
      {command && ActiveBlip && (
        <div
          key={command.eventId}
          className="overflow-hidden"
          style={layerStyle(activeConfig?.insets)}
        >
          <ActiveBlip
            source="OBS"
            endBlip={finishActiveBlip}
            variant={activeVariant?.variant}
            opts={activeVariant?.opts}
            obsAction={blipAction?.action}
            obsActionRequestId={blipAction?.requestId}
          />
        </div>
      )}
    </main>
  );
}
