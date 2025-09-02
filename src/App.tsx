// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import BannersEdit from "./BannersEdit";
import { useLiveData } from "./context/LiveData/LiveDataContext";

import LiveTextOpts from "./features/LiveDisplay/LiveTextOpts";
import LiveTextPopup from "./features/LiveDisplay/LiveTextPopup";
import { useState } from "react";
import SpotsOpts from "./features/Spots/SpotsOpts";
import SpotsEdit from "./features/Spots/SpotsEdit";
import { backgroundOptions } from "./context/LiveData/types";
import type { BackgroundType, PopupState } from "./context/LiveData/types";
import TopOpts from "./TopOpts";
import { SingleWindow } from "./SingleWindow";
import { Accordion } from "./features/Accordion/Accordion";
import { GlobalOpts } from "./features/GlobalOpts/GlobalOpts";

function App() {
  const { state, dispatch } = useLiveData();
  const [visiblePopup, setVisiblePopup] = useState<PopupState["visiblePopup"]>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SingleWindow
              render={(isActive) =>
                isActive ? (
                  <>
                    <Accordion label="global">
                      <GlobalOpts/>
                    </Accordion>
                    <Accordion label="banners" startOpen={true}>
                      <div className=" grid h-[100vh] grid-cols-1 md:grid-cols-2 grid-rows-[10vh_10vh_auto] gap-4 p-4">
                        <TopOpts />
                        <div className="h-32">
                          <LiveTextOpts popupState={{ visiblePopup, setVisiblePopup }} />
                        </div>
                        <div className="">
                          <SpotsOpts popupState={{ visiblePopup, setVisiblePopup }} />
                        </div>

                        <div className="">
                          <BannersEdit popupState={{ visiblePopup, setVisiblePopup }} />
                          <div>
                            <div>Backgrounds:</div>
                            <div className="columns-2">
                              {backgroundOptions.map((item) => {
                                const name = `background_image_${item}`;
                                return (
                                  <div key={name} className="flex pb-2 gap-2">
                                    <input
                                      className="w-8 h-8"
                                      type="radio"
                                      id={name}
                                      value={item}
                                      checked={state.backgroundImage === item}
                                      onChange={(e) => {
                                        dispatch({
                                          type: "background/change",
                                          payload: { which: e.target.value as BackgroundType },
                                        })
                                      }
                                      }
                                    />{" "}
                                    <label htmlFor={name} className="cursor-pointer">
                                      {item}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <SpotsEdit popupState={{ visiblePopup, setVisiblePopup }} />
                        </div>
                      </div>
                    </Accordion>
                  </>
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
