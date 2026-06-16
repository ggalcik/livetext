import Blip from "../Blip/Blip";
import VidclipDisplay from "../Vidclips/VidclipDisplay";
import Counter from "./Counter/Counter";
import Evolution from "./Evolution/Evolution";
import LiveTextPopup from "./LiveDisplay/LiveTextPopup";
import Intonation from "./Intonation/Intonation";
import Panels from "./Panels/Panels";
import Philbronium from "./Philbronium/Philbronium";
import Slides from "./Slides/Slides";
import type { SceneType } from "./types";
import Video from "./Video/Video";
import WhoWantsTo from "./WhoWantsTo/WhoWantsTo";

export function SceneDisplay({
  sceneName,
  embedded = false,
}: {
  sceneName: SceneType;
  embedded?: boolean;
}) {
  return (
    <>
      <div className="absolute h-full w-full bg-black">
        {sceneName === "banners" && <LiveTextPopup embedded={embedded} />}
        {sceneName === "philbronium" && <Philbronium controls />}
        {sceneName === "video" && <Video />}
        {sceneName === "slides" && <Slides />}
        {sceneName === "evolution" && <Evolution />}
        {sceneName === "counter" && <Counter />}
        {sceneName === "panels" && <Panels />}
        {sceneName === "whowants" && <WhoWantsTo />}
        {sceneName === "intonation" && <Intonation />}
      </div>
      <VidclipDisplay />
      <Blip />
    </>
  );
}
