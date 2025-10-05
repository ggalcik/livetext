import type { PopupState } from "../../context/LiveData/types";
import BannerAdmin from "../BannerAdmin/BannerAdmin";
import CounterAdmin from "./Counter/CounterAdmin";
import type { SceneType } from "./types";
import VideoAdmin from "./Video/VideoAdmin";

interface ISceneAdmin {
  scene: SceneType;
  popupState: PopupState;

}

export default function Scene({ scene, popupState }: ISceneAdmin) {
  switch (scene) {
    case "banners": return <BannerAdmin popupState={popupState} />;
    case "video": return <VideoAdmin />
    case "counter": return <CounterAdmin />
    default: return <div className="p-4">nothin'</div>;
  }
}