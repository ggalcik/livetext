import { useCallback, useEffect, useRef, useState } from "react";
import { getObsRelayUrl, type ObsMessage } from "./messages";

export type RelayStatus = "connecting" | "connected" | "disconnected";
export type RelaySend = (message: ObsMessage) => boolean;
type RelayHandlers = {
  onMessage?: (message: ObsMessage, send: RelaySend) => void;
  onOpen?: (send: RelaySend) => void;
};

/** Owns a relay connection for the lifetime of the calling component.
 * Handler changes do not reconnect. Disconnected sends return false; commands are not queued.
 */
export function useRelay(handlers: RelayHandlers = {}) {
  const socketRef = useRef<WebSocket | null>(null);
  const handlersRef = useRef(handlers);
  const [status, setStatus] = useState<RelayStatus>("connecting");

  useEffect(() => {
    handlersRef.current = handlers;
  });

  const send = useCallback<RelaySend>((message) => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    socket.send(JSON.stringify(message));
    return true;
  }, []);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimer: number | undefined;
    let disposed = false;

    const connect = () => {
      socket = new WebSocket(getObsRelayUrl());
      const connection = socket;
      socketRef.current = connection;
      connection.onopen = () => {
        if (disposed) return;
        setStatus("connected");
        handlersRef.current.onOpen?.(send);
      };
      connection.onmessage = (event) => {
        if (disposed) return;
        let message: ObsMessage;
        try {
          message = JSON.parse(event.data) as ObsMessage;
          if (!message || typeof message !== "object" || typeof message.type !== "string") return;
        } catch {
          console.warn("Ignored an invalid OBS relay message");
          return;
        }
        handlersRef.current.onMessage?.(message, send);
      };
      connection.onclose = () => {
        if (socketRef.current === connection) socketRef.current = null;
        if (disposed) return;
        setStatus("disconnected");
        reconnectTimer = window.setTimeout(connect, 1500);
      };
      connection.onerror = () => connection.close();
    };

    connect();
    return () => {
      disposed = true;
      window.clearTimeout(reconnectTimer);
      if (socketRef.current === socket) socketRef.current = null;
      socket?.close();
    };
  }, [send]);

  return { send, status };
}
