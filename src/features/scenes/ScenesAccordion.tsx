import { useState } from "react";
import { scenes, type SceneType, SceneAccordionDataSchema } from "./types";
import type { PopupState } from "../../context/LiveData/types";
import { Accordion } from "../Accordion/Accordion";
import SceneAdmin from "./SceneAdmin";
import { usePersistentState } from "../../hooks/usePersistentState";

export default function ScenesAccordion({ popupState }: { popupState: PopupState }) {
  const [sceneAccordionData, setSceneAccordionData] = usePersistentState({
    storageKey: "SceneAccordion",
    schema: SceneAccordionDataSchema,
    fallback: { adminSelected: 'banners', sceneSelected: 'banners' }
  })

 function setSelectedScene(scene: SceneType) {
  setSceneAccordionData(
    {...sceneAccordionData,
      sceneSelected: scene
    }
  )
 }

  function setSelectedAdmin(scene: SceneType) {
  setSceneAccordionData(
    {...sceneAccordionData,
      adminSelected: scene
    }
  )
 }

  return (
    <Accordion
      label="scenes"
      startOpen links={scenes}
      selectedLink={sceneAccordionData.adminSelected}
      setSelectedLink={setSelectedAdmin}
      selectedRadio={sceneAccordionData.sceneSelected}
      setSelectedRadio={setSelectedScene}> 
      <SceneAdmin scene={sceneAccordionData.adminSelected} popupState={popupState} />
    </Accordion>
  );
}