import { useEffect, useState } from "react";
import { z } from "zod";
import workingData, { type IWorkingData } from "../workingData";
import type { PersistentDataKey } from "./types";
import glog from "../components/glog";

// Generic loader that infers T from the schema
function loadState<S extends z.ZodTypeAny>({
  storageKey,
  schema,
  fallback,
}: {
  storageKey: PersistentDataKey;
  schema: S;
  fallback: z.infer<S>;
}): z.infer<S> {
  try {
    const stored = localStorage.getItem(storageKey);
    // glog.ups("loadState: stored: %o", stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      const res = schema.safeParse(parsed);
      if (res.success) {
        glog.ups(`[${storageKey}] loadState stored`, { data: res.data });
        return res.data;
      }
      console.warn(`Invalid localStorage data for ${storageKey}`, res.error.format());
    }
  } catch (e) {
    console.warn(`Unable to load ${storageKey} from localStorage`, e);
  }

  if (workingData && workingData[storageKey as keyof IWorkingData]) {
    const res = schema.safeParse(workingData[storageKey as keyof IWorkingData]);
    if (res.success) {
      glog.ups(`[${storageKey}] loadState from workingData?`, { data: res.data });
      return res.data;
    }

    console.warn(`Invalid workingData for ${storageKey}`, res.error.format());
  }

  return fallback;
}

export function usePersistentState<S extends z.ZodTypeAny>({
  storageKey,
  schema,
  fallback,
}: {
  storageKey: PersistentDataKey;
  schema: S;
  fallback: z.infer<S>;
}) {
  const [state, _setState] = useState<z.infer<S>>(() =>
    loadState({ storageKey, schema, fallback })
  );

  const setState = (update: z.infer<S> | ((prev: z.infer<S>) => z.infer<S>)) => {
    if (typeof update === "function") {
      _setState(prev => {
        const next = (update as (p: z.infer<S>) => z.infer<S>)(prev);
        glog.ups(`[${storageKey}] setState functional`, { prev, next });
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (e) {
          console.warn(`Failed to save ${storageKey}`, e);
        }
        return next;
      });
    } else {
      glog.ups(`[${storageKey}] setState value`, { prev: state, next: update });
      _setState(update);
      try {
        localStorage.setItem(storageKey, JSON.stringify(update));
      } catch (e) {
        console.warn(`Failed to save ${storageKey}`, e);
      }
    }
  };

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
