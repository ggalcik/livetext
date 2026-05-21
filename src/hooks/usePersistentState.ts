import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import workingData, { type IWorkingData } from "../workingData";
import type { PersistentDataKey } from "./types";
import glog from "../components/glog";
import { addPersistentStateListener, dispatchPersistentStateEvent } from "./persistentEvents";

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
  const instanceIdRef = useRef(`${storageKey}-${Math.random().toString(36).slice(2)}`);
  const syncOriginRef = useRef<"local" | "external" | null>(null);
  const hasMountedRef = useRef(false);

  /**
   * Single, safe update path:
   * - Always compute `next` from the real `prev` inside the state updater (avoids stale closure issues).
   * - Mark the update origin so persistence can happen after React commits.
   */
  const setState = (update: State | ((prev: State) => State)) => {
    syncOriginRef.current = "local";

    _setState(prev => {
      const next =
        typeof update === "function"
          ? (update as (p: State) => State)(prev)
          : update;

      glog.ups(`[${storageKey}] setState`, { prev, next });

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
    const applySerializedState = (serializedState: string) => {
      try {
        const parsed: unknown = JSON.parse(serializedState);
        const res = schema.safeParse(parsed);

        if (!res.success) {
          console.warn(`Invalid storage update for ${storageKey}`, res.error.format());
          return;
        }

        syncOriginRef.current = "external";
        _setState(res.data);

        glog.ups(`[${storageKey}] storage sync applied`, { next: res.data });
      } catch (err) {
        console.warn(`Error parsing storage update for ${storageKey}`, err);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey || e.newValue == null) return;
      applySerializedState(e.newValue);
    };

    const removePersistentListener = addPersistentStateListener((detail) => {
      if (detail.key !== storageKey || detail.sourceId === instanceIdRef.current) return;
      applySerializedState(detail.newValue);
    });

    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      removePersistentListener();
    };
  }, [schema, storageKey]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      syncOriginRef.current = null;
      return;
    }

    if (syncOriginRef.current !== "local") {
      syncOriginRef.current = null;
      return;
    }

    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(storageKey, serialized);
      dispatchPersistentStateEvent({
        key: storageKey,
        newValue: serialized,
        sourceId: instanceIdRef.current,
      });
    } catch (e) {
      console.warn(`Failed to save ${storageKey}`, e);
    } finally {
      syncOriginRef.current = null;
    }
  }, [state, storageKey]);

  if (dispatch) {
    return [state, setState, { dispatch }] as const;
  }
  return [state, setState] as const;
}
