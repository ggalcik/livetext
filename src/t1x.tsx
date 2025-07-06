import { useReducer } from "react";
import { LiveDataContext } from "./context/LiveData/LiveDataContext";
import RotateCountdown from "./RotateCountdown";
import {initialLiveDataState} from './context/LiveData/LiveDataReducer';
import type { LiveDataState } from "./context/LiveData/types";


type TimerKey = "timer" | "breakTimer";



type Action =
  | { type: `${TimerKey}/setPaused`; payload:  boolean  };

const reducer = (state: LiveDataState, action: Action): LiveDataState => {
switch (action.type) {
    case "timer/setPaused":
  return {
    ...state,
    timer: {
      ...state.timer,
      paused: action.payload,
    },
  };

case "breakTimer/setPaused":
  return {
    ...state,
    breakTimer: {
      ...state.breakTimer,
      paused: action.payload,
    },
  };
default:
  return state;}
};


const initialState = {...initialLiveDataState, ...{
  timer: { on: true, interval:10, countdown: null, paused: false },
  breakTimer: { on: true, interval:10, countdown: null,paused: true },
}};

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
