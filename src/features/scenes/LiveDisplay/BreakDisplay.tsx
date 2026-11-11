import angryGraphic from "../../../assets/angry_atheist.png";
import { useRandomSet } from "../../../hooks/useRandomSet";
import { twMerge } from "tailwind-merge";
import { angerData } from "./angerData";

export default function BreakDisplay() {
  const captions = useRandomSet(true, { minNumbers: 1, maxNumbers: 3, numberMax: angerData.length - 1 });
  return (
    <div className="relative w-full">
      <img src={angryGraphic} alt="Angry atheist" className="block w-full h-auto" />
      {captions.map(index => (
        <div key={index} className={twMerge(
          "absolute font-[Impact] text-red-300 animate-pulse text-2xl text-shadow-lg/80",
          angerData[index][1],
        )}>
          {angerData[index][0]}
        </div>
      ))}
    </div>
  );
}
