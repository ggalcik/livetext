
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LiveTextPopup from "../scenes/LiveDisplay/LiveTextPopup";
import Atemporal from "../scenes/Atemporal/Atemporal";
import Video from "../scenes/Video/Video";
import Evolution from "../scenes/Evolution/Evolution";
import type { SceneType } from "../scenes/types";


export function openPopup(which?: string) {
  const appendURL = which ? "/" + which : "";

  window.open(
    "/popup" + appendURL,
    "LiveTextPopup",
    "width=600,height=450,menubar=no,toolbar=no,location=yes,status=no"
  );

  // rotate options if I ever need them again
  // "width=800,height=600,menubar=no,toolbar=no,location=yes,status=no"
};

export default function PopupScene() {
  const { name } = useParams<{ name?: SceneType }>();
  const sceneName = name ?? "livetext"

  useEffect(() => {
    // Add class on mount
    document.body.classList.add("popup");
  }, []);

  return (
    <div className="absolute w-full h-full bg-black">
      {sceneName === 'banners' && <LiveTextPopup />}
      {sceneName === 'atemporal' && <Atemporal controls={true} />}
      {sceneName === 'video' && <Video />}
      {sceneName === 'evolution' && <Evolution />}
    </div>
  );
}
