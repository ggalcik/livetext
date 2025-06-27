import { useReducer } from "react";
import { LiveDataContext } from "./context/LiveData/LiveDataContext";
import RotateCountdown from "./RotateCountdown";

type Timer = { on: boolean; paused: boolean };
type TimerKey = "timer" | "breakTimer";

interface TestState {
  timer: Timer;
  breakTimer: Timer;
}

type Action =
  | { type: `${TimerKey}/setPaused`; payload: { paused: boolean } };

const reducer = (state: TestState, action: Action): TestState => {
  const key = action.type.split("/")[0] as TimerKey;
  if (action.type.endsWith("/setPaused")) {
    return {
      ...state,
      [key]: { ...state[key], paused: action.payload.paused },
    };
  }
  return state;
};

const initialState: TestState = {
  timer: { on: true, paused: false },
  breakTimer: { on: true, paused: true },
};

export default function RotateCountdownTest() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LiveDataContext.Provider value={{ state, dispatch }}>
      <div className="space-y-4 p-4 border">
        <RotateCountdown timerKey="timer" />
        <RotateCountdown timerKey="breakTimer" />
      </div>
    </LiveDataContext.Provider>
  );
}
