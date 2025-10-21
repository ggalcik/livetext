import { useRef, useState, useEffect } from "react";
import { scenes, type SceneType, SceneAccordionDataSchema } from "./types";
import type { PopupState } from "../../context/LiveData/types";
import { Accordion } from "../Accordion/Accordion";
import SceneAdmin from "./SceneAdmin";
import { usePersistentState } from "../../hooks/usePersistentState";
import { openPopup } from "../Popup/PopupScene";
import glog from "../../components/glog";


export default function ScenesAccordion({ popupState }: { popupState: PopupState }) {
  const [sceneAccordionData, setSceneAccordionData] = usePersistentState({
    storageKey: "SceneAccordion",
    schema: SceneAccordionDataSchema,
    fallback: { adminSelected: "banners", sceneSelected: "banners" },
  });

  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [remainingDelay, setRemainingDelay] = useState<number | null>(null);

  function setSelectedScene(scene: SceneType) {

    const newData = {
      ...sceneAccordionData,
      sceneSelected: scene,
      adminSelected: scene,
    };
    setSceneAccordionData(newData);
    openPopup(scene);
    // setSelectedAdmin(scene);
  }

  function clearTimers() {
    if (switchTimer.current) {
      clearTimeout(switchTimer.current);
      switchTimer.current = null;
    }
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
    setRemainingDelay(null);
  }

  function switchScene(scene: SceneType, delaySeconds?: number):void {
    // cancel any existing timers
    clearTimers();

    if (delaySeconds && delaySeconds > 0) {
      setRemainingDelay(delaySeconds);

      // countdown ticker
      countdownInterval.current = setInterval(() => {
        setRemainingDelay((prev) => {
          if (prev === null || prev <= 1) {
            if (countdownInterval.current) clearInterval(countdownInterval.current);
            countdownInterval.current = null;
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      // main timeout
      switchTimer.current = setTimeout(() => {
        setSelectedScene(scene);
        clearTimers();
      }, delaySeconds * 1000);
    } else {
      setSelectedScene(scene);
    }
  }

  function setSelectedAdmin(scene: SceneType) {
    const newData = {
      ...sceneAccordionData,
      adminSelected: scene
    };
    setSceneAccordionData(newData);

  }

  // Clean up if component unmounts
  useEffect(() => {
    return clearTimers;
  }, []);

  const boomerang = (delay: number) => switchScene(sceneAccordionData.sceneSelected, delay)

// glog("boomerang %o", boomerang)
  return (
    <Accordion
      label="scenes"
      startOpen
      links={scenes}
      selectedLink={sceneAccordionData.adminSelected}
      setSelectedLink={setSelectedAdmin}
      selectedRadio={sceneAccordionData.sceneSelected}
      setSelectedRadio={(scene, delay) => switchScene(scene, delay)}
      boomerangRadio={sceneAccordionData.adminSelected !== sceneAccordionData.sceneSelected
        ? boomerang : null}
      delay={remainingDelay} // ⬅ live countdown in seconds
    >
      <SceneAdmin
        scene={sceneAccordionData.adminSelected}
        popupState={popupState} 
        boomerang={boomerang}/>
    </Accordion>
  );
}
