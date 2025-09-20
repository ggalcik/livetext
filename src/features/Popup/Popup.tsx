
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LiveTextPopup from "../scenes/LiveDisplay/LiveTextPopup";


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

export default function Popup() {
  const { name } = useParams<{ name?: string }>();
  const sceneName = name ?? "livetext"

  useEffect(() => {
    // Add class on mount
    document.body.classList.add("popup");
  }, []);

  return (
    <div className="absolute w-full h-full bg-black">

      {/* <MasterViewport name={viewportName}>
        <div className="w-full h-full bg-white">nothing in viewport</div>
      </MasterViewport> */}

      <LiveTextPopup/>

    </div>
  );
}
