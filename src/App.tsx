import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useLiveData } from "./context/LiveData/LiveDataContext";
import LiveTextPopup from "./features/LiveDisplay/LiveTextPopup";
import { useState } from "react";
import type { BackgroundType, PopupState } from "./context/LiveData/types";
import { SingleWindow } from "./SingleWindow";
import { Accordion } from "./features/Accordion/Accordion";
import BannerAdmin from "./features/BannerAdmin/BannerAdmin";


function App() {
  const { state } = useLiveData();
  const [visiblePopup, setVisiblePopup] = useState<string|null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SingleWindow
              render={(isActive) =>
                isActive ? (
                  <Accordion label="banners" startOpen={true}>
                    <BannerAdmin popupState={{ visiblePopup, setVisiblePopup }} />
                  </Accordion>
                ) : (
                  <div className="p-10">another window opened, reload to yoink</div>
                )
              }
            />
          }
        />
        <Route path="/popup" element={<LiveTextPopup initialState={state} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
