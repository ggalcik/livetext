import "./App.css";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { SingleWindow } from "./SingleWindow";
import OverlaysAccordion from "./features/OverlaysAccordion";
import ScenesAccordion from "./features/scenes/ScenesAccordion";
import { SceneDisplay } from "./features/scenes/SceneDisplay";
import { SceneAccordionDataSchema } from "./features/scenes/types";
import { usePersistentState } from "./hooks/usePersistentState";

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
  const dividerPendingDragRef = useRef(false);
  const [sceneAccordionData] = usePersistentState({
    storageKey: "SceneAccordion",
    schema: SceneAccordionDataSchema,
    fallback: { adminSelected: "banners", sceneSelected: "banners" },
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!splitPaneRef.current) return;
      if (!dividerPointerStartRef.current) return;

      const { x, y } = dividerPointerStartRef.current;
      const hasMovedEnough =
        Math.abs(event.clientX - x) > 3 || Math.abs(event.clientY - y) > 3;

      if (!hasMovedEnough) {
        return;
      }

      if (dividerPendingDragRef.current) {
        dividerPendingDragRef.current = false;
        dividerDidDragRef.current = true;
        setIsDraggingDivider(true);
      }

      const bounds = splitPaneRef.current.getBoundingClientRect();
      const nextWidth = ((bounds.right - event.clientX) / bounds.width) * 100;
      const nextGuideLineTop = ((event.clientY - bounds.top) / bounds.height) * 100;
      const clampedWidth = Math.min(80, Math.max(20, nextWidth));
      const clampedGuideLineTop = Math.min(95, Math.max(5, nextGuideLineTop));
      setAdminWidth(clampedWidth);
      setGuideLineTop(clampedGuideLineTop);
    };

    const stopDragging = () => {
      dividerPendingDragRef.current = false;
      setIsDraggingDivider(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  useEffect(() => {
    if (!isDraggingDivider) {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      return;
    }

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
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
    dividerPendingDragRef.current = true;
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
      dividerPendingDragRef.current = false;
      return;
    }

    dividerClickTimeoutRef.current = window.setTimeout(() => {
      setIsPopupShifted((previous) => !previous);
      dividerPointerStartRef.current = null;
      dividerPendingDragRef.current = false;
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
    dividerPendingDragRef.current = false;
    setIsDraggingDivider(false);
    setIsDividerLocked((previous) => !previous);
  }

  return (
    <SingleWindow
      render={(isActive) =>
        isActive ? (
          <div ref={splitPaneRef} className="flex h-screen overflow-hidden bg-gray-900">
            <div
              className="relative h-full min-w-0 flex-1 overflow-hidden bg-black"
              style={{ marginRight: isPopupShifted ? "50px" : undefined }}
            >
              <div
                className="pointer-events-none absolute left-0 right-0 z-20 border-t-2 border-dashed border-amber-300/80 -translate-y-5 opacity-40"
                style={{ top: `${guideLineTop}%` }}
              />
              <SceneDisplay sceneName={sceneAccordionData.sceneSelected} embedded />
            </div>

            <div className="relative h-full w-0 shrink-0">
              <div
                className={`absolute z-30 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border-2 border-stone-700 bg-stone-300 text-lg shadow-md select-none
                  ${isDividerLocked
                    ? "cursor-not-allowed bg-stone-600"
                    : "cursor-move bg-stone-300 hover:bg-stone-200"}`}
                style={{ top: `${guideLineTop}%` }}
                onMouseDown={handleDividerMouseDown}
                onClick={handleDividerClick}
                onDoubleClick={toggleDividerLock}
                title={isDividerLocked ? "Divider locked. Double-click to unlock." : "Drag to resize/mark. Double-click to lock."}
              >
                {isDividerLocked ? "L" : " "}
              </div>
            </div>

            <div
              className="relative h-full shrink-0 overflow-auto bg-white"
              style={{ width: `${adminWidth}%` }}
            >
              <OverlaysAccordion />
              <ScenesAccordion popupState={{ visiblePopup, setVisiblePopup }} />
            </div>
          </div>
        ) : (
          <div className="p-10">another window opened, reload to yoink</div>
        )
      }
    />
  );
}

export default App;
