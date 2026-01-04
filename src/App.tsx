import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { SingleWindow } from "./SingleWindow";
import { Accordion } from "./features/Accordion/Accordion";
import FontReference from "./features/FontReference/FontReference";
import Soundboard from "./features/Soundboard/Soundboard";

import { version } from '../package.json';
import ScenesAccordion from "./features/scenes/ScenesAccordion";
import PopupScene from "./features/Popup/PopupScene";
import Data from "./features/Data/Data";
import OverlaysAccordion from "./features/scenes/OverlaysAccordion";

function App() {

  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);

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
                    <div className="absolute top-4 right-4 border bg-white px-2">{version}</div>
                    {/* <Accordion label="fonts">
                      <FontReference />
                    </Accordion>

                    <Accordion label="data">
                      <Data />
                    </Accordion>

                    <Accordion label="sounds">
                      <Soundboard />
                    </Accordion> */}

<OverlaysAccordion />
                    <ScenesAccordion popupState={{ visiblePopup, setVisiblePopup }} />

                  </>
                ) : (
                  <div className="p-10">another window opened, reload to yoink</div>
                )
              }
            />
          }
        />
        <Route path="/popup/:name?" element={<PopupScene />} />
        {/* <Route path="/popup" element={<LiveTextPopup initialState={state} />} /> */}
        <Route path="/fonts" element={<FontReference />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
