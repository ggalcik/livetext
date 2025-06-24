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

function App() {
  const { state } = useLiveData();
  const [visiblePopup, setVisiblePopup] = useState<PopupState["visiblePopup"]>(null);
  // const [visiblePopup, setVisiblePopup] = useState<null | Record<"banner"|"spot", "default" | number>>(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid h-[100vh] grid-cols-2 grid-rows-[10vh_10vh_auto] gap-4 p-4">
              <div className="">banners</div>
              <div className="">spots</div>

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
