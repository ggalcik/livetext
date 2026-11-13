import { useEffect, useRef, useState } from "react";
import type { ObsMessage } from "../../components/Relay/messages";
import { useRelay } from "../../components/Relay/useRelay";
import { resolvePublicAssetPath } from "../../helpers/assetPaths";
import { VidSettingsSchema } from "./types";

type Playback = Extract<ObsMessage, { type: "vidclip/state" }>;

export default function ObsVidclipDisplay() {
  const [playback, setPlayback] = useState<Playback>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { send } = useRelay({
    onOpen(reply) { reply({ type: "vidclip/request" }); },
    onMessage(message) {
      if (message.type !== "vidclip/state") return;
      if (message.settings && !VidSettingsSchema.safeParse(message.settings).success) return;
      setPlayback(message);
    },
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playback?.settings) return;
    const applyPlayback = () => {
      if (Number.isFinite(playback.currentTime) && playback.currentTime >= 0) video.currentTime = playback.currentTime;
      if (playback.paused) video.pause();
      else void video.play().catch((error) => console.warn("Could not play OBS vidclip:", error));
    };
    if (video.readyState >= 1) applyPlayback();
    video.addEventListener("loadedmetadata", applyPlayback);
    return () => video.removeEventListener("loadedmetadata", applyPlayback);
  }, [playback]);

  if (!playback?.settings) return null;
  return (
    <div className="absolute inset-0 z-10 isolate flex items-center justify-center">
      <video
        key={playback.eventId}
        ref={videoRef}
        src={resolvePublicAssetPath(`video/${playback.settings.filename}`)}
        loop={playback.settings.loop}
        playsInline
        className="max-h-full max-w-full object-contain"
        onEnded={() => {
          if (playback.settings?.stayOnDone) return;
          setPlayback(undefined);
          send({ type: "vidclip/ended", eventId: playback.eventId });
        }}
      />
    </div>
  );
}
