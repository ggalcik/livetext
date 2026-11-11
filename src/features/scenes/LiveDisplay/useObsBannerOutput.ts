import { useEffect } from "react";
import type { LiveDataState } from "../../../context/LiveData/types";
import type { ObsMessage } from "../../../components/Relay/messages";
import { useRelay } from "../../../components/Relay/useRelay";
import { setCurrentSceneSourcesVisible } from "../../../helpers/obs";
import { getBannerObsData } from "./bannerObsData";

export function useObsBannerOutput(state: LiveDataState, active: boolean, embedded: boolean) {
  const visible = active && state.obsVisible;
  // Send only the visible presentation, including the active countdown wheel.
  const serialized = JSON.stringify(visible
    ? { type: "scene/show", scene: "banners", data: getBannerObsData(state) }
    : { type: "scene/hide", scene: "banners" });
  const { send, status } = useRelay({
    onMessage(message, reply) {
      if (embedded && message.type === "scene/request") reply(JSON.parse(serialized) as ObsMessage);
    },
  });

  useEffect(() => {
    if (embedded && status === "connected") send(JSON.parse(serialized) as ObsMessage);
  }, [embedded, serialized, send, status]);

  useEffect(() => {
    if (!embedded) return;
    void setCurrentSceneSourcesVisible(["livetext capture"], !visible, "Basic")
      .catch(error => console.warn("Unable to route banner output in OBS", error));
  }, [embedded, visible, active, state.obsVisible]);
}
