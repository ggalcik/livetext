import { angerData } from "./angerData";
import Angry from "../../../assets/angry_atheist.png";
import Christlessmas from "../../../assets/christlessmas.jpg";
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
import {gGlobal} from "../../Global/global";
import './Background.css';

import AngerMini from "../../../assets/angry_atheist_sm_2.jpg";

import type { BackgroundType } from "../../../context/LiveData/types";
import { useRandomSet } from "../../../hooks/useRandomSet";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const backgroundMap: Record<BackgroundType, string> = {
  "": "",
  "Angry": Angry,
  "Christlessmas": Christlessmas,
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

const angerBits = angerData.map((d) => (
  <div className={twMerge(baseClass, d[1])}> {d[0]}</div>
));


interface BackgroundProps {
  which: BackgroundType;
  showAngerBits: boolean;
  altBackground: boolean;
}



export default function Background({ which, showAngerBits, altBackground }: BackgroundProps) {
  const showAll = false;
  const numberSet = showAll ? Array.from(Array(angerBits.length).keys()) : useRandomSet(showAngerBits, {
    minNumbers: 1,
    maxNumbers: 3,
    numberMax: angerBits.length - 1,
  });

  const altRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const activeRef = altBackground ? altRef : mainRef;

  const miniStyle = gGlobal.layout.crampedPortrait 
    ? 'text-white absolute -top-54 scale-50 '
    : 'text-white absolute -top-80 scale-100 animate-bobzoom';

  return (
    <SwitchTransition>
      <CSSTransition
        key={altBackground ? "alt" : `main-${which}`} // key drives the swap
        timeout={300}
        classNames="fade"
         nodeRef={activeRef}
      >
        {altBackground ? ( 
          gGlobal.layout.crampedPortrait ? <div></div> : 
           <div ref={altRef} className={miniStyle}>
             <img src={AngerMini} />
           </div>
        ) : ( // TODO - crampedPortrait
          <div ref={mainRef} className="absolute -bottom-1/4 text-white">
            <img src={backgroundMap[which]} />
            {numberSet.length > 0 &&
              numberSet.map((bitNum) =>
                React.cloneElement(angerBits[bitNum], { key: bitNum })
              )}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}
