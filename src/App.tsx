// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import BannersEdit from "./BannersEdit";
import { useLiveData } from "./context/LiveData/LiveDataContext";

import LiveTextOpts from "./LiveTextOpts";
import LiveTextPopup from "./LiveTextPopup";
import { useState } from "react";
import SpotsOpts from "./features/Spots/SpotsOpts";
import SpotsEdit from "./features/Spots/SpotsEdit";
import type { PopupState } from "./context/LiveData/types";
import clsx from "clsx";
import RotateCountdownTest from "./t1x";

function App() {
  const { state, dispatch } = useLiveData();
  const [visiblePopup, setVisiblePopup] = useState<PopupState["visiblePopup"]>(null);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className=" grid h-[100vh] grid-cols-2 grid-rows-[10vh_10vh_auto] gap-4 p-4">
              <div className="grid  grid-cols-[6fr_1fr] gap-2">
                <button
                  className={clsx("px-3 py-1 rounded-2xl border cursor-pointer", {
                    "bg-blue-600 text-white border-blue-600": state.displayBanners,

                    "bg-white text-gray-800 border-gray-400 hover:bg-gray-100":
                      !state.displayBanners,
                  })}
                  onClick={() => dispatch({ type: "banner/toggle" })}
                >
                  banners
                </button>
                <button
                  className={clsx(
                    "px-3 py-1 rounded-2xl border cursor-pointer",

                    "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
                  )}
                  onClick={() => dispatch({ type: "banner/solo" })}
                >
                  solo
                </button>
              </div>

              <div className="grid  grid-cols-[6fr_1fr] gap-2">
                <button
                  className={clsx("px-3 py-1 rounded-2xl border cursor-pointer", {
                    "bg-blue-600 text-white border-blue-600": state.displaySpots,

                    "bg-white text-gray-800 border-gray-400 hover:bg-gray-100": !state.displaySpots,
                  })}
                  onClick={() => dispatch({ type: "spot/toggle" })}
                >
                  spots
                </button>
                <button
                  className={clsx(
                    "px-3 py-1 rounded-2xl border cursor-pointer",

                    "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
                  )}
                  onClick={() => dispatch({ type: "spot/solo" })}
                >
                  solo
                </button>
              </div>
              <div className="">
                <LiveTextOpts popupState={{ visiblePopup, setVisiblePopup }} />
              </div>
              <div className="">
                <SpotsOpts popupState={{ visiblePopup, setVisiblePopup }} />
              </div>

              <div className="">
                <BannersEdit popupState={{ visiblePopup, setVisiblePopup }} />
              </div>
              <div className="">
                <SpotsEdit popupState={{ visiblePopup, setVisiblePopup }} />
              </div>
            </div>
          }
        />
        <Route path="/popup" element={<LiveTextPopup initialState={state} />} />
        <Route path="/t1x" element={<RotateCountdownTest  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
