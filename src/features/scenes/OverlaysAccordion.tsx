import {  useState } from "react";
import {overlays, type OverlayType } from "./types";
import { Accordion } from "../Accordion/Accordion";
import glog from "../../components/glog";
import Soundboard from "../Soundboard/Soundboard";
import Data from "../Data/Data";
import FontReference from "../FontReference/FontReference";
import VidclipAdmin from "../Vidclips/VidclipAdmin";


function showOverlay(overlay: OverlayType) {
 switch (overlay) {
    case "vidclips": return <VidclipAdmin />;
    case "sounds": return <Soundboard />;
    case "data": return <Data />;
    case "fonts": return <FontReference />;
   
    default: return <div className="p-4">
      {/* <div className="flex flex-wrap">
        <div className="flex-grow basis-full lg:basis-0 bg-red-300">First (fills row)</div>
        <div className="basis-1/2 bg-green-300">Second</div>
        <div className="basis-1/2 bg-blue-300">Third</div>
      </div> */}
      nothin'!
    </div>;
  }
}


export default function OverlaysAccordion() {
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayType>('vidclips')

  return (
    <Accordion
      label="overlays"
      linkLabels={overlays}
      selectedLink={selectedOverlay}
      setSelectedLink={setSelectedOverlay}>

       { showOverlay(selectedOverlay)}

    </Accordion>
  );
}
