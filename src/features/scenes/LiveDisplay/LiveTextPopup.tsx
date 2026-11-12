import { useEffect, useState } from "react";
import LiveText from "./LiveText";
import {  type LiveDataState } from "../../../context/LiveData/types";
import { loadInitialState } from "../../../context/LiveData/LiveDataReducer";
import { addPersistentStateListener } from "../../../hooks/persistentEvents";
import { useBannerPlayback } from "./useBannerPlayback";
import { useObsBannerOutput } from "./useObsBannerOutput";
import { useLiveData } from "../../../context/LiveData";

export default function LiveTextPopup({ embedded = false, active = true }: { embedded?: boolean; active?: boolean }) {
  const [state, setState] = useState<LiveDataState>(loadInitialState());
  const { state: adminState } = useLiveData();
  const playback = useBannerPlayback(embedded ? adminState : state, active);
  useObsBannerOutput(playback, active, embedded);

  useEffect(() => {
    const applySerializedState = (serializedState: string) => {
      try {
        const newState = JSON.parse(serializedState);
        setState(newState);
      } catch {
        console.warn("Invalid JSON in LiveData localStorage");
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "liveData" || event.newValue == null) return;
      applySerializedState(event.newValue);
    };

    const removePersistentListener = addPersistentStateListener((detail) => {
      if (detail.key !== "liveData") return;
      applySerializedState(detail.newValue);
    });

    window.addEventListener("storage", handleStorage);
    if (!embedded) {
      document.title = "Live text";
    }
   
    return () => {
      document.body.classList.remove("popup");
      window.removeEventListener("storage", handleStorage);
      removePersistentListener();
    };
  }, [embedded]);


  return active && !playback.obsVisible ? <LiveText state={playback} /> : null;

}
