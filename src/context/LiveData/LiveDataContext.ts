import { createContext, useContext } from "react";
import type { LiveDataState, LiveDataAction } from "./types";

export const LiveDataContext = createContext<
  | {
      state: LiveDataState;
      dispatch: React.Dispatch<LiveDataAction>;
    }
  | undefined
>(undefined);

export function useLiveData() {
  const context = useContext(LiveDataContext);
  if (!context) {
    throw new Error("useLiveData must be used within a LiveDataProvider");
  }
  return context;
}
