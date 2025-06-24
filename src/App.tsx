// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import clsx from "clsx";
import "./App.css";
import BannersEdit from "./BannersEdit";
import { useLiveData } from "./context/LiveData/LiveDataContext";
import LiveText from "./LiveText";
import LiveTextOpts from "./LiveTextOpts";
import LiveTextPopup from "./LiveTextPopup";
import { useState } from "react";

function App() {
  const { state, dispatch } = useLiveData();
  const [visiblePopup, setVisiblePopup] = useState<null|"default"|number>(null);
  
  const openPopup = () => {
    window.open(
      "/popup",
      "LiveTextPopup",
      "width=600,height=320,menubar=no,toolbar=no,location=no,status=no"
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid h-[100vh] grid-cols-1 grid-rows-[10vh_auto] gap-4">


        
              <div className="p-2">
                <LiveTextOpts popupState={{visiblePopup, setVisiblePopup}}/>
              </div>



              <div className="p-4">
                <BannersEdit popupState={{visiblePopup, setVisiblePopup}} />
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
