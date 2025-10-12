import Angry from "../../../assets/angry_atheist.png";
import Dull from "../../../assets/dull_atheist.jpg";
import DullAtheistAgnostic from "../../../assets/dull_atheist_agnostic.jpg";
import DullHell from "../../../assets/dull_hell.jpg";
import DullNotAtheist from "../../../assets/dull_not_an_atheist.jpg";
import DullTheQuestion from "../../../assets/dull_the_question.jpg";
import DullUncaused from "../../../assets/dull_uncaused.jpg";
import DullWatchmaker from "../../../assets/dull_watchmaker.jpg";
import DullAsleep from "../../../assets/dull_asleep.jpg";
import IntoJesus from "../../../assets/into_jesus.jpg";
import Trolley from "../../../assets/trolley.jpg";
import Quadrant from "../../../assets/quadrant.png";

import type { BackgroundType } from "../../../context/LiveData/types";
import { useRandomSet } from "../../../hooks/useRandomSet";
import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import glog from "../../../components/glog";

const backgroundMap: Record<BackgroundType, string> = {
  "": "",
  "Angry": Angry,
  "Dull": Dull,
  "Dull atheist agnostic": DullAtheistAgnostic,
  "Dull going to hell": DullHell,
  "Dull not an atheist": DullNotAtheist,
  "Dull The Question": DullTheQuestion,
  "Dull uncaused cause": DullUncaused,
  "Dull watchmaker": DullWatchmaker,
  "Dull asleep": DullAsleep,
  "Into Jesus": IntoJesus,
  "Trolley problem": Trolley,
  "Quadrant": Quadrant
};

const baseClass =
  "absolute font-[Impact] text-red-300 animate-pulse text-2xl text-shadow-lg/80";

const tssx = <div className="leading-normal text-red-800"></div>;


const angerData = [
  ["So angry!!", "top-0 right-0 rotate-10"],
  ["grrr!", "top-5 right-25 -rotate-10"],
  ["Grrr!", "-top-5 left-5 -rotate-10"],
  ["Grrr!", "top-6 left-5 rotate-10"],
  ["Arrgh!", "top-1/2 left-2 -rotate-6"],
  ["Grrr!", "bottom-10 left-2 -rotate-10"],
  ["Beware my great danger!!", "bottom-10 right-0 w-40 leading-6 text-center rotate-6"],
  ["Atheism!!", "left-3/12 -top-2 -rotate-6 "],
  ["Greg!!", "left-3/12 top-1/12 rotate-6 "],
  ["ANGRY!!!", "right-0 top-1/4 rotate-6 text-6xl text-red-200 "],
  ["ATHEIST!!!", "right-10 top-5/12 -rotate-6 text-4xl text-red-200 "],
  ["agnostic!!!!!", "left-3/12 top-1/2  rotate-12  text-red-200 "],
  ["No YOU are hell!!", "bottom-10 rotate-2 left-1/4 "],

]
const angerBits = angerData.map((d, i) => (
  <div className={twMerge(baseClass, d[1])}> {d[0]}</div>
));


interface BackgroundProps {
  which: BackgroundType;
  showAngerBits: boolean;
}



export default function Background({ which, showAngerBits }: BackgroundProps) {
  const numberSet = useRandomSet(showAngerBits,
    {
      minNumbers: 1,
      maxNumbers: 3,
      numberMax: angerBits.length - 1
    });

  //  glog("numberSet", numberSet, "angerBits.length", angerBits.length);
  return (
    <div className="absolute bottom-0 text-white">

      <img className="" src={backgroundMap[which]} />
      {numberSet.length > 0 &&

        numberSet.map((bitNum) =>
          React.cloneElement(angerBits[bitNum], { key: bitNum })
        )
      }
    </div>
  );
}
