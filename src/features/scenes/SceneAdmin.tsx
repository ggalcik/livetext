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
    default: return <div className="p-4">
      <div className="flex flex-wrap">
        <div className="flex-grow basis-full lg:basis-0 bg-red-300">First (fills row)</div>
        <div className="basis-1/2 bg-green-300">Second</div>
        <div className="basis-1/2 bg-blue-300">Third</div>
      </div>
    </div>;
  }
}