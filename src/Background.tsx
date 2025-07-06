import Angry from "./assets/angry_atheist.png";
import Dull from "./assets/dull_atheist.jpg";
import DullAtheistAgnostic from "./assets/dull_atheist_agnostic.jpg";
import DullHell from "./assets/dull_hell.jpg";
import DullNotAtheist from "./assets/dull_not_an_atheist.jpg";
import DullTheQuestion from "./assets/dull_the_question.jpg";
import DullUncaused from "./assets/dull_uncaused.jpg";
import DullWatchmaker from "./assets/dull_watchmaker.jpg";
import DullAsleep from "./assets/dull_asleep.jpg";

import type { BackgroundType } from "./context/LiveData/types";
import clsx from "clsx";

const backgroundMap: Record<BackgroundType, string> = {
  "": "", // Or a fallback image path
  "Angry": Angry,
  "Dull": Dull,
  "Dull atheist agnostic": DullAtheistAgnostic,
  "Dull going to hell": DullHell,
  "Dull not an atheist": DullNotAtheist,
  "Dull The Question": DullTheQuestion,
  "Dull uncaused cause": DullUncaused,
  "Dull watchmaker": DullWatchmaker,
  "Dull asleep": DullAsleep,
};

interface BackgroundProps {
  which: BackgroundType;
}

export default function Background({ which }: BackgroundProps) {
  return (
    <img className={clsx("px-10 pt-30", { "mt-[-50px]": which.startsWith("Dull") })} src={backgroundMap[which]} />
  );
}
