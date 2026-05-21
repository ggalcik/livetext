import { useEffect, useState } from "react";
import LiveText from "./LiveText";
import {  type LiveDataState } from "../../../context/LiveData/types";
import { loadInitialState } from "../../../context/LiveData/LiveDataReducer";
import glog from "../../../components/glog";
import { addPersistentStateListener } from "../../../hooks/persistentEvents";

export default function LiveTextPopup({ embedded = false }: { embedded?: boolean }) {
  const [state, setState] = useState<LiveDataState>(loadInitialState());

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


  return  <LiveText state={state} />;

}
