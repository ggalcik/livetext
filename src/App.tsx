import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { SingleWindow } from "./SingleWindow";
import { Accordion } from "./features/Accordion/Accordion";
import BannerAdmin from "./features/BannerAdmin/BannerAdmin";
import FontReference from "./components/FontReference/FontReference";
import Soundboard from "./components/Soundboard/Soundboard";
import Popup from "./features/Popup/Popup";

import { version } from '../package.json';

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
                  <div className="absolute top-4 right-4 border bg-white px-2">{ version }</div>
                    <Accordion label="fonts">
                      <FontReference />
                    </Accordion>

                    <Accordion label="sounds">
                      <Soundboard />
                    </Accordion>

                    <Accordion label="banners" startOpen={true}>
                      <BannerAdmin popupState={{ visiblePopup, setVisiblePopup }} />
                    </Accordion>
                  </>
                ) : (
                  <div className="p-10">another window opened, reload to yoink</div>
                )
              }
            />
          }
        />
        <Route path="/popup/:name?" element={<Popup/>} />
        {/* <Route path="/popup" element={<LiveTextPopup initialState={state} />} /> */}
        <Route path="/fonts" element={<FontReference />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
