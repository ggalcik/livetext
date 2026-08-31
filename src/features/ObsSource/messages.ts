import type { ObsBlipName } from "./ObsBlipRegistry";

export type ObsMessage =
  | {
      type: "blip/play";
      blip: ObsBlipName;
      eventId: string;
      variant?: string;
    }
  | {
      type: "blip/stop";
      blip: ObsBlipName;
      eventId: string;
      variant?: string;
    }
  | {
      type: "blip/status";
      blip: ObsBlipName;
      eventId: string;
      variant?: string;
      status: "started" | "ended";
    };

export const OBS_RELAY_PORT = 5174;

export function getObsRelayUrl() {
  return `ws://${window.location.hostname || "127.0.0.1"}:${OBS_RELAY_PORT}`;
}
