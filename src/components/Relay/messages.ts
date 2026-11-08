import type { ObsBlipName } from "../../features/ObsSource/ObsBlipRegistry";
import type { ObsSceneName } from "../../features/ObsSource/ObsSceneRegistry";

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
      type: "blip/action";
      blip: ObsBlipName;
      action: string;
    }
  | {
      type: "blip/status";
      blip: ObsBlipName;
      eventId: string;
      variant?: string;
      status: "started" | "ended";
    }
  | {
      type: "scene/show";
      scene: ObsSceneName;
      data?: Record<string, unknown>;
    }
  | {
      type: "scene/hide";
      scene: ObsSceneName;
    }
  | {
      type: "scene/request";
    };

export const OBS_RELAY_PORT = 5174;

export function getObsRelayUrl() {
  return `ws://${window.location.hostname || "127.0.0.1"}:${OBS_RELAY_PORT}`;
}
