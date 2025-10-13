import { useEffect, useState } from "react";
import { z } from "zod";
import workingData, {type IWorkingData} from "../workingData";

// Generic loader that infers T from the schema
function loadState<S extends z.ZodTypeAny>({
  storageKey,
  schema,
  fallback,
}: {
  storageKey: string;
  schema: S;
  fallback: z.infer<S>;
}): z.infer<S> {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      const res = schema.safeParse(parsed);
      if (res.success) return res.data;
      console.warn(`Invalid localStorage data for ${storageKey}`, res.error.format());
    }
  } catch (e) {
    console.warn(`Unable to load ${storageKey} from localStorage`, e);
  }

  if (workingData && workingData[storageKey as keyof IWorkingData]) {
    const res = schema.safeParse(workingData[storageKey as keyof IWorkingData]);
    if (res.success) return res.data;
    console.warn(`Invalid workingData for ${storageKey}`, res.error.format());
  }

  return fallback;
}

// Hook with persistence + cross-tab sync
export function usePersistentState<S extends z.ZodTypeAny>({
  storageKey,
  schema,
  fallback,
}: {
  storageKey: string;
  schema: S;
  fallback: z.infer<S>;
}) {
  const [state, setState] = useState<z.infer<S>>(() =>
    loadState({ storageKey, schema, fallback })
  );

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      console.warn(`Failed to save ${storageKey}`, e);
    }
  }, [state, storageKey]);

  // cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey || e.newValue == null) return;
      try {
        const parsed = JSON.parse(e.newValue);
        const res = schema.safeParse(parsed);
        if (res.success) setState(res.data);
        else console.warn(`Invalid storage update for ${storageKey}`, res.error.format());
      } catch (err) {
        console.warn(`Error parsing storage update for ${storageKey}`, err);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [schema, storageKey]);

  return [state, setState] as const;
}
