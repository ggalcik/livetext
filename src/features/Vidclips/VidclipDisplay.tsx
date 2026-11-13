import { useEffect, useRef } from "react";
import { usePersistentState } from "../../hooks/usePersistentState";
import { useRelay } from "../../components/Relay/useRelay";
import type { ObsMessage } from "../../components/Relay/messages";
import Player from "./Player";
import { vidclipDefault, VidclipSchema } from "./types";

export default function VidclipDisplay() {

  const [vidclipData, setVidclipData] = usePersistentState({
    storageKey: 'vidclip',
    schema: VidclipSchema,
    fallback: vidclipDefault
  })

  // Do not replay a clip left in storage when the admin app starts.
  const initialTimestamp = useRef(vidclipData.play_timestamp);
  const vidSettings = vidclipData.play_timestamp !== initialTimestamp.current
    ? vidclipData.vidSettings
    : undefined;

  const playbackRef = useRef({ currentTime: 0, paused: false });
  const eventId = vidclipData.play_timestamp ?? 0;
  const stateMessage = (): ObsMessage => ({
    type: "vidclip/state",
    eventId,
    settings: vidSettings,
    ...playbackRef.current,
  });
  const { send, status } = useRelay({
    onOpen(reply) { reply(stateMessage()); },
    onMessage(message, reply) {
      if (message.type === "vidclip/request") reply(stateMessage());
      if (message.type === "vidclip/ended" && message.eventId === eventId && vidSettings) handleVidStop();
    },
  });

  useEffect(() => {
    playbackRef.current = { currentTime: 0, paused: false };
  }, [eventId]);

  useEffect(() => {
    if (status === "connected") send({ type: "vidclip/state", eventId, settings: vidSettings, ...playbackRef.current });
  }, [eventId, vidSettings, send, status]);

  function handlePlaybackChange(currentTime: number, paused: boolean) {
    playbackRef.current = { currentTime, paused };
    send(stateMessage());
  }

  function handleVidStop() {
    setVidclipData(
      {
        play_timestamp: Date.now()
      }
    )
  }

  if (!vidSettings) return <></>;
  return (
    <div className="pointer-events-none absolute w-full h-full">

      <Player
        key={eventId}
        vidSettings={vidSettings}
        handleVidStop={handleVidStop}
        onPlaybackChange={handlePlaybackChange}
        onPlaybackProgress={(currentTime, paused) => {
          playbackRef.current = { currentTime, paused };
        }}
      />

    </div>
  )
}
