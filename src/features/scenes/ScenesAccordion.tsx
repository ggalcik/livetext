import { useState } from "react";
import {scenes, type SceneType } from "./types";
import type { PopupState } from "../../context/LiveData/types";
import { Accordion } from "../Accordion/Accordion";
import SceneAdmin from "./SceneAdmin";

export default function ScenesAccordion({ popupState }: { popupState: PopupState }) {
  const [selectedScene, setSelectedScene] = useState<SceneType>("banners");

  return (
    <Accordion label="scenes" startOpen links={scenes} selectedLink={selectedScene} setSelectedLink={setSelectedScene}>
        <SceneAdmin scene={selectedScene} popupState={popupState} />
    </Accordion>
  );
}