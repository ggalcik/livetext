import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { SingleWindow } from "./SingleWindow";
import FontReference from "./features/FontReference/FontReference";
import ScenesAccordion from "./features/scenes/ScenesAccordion";
import PopupScene, { PopupSceneContent } from "./features/Popup/PopupScene";
import OverlaysAccordion from "./features/OverlaysAccordion";
import { usePersistentState } from "./hooks/usePersistentState";
import { SceneAccordionDataSchema } from "./features/scenes/types";

function App() {
  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);
  const [adminWidth, setAdminWidth] = useState(66);
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);
  const [isDividerLocked, setIsDividerLocked] = useState(false);
  const [isPopupShifted, setIsPopupShifted] = useState(false);
  const [guideLineTop, setGuideLineTop] = useState(66);
  const splitPaneRef = useRef<HTMLDivElement | null>(null);
  const dividerClickTimeoutRef = useRef<number | null>(null);
  const dividerPointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const dividerDidDragRef = useRef(false);
  const [sceneAccordionData] = usePersistentState({
    storageKey: "SceneAccordion",
    schema: SceneAccordionDataSchema,
    fallback: { adminSelected: "banners", sceneSelected: "banners" },
  });

  useEffect(() => {
    if (!isDraggingDivider) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!splitPaneRef.current) return;
      if (dividerPointerStartRef.current) {
        const { x, y } = dividerPointerStartRef.current;
        if (Math.abs(event.clientX - x) > 3 || Math.abs(event.clientY - y) > 3) {
          dividerDidDragRef.current = true;
        }
      }

      const bounds = splitPaneRef.current.getBoundingClientRect();
      const nextWidth = ((event.clientX - bounds.left) / bounds.width) * 100;
      const nextGuideLineTop = ((event.clientY - bounds.top) / bounds.height) * 100;
      const clampedWidth = Math.min(80, Math.max(20, nextWidth));
      const clampedGuideLineTop = Math.min(95, Math.max(5, nextGuideLineTop));
      setAdminWidth(clampedWidth);
      setGuideLineTop(clampedGuideLineTop);
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

  useEffect(() => {
    return () => {
      if (dividerClickTimeoutRef.current !== null) {
        window.clearTimeout(dividerClickTimeoutRef.current);
      }
    };
  }, []);

  function handleDividerMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    if (isDividerLocked) return;
    dividerPointerStartRef.current = { x: event.clientX, y: event.clientY };
    dividerDidDragRef.current = false;
    setIsDraggingDivider(true);
  }

  function handleDividerClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (dividerClickTimeoutRef.current !== null) {
      window.clearTimeout(dividerClickTimeoutRef.current);
      dividerClickTimeoutRef.current = null;
    }

    if (event.detail !== 1) {
      return;
    }

    if (dividerDidDragRef.current) {
      dividerDidDragRef.current = false;
      dividerPointerStartRef.current = null;
      return;
    }

    dividerClickTimeoutRef.current = window.setTimeout(() => {
      setIsPopupShifted((previous) => !previous);
      dividerPointerStartRef.current = null;
      dividerClickTimeoutRef.current = null;
    }, 300);
  }

  function toggleDividerLock() {
    if (dividerClickTimeoutRef.current !== null) {
      window.clearTimeout(dividerClickTimeoutRef.current);
      dividerClickTimeoutRef.current = null;
    }

    dividerPointerStartRef.current = null;
    dividerDidDragRef.current = false;
    setIsDraggingDivider(false);
    setIsDividerLocked((previous) => !previous);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SingleWindow
              render={(isActive) =>
                isActive ? (
                  <div ref={splitPaneRef} className="flex h-screen overflow-hidden bg-gray-900">
                    <div
                      className="relative h-full shrink-0 overflow-auto bg-white"
                      style={{ width: `${adminWidth}%` }}
                    >
                      {/* <div className="absolute top-4 right-4 z-10 border bg-white px-2">{version}</div> */}

                      {/* <div className="p-4 pr-18"> */}
                        <OverlaysAccordion />
                        <ScenesAccordion popupState={{ visiblePopup, setVisiblePopup }} />
                      {/* </div> */}
                    </div>

                    <div className="relative h-full w-0 shrink-0">
                      <div
                        className={`absolute z-30 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border-2 border-stone-700 bg-stone-300 text-lg shadow-md select-none 
                          ${isDividerLocked 
                            ? 'cursor-not-allowed bg-stone-600' 
                            : 'cursor-move bg-stone-300 hover:bg-stone-200'}`}
                        style={{ top: `${guideLineTop}%` }}
                        onMouseDown={handleDividerMouseDown}
                        onClick={handleDividerClick}
                        onDoubleClick={toggleDividerLock}
                        title={isDividerLocked ? "Divider locked. Double-click to unlock." : "Drag to resize/mark. Double-click to lock."}
                      >
                        {isDividerLocked ? "🔒" : " "}
                      </div>
                    </div>

                    <div
                      className="relative h-full min-w-0 flex-1 overflow-hidden bg-black"
                      style={{ marginLeft: isPopupShifted ? "50px" : undefined }}
                    >
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 border-t-2 border-dashed border-amber-300/80 -translate-y-5"
                        style={{ top: `${guideLineTop}%` }}
                      />
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
