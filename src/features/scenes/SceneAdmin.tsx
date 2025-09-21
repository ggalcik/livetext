import type { PopupState } from "../../context/LiveData/types";
import BannerAdmin from "../BannerAdmin/BannerAdmin";
import AtemporalAdmin from "./Atemporal/AtemporalAdmin";
import type { SceneType } from "./types";
import VideoAdmin from "./Video/VideoAdmin";

interface ISceneAdmin {
  scene: SceneType;
  popupState: PopupState;

}

export default function Scene({ scene, popupState }: ISceneAdmin) {
  switch (scene) {
    case "banners": return <BannerAdmin popupState={popupState} />;
    case "atemporal": return <AtemporalAdmin />;
    case "video": return <VideoAdmin />
    default: return <div className="p-4">undefined</div>;
  }
}