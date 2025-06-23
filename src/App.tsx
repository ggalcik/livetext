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
            <div className="grid h-[100vh] grid-cols-[var(--scene-width)_auto] grid-rows-[10vh_auto] gap-4">
              <div className="p-2">
                <div>
                  <input
                    className="w-4 cursor-pointer"
                    type="checkbox"
                    id="background/toggle"
                    checked={state.backgroundOn}
                    onChange={() => dispatch({ type: "background/toggle" })}
                  />{" "}
                  <label htmlFor="background/toggle" className="cursor-pointer">
                    bg -{" "}
                  </label>
                  <button className="text-blue-600 cursor-pointer" onClick={openPopup}>
                    [pop]
                  </button>
                  {" "} -

                  <input
                    className="w-4 cursor-pointer"
                    type="checkbox"
                    id="localStorage/toggle"
                    checked={state.saveToStorage}
                    onChange={() => dispatch({ type: "localStorage/toggle" })}
                  />{" "}
                  <label htmlFor="localStorage/toggle" className="cursor-pointer">
                    update pop
                  </label>

                </div>
              </div>
              <div className="p-2">
                <LiveTextOpts popupState={{visiblePopup, setVisiblePopup}}/>
              </div>

              <div className={clsx("p-4", { "bg-(--chromakey-color)": state.backgroundOn })}>
                <LiveText state={state} />
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
