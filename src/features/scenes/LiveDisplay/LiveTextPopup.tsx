import { useEffect, useState } from "react";
import LiveText from "./LiveText";
import { makeInitialLiveDataState, type LiveDataState } from "../../../context/LiveData/types";

export default function LiveTextPopup() {
  const [state, setState] = useState<LiveDataState>(makeInitialLiveDataState());

  useEffect(() => {
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
    document.title = "Live text";
    // Clean up
    return () => {
      document.body.classList.remove("popup");
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return  <LiveText state={state} />;

}
