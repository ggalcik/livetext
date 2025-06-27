import { useEffect, useState } from "react";
import LiveText from "./LiveText";
import "./LiveTextPopup.css";
import type { LiveDataState } from "./context/LiveData/types";

export default function LiveTextPopup({ initialState }: { initialState: LiveDataState }) {
  const [state, setState] = useState<LiveDataState>(initialState);

  useEffect(() => {
    // Add class on mount
    document.body.classList.add("popup");
    // Listen for localStorage updates
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "liveData") return;
      try {
        const newState = JSON.parse(event.newValue || "");
        setState(newState);
      } catch {
        console.warn("Invalid JSON in LiveData localStorage");
      }
    };

    window.addEventListener("storage", handleStorage);
    document.title = "Live text popup";
    // Clean up
    return () => {
      document.body.classList.remove("popup");
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    // <div className="bg-(--chromakey-color) h-full">
    <div className="h-full">
      <LiveText state={state} />
    </div>
  );
}
