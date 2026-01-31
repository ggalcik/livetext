import { useEffect, useRef, useState } from "react";
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
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
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

  const wd = workingData?.[storageKey as keyof IWorkingData] as unknown;
  if (wd != null) {
    const res = schema.safeParse(wd);
    if (res.success) {
      glog.ups(`[${storageKey}] loadState from workingData?`, { data: res.data });
      return res.data;
    }
    console.warn(`Invalid workingData for ${storageKey}`, res.error.format());
  }

  return fallback;
}

type Reducer<State, Action> = (state: State, action: Action) => State;

// ---------- overloads (no outside changes required) ----------
export function usePersistentState<S extends z.ZodTypeAny>(args: {
  storageKey: PersistentDataKey;
  schema: S;
  fallback: z.infer<S>;
}): readonly [
  z.infer<S>,
  (update: z.infer<S> | ((prev: z.infer<S>) => z.infer<S>)) => void
];

export function usePersistentState<
  S extends z.ZodTypeAny,
  A extends { type: string }
>(args: {
  storageKey: PersistentDataKey;
  schema: S;
  fallback: z.infer<S>;
  reducer: Reducer<z.infer<S>, A>;
}): readonly [
  z.infer<S>,
  (update: z.infer<S> | ((prev: z.infer<S>) => z.infer<S>)) => void,
  { dispatch: (action: A) => void }
];

// ---------- implementation ----------
export function usePersistentState<
  S extends z.ZodTypeAny,
  A extends { type: string }
>({
  storageKey,
  schema,
  fallback,
  reducer,
}: {
  storageKey: PersistentDataKey;
  schema: S;
  fallback: z.infer<S>;
  reducer?: Reducer<z.infer<S>, A>;
}) {
  type State = z.infer<S>;

  const [state, _setState] = useState<State>(() =>
    loadState({ storageKey, schema, fallback })
  );

  // Prevent write-back when state is being updated due to a cross-tab storage event.
  const skipNextPersistRef = useRef(false);

  /**
   * Single, safe update path:
   * - Always compute `next` from the real `prev` inside the state updater (avoids stale closure issues).
   * - Write to localStorage immediately *here* (preserves your "commit now" behavior).
   * - Optionally skip that write if the update came from cross-tab sync.
   */
  const setState = (update: State | ((prev: State) => State)) => {
    _setState(prev => {
      const next =
        typeof update === "function"
          ? (update as (p: State) => State)(prev)
          : update;

      glog.ups(`[${storageKey}] setState`, { prev, next });

      if (!skipNextPersistRef.current) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (e) {
          console.warn(`Failed to save ${storageKey}`, e);
        }
      } else {
        // consume the skip
        skipNextPersistRef.current = false;
      }

      return next;
    });
  };

  const dispatch = reducer
    ? (action: A) => {
        setState(prev => {
          const next = reducer(prev, action);
          glog.ups(`[${storageKey}] dispatch`, { action, prev, next });
          return next;
        });
      }
    : undefined;

  // cross-tab sync (IMPORTANT: do not call setState here, or you'd write-back and can cause churn)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey || e.newValue == null) return;

      try {
        const parsed: unknown = JSON.parse(e.newValue);
        const res = schema.safeParse(parsed);

        if (!res.success) {
          console.warn(`Invalid storage update for ${storageKey}`, res.error.format());
          return;
        }

        // Update state from other tab WITHOUT writing it back.
        skipNextPersistRef.current = true;
        _setState(res.data);

        glog.ups(`[${storageKey}] storage sync applied`, { next: res.data });
      } catch (err) {
        console.warn(`Error parsing storage update for ${storageKey}`, err);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [schema, storageKey]);

  if (dispatch) {
    return [state, setState, { dispatch }] as const;
  }
  return [state, setState] as const;
}
