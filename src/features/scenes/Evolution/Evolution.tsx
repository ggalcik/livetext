import { useRef, useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

const STEPS = 256;
const DEFAULT_RED = [1];
const DEFAULT_BLUE = [256];
const DEFAULT_MARKS = { red: DEFAULT_RED, blue: DEFAULT_BLUE };
const markText = { red: ['red', 'non-human'], blue: ['blue', 'human'] };


export default function Evolution() {
    const [value, setValue] = useState(1);
    const [showPanelNumber, setShowPanelNumber] = useState(false);
    const [showCodeNumber, setShowCodeNumber] = useState(false);
    const [showMarks, setShowMarks] = useState(true);
    const [markIsColor, setMarkIsColor] = useState(true);
    const [marks, setMarks] = useState(DEFAULT_MARKS);


    // refs for timers
    const timeoutRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);

    const clamp = (n: number) => Math.min(256, Math.max(1, n));
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(clamp(Number(e.target.value)));
    };
    const handleIncrement = (inc: number) =>
        setValue((v) => clamp(v + inc));

    // clear timers on release/leave
    const clearTimers = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const startHold = (inc: number) => {
        handleIncrement(inc); // immediate click
        timeoutRef.current = window.setTimeout(() => {
            intervalRef.current = window.setInterval(() => {
                handleIncrement(inc);
            }, 20); // repeat every 20ms
        }, 500); // wait 500ms
    };

    const redHex = (256 - value).toString(16).padStart(2, "0");
    const blueHex = (value - 1).toString(16).padStart(2, "0");
    const hexColor = `#${redHex}00${blueHex}`;

    const toggleMark = (type: 'red'|'blue', val: number): void => {
        const newMarks = { ...marks };
        if (newMarks[type].includes(val)) {
            newMarks[type] = newMarks[type].filter(mark => mark != val);
        } else {newMarks[type].push(val)}
        setMarks(newMarks);
    }


return (
    <>
        <MasterViewport name={"evolution"} needCtrl>
            <div className="w-full h-full relative">
                <div
                    style={{ backgroundColor: hexColor }}
                    className="absolute aspect-square w-full max-w-full font-[OCR_A]"
                >
                    <div
                        className={`absolute ${showPanelNumber ? "text-white" : "text-black"
                            } w-full -top-20 text-center text-[50px] cursor-pointer`}
                    >
                        #{value}
                    </div>
                    {showMarks && marks.red.includes(value) && (
                        <div className="absolute text-white w-full top-30 text-center text-[50px] ">
                            {markText['red'][markIsColor ? 0 : 1]}
                        </div>
                    )}
                    {showMarks && marks.blue.includes(value) && (
                        <div className="absolute text-white w-full top-30 text-center text-[50px] ">
                            {markText['blue'][markIsColor ? 0 : 1]}
                        </div>
                    )}
                    {showCodeNumber && (
                        <div className="absolute text-3xl text-white w-full top-4 text-center">
                            {hexColor}
                        </div>
                    )}
                </div>
            </div>
        </MasterViewport>

        <div className="flex absolute top-0 left-0 w-full box-border p-4 ">

            <div className="flex-1 text-white flex items-center justify-center">

                <div className="w-24 relative text-center">
                    <div
                        className={` inline-block px-2 ${showPanelNumber && "bg-blue-700"
                            } cursor-pointer`}
                        onClick={() => setShowPanelNumber((p) => !p)}
                    >
                        number
                    </div>

                    <div className="relative border w-full aspect-square">
                        <div
                            className={`absolute top-0 left-1/2 -translate-x-1/2  text-center inline-block px-2 ${showCodeNumber && "bg-blue-700"
                                } cursor-pointer`}
                            onClick={() => setShowCodeNumber((p) => !p)}
                        >
                            code
                        </div>
                        <div
                            className={`absolute top-3/8 left-1/2 -translate-x-1/2  text-center inline-block px-2 ${showMarks && "bg-blue-700"
                                } cursor-pointer`}
                            onClick={() => setShowMarks((p) => !p)}
                        >
                            mark


                        </div>
                        <div className="absolute top-5/8 left-1/2 -translate-x-1/2  text-center px-2 flex w-1/2  cursor-pointer">
                            <div
                                className={`flex-1 ${markIsColor ? "bg-blue-700" : "bg-transparent"}`}
                                onClick={() => setMarkIsColor((p) => !p)}> c </div>
                            <div
                                className={`flex-1 ${!markIsColor ? "bg-blue-700" : "bg-transparent"}`}
                                onClick={() => setMarkIsColor((p) => !p)}> h </div>

                        </div>

                        <div className="absolute top-0 left-0 -translate-x-full">red
                            <div
                                className={` px-4 p-2 cursor-pointer border border-gray-300 ${marks['red'].includes(value) ? "bg-blue-700" : "bg-transparent"}`}
                                onClick={() => toggleMark('red', value)}> mark </div>
                        </div>
                        <div className="absolute top-0 right-0 translate-x-full">blue
                            <div
                                className={`  px-4 p-2 cursor-pointer border border-gray-300 ${marks['blue'].includes(value) ? "bg-blue-700" : "bg-transparent"}`}
                                onClick={() => toggleMark('blue', value)}> mark </div>
                        </div>


                    </div>


                </div>

                        <div className="absolute -bottom-4  cursor-pointer">
                            <div
                                className={`  px-4 p-2 `}
                                onClick={() => setMarks(DEFAULT_MARKS)}> clear marks </div>

                        </div>                           

            </div>


            <div className="flex-1  text-white">

                <input
                    className="w-full"
                    type="range"
                    min={1}
                    max={256}
                    value={value}
                    onChange={handleChange}
                />
                <div className="flex text-white justify-between">



                    <div className="flex gap-2 justify-end">
                        <button
                            className="px-2 py-1 border rounded"
                            onMouseDown={() => startHold(-1)}
                            onMouseUp={clearTimers}
                            onMouseLeave={clearTimers}
                        >
                            Back
                        </button>
                        <button
                            className="px-2 py-1 border rounded"
                            onMouseDown={() => startHold(1)}
                            onMouseUp={clearTimers}
                            onMouseLeave={clearTimers}
                        >
                            Forward
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </>
);
}

