import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { SingleWindow } from "./SingleWindow";
import FontReference from "./features/FontReference/FontReference";

import { version } from '../package.json';
import ScenesAccordion from "./features/scenes/ScenesAccordion";
import PopupScene, { PopupSceneContent } from "./features/Popup/PopupScene";
import OverlaysAccordion from "./features/OverlaysAccordion";
import { usePersistentState } from "./hooks/usePersistentState";
import { SceneAccordionDataSchema } from "./features/scenes/types";

function App() {
  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);
  const [adminWidth, setAdminWidth] = useState(66);
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);
  const splitPaneRef = useRef<HTMLDivElement | null>(null);
  const [sceneAccordionData] = usePersistentState({
    storageKey: "SceneAccordion",
    schema: SceneAccordionDataSchema,
    fallback: { adminSelected: "banners", sceneSelected: "banners" },
  });

  useEffect(() => {
    if (!isDraggingDivider) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!splitPaneRef.current) return;

      const bounds = splitPaneRef.current.getBoundingClientRect();
      const nextWidth = ((event.clientX - bounds.left) / bounds.width) * 100;
      const clampedWidth = Math.min(80, Math.max(20, nextWidth));
      setAdminWidth(clampedWidth);
    };

    const stopDragging = () => {
      setIsDraggingDivider(false);
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDraggingDivider]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SingleWindow
              render={(isActive) =>
                isActive ? (
                  <div ref={splitPaneRef} className="flex h-screen overflow-hidden g-stone-300">
                    <div
                      className="relative h-full shrink-0 overflow-auto g-stone-100"
                      style={{ width: `${adminWidth}%` }}
                    >
                      {/* <div className="absolute top-4 right-4 z-10 border bg-white px-2">{version}</div> */}

                      {/* <div className="p-4 pr-18"> */}
                        <OverlaysAccordion />
                        <ScenesAccordion popupState={{ visiblePopup, setVisiblePopup }} />
                      {/* </div> */}
                    </div>

                    <div
                      className="group flex h-full w-3 shrink-0 cursor-col-resize items-center justify-center bg-stone-400 hover:bg-stone-500"
                      onMouseDown={() => setIsDraggingDivider(true)}
                    >
                      <div className="h-20 w-1 rounded-full bg-stone-200 group-hover:bg-white" />
                    </div>

                    <div className="relative h-full min-w-0 flex-1 overflow-hidden bg-black">
                      <PopupSceneContent
                        sceneName={sceneAccordionData.sceneSelected}
                        embedded
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-10">another window opened, reload to yoink</div>
                )
              }
            />
          }
        />
        <Route path="/popup/:name?" element={<PopupScene />} />
        {/* <Route path="/popup" element={<LiveTextPopup initialState={state} />} /> */}
        <Route path="/fonts" element={<FontReference />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
