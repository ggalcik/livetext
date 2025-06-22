import React, { useReducer } from "react";
import { LiveDataContext } from "./LiveDataContext";
import { liveDataReducerPersistence, loadInitialState } from "./LiveDataReducer";

export function LiveDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(liveDataReducerPersistence, loadInitialState());

  return (
    <LiveDataContext.Provider value={{ state, dispatch }}>
      {children}
    </LiveDataContext.Provider>
  );
}