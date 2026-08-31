import { useCallback, useEffect, useRef, useState } from "react";
import { getObsRelayUrl, type ObsMessage } from "./messages";
import { getObsVariant, OBS_BLIPS, type ObsBlipConfig } from "./ObsBlipRegistry";

export default function ObsPage() {
  const [command, setCommand] = useState<Extract<ObsMessage, { type: "blip/play" }> | null>(null);
  const commandRef = useRef(command);
  const socketRef = useRef<WebSocket | null>(null);
  const activeConfig = command ? OBS_BLIPS[command.blip] as ObsBlipConfig : null;
  const ActiveBlip = activeConfig?.component ?? null;
  const activeVariant = activeConfig
    ? getObsVariant(activeConfig, command?.variant)
    : undefined;

  const finishActiveBlip = useCallback(() => {
    const finished = commandRef.current;
    if (!finished) return;

    commandRef.current = null;
    setCommand(null);

    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      const reply: ObsMessage = {
        type: "blip/status",
        blip: finished.blip,
        eventId: finished.eventId,
        status: "ended",
      };
      socket.send(JSON.stringify(reply));
    }
  }, []);

  useEffect(() => {
    let activeSocket: WebSocket | null = null;
    let reconnectTimer: number | null = null;
    let disposed = false;

    const connect = () => {
      activeSocket = new WebSocket(getObsRelayUrl());
      socketRef.current = activeSocket;
      activeSocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as ObsMessage;
          if (message.type === "blip/play" && message.blip in OBS_BLIPS) {
            commandRef.current = message;
            setCommand(message);
            const reply: ObsMessage = { ...message, type: "blip/status", status: "started" };
            activeSocket?.send(JSON.stringify(reply));
          } else if (message.type === "blip/stop" && message.blip in OBS_BLIPS) {
            if (commandRef.current?.eventId === message.eventId) {
              commandRef.current = null;
            }
            setCommand((current) => current?.eventId === message.eventId ? null : current);
            const reply: ObsMessage = { ...message, type: "blip/status", status: "ended" };
            activeSocket?.send(JSON.stringify(reply));
          }
        } catch {
          console.warn("Ignored an invalid OBS relay message");
        }
      };
      activeSocket.onclose = () => {
        if (socketRef.current === activeSocket) socketRef.current = null;
        if (!disposed) reconnectTimer = window.setTimeout(connect, 1500);
      };
      activeSocket.onerror = () => activeSocket?.close();
    };

    connect();
    return () => {
      disposed = true;
      if (reconnectTimer !== null) window.clearTimeout(reconnectTimer);
      activeSocket?.close();
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-transparent">
      {command && ActiveBlip && (
        <div key={command.eventId} className="absolute inset-0 overflow-hidden">
          <ActiveBlip
            source="OBS"
            endBlip={finishActiveBlip}
            variant={activeVariant?.variant}
            opts={activeVariant?.opts}
          />
        </div>
      )}
    </main>
  );
}
