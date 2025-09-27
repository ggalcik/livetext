import { useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

const STEPS = 256;

export default function Evolution() {
    const [value, setValue] = useState(1);
    const thisColor = value === 1 ? 'red' :
        (value === STEPS ? 'blue' : '');

    // clamp value between 1 and 256
    const clamp = (n: number) => Math.min(256, Math.max(1, n));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(clamp(Number(e.target.value)));
    };

    const handleBack = () => setValue((v) => clamp(v - 1));
    const handleForward = () => setValue((v) => clamp(v + 1));

    // 5) computed hex color
    const redHex = (256 - value).toString(16).padStart(2, "0");
    const blueHex = (value - 1).toString(16).padStart(2, "0");
    const hexColor = `#${redHex}00${blueHex}`;

    return (
        <>
            <MasterViewport name={"evolution"} needCtrl>

                <div className="w-full h-full relative">
                    <div
                        style={{ backgroundColor: hexColor }}
                        className="absolute aspect-square w-full max-w-full  font-[OCR_A]"
                    >
                        <div className="absolute text-white w-full -top-20 text-center text-[50px] ">
                            #{value}
                        </div>
                        {thisColor != '' &&
                        <div className="absolute text-white w-full top-30 text-center text-[50px] ">
                            {thisColor}
                        </div>
}
                        <div className="absolute text-3xl text-white w-full top-4 text-center  ">
                            {hexColor}
                        </div>
                    </div>
                </div>


            </MasterViewport>

            <div className="absolute top-4 right-4 w-1/2  text-white">
                {/* 1) Slider */}
                <input
                className="w-full"
                    type="range"
                    min={1}
                    max={256}
                    value={value}
                    onChange={handleChange}
                />

                {/* 2) Back/forward buttons */}
                <div className="flex gap-2 justify-end">
                    <button onClick={handleBack} className="px-2 py-1 border rounded">
                        Back
                    </button>
                    <button onClick={handleForward} className="px-2 py-1 border rounded">
                        Forward
                    </button>
                </div>

                {/* <div>Current value: {value}</div>

                <div>{value === 1 && "red"}</div>
                <div>{value === 256 && "blue"}</div>

                <div>Hex color: {hexColor}</div> */}


            </div>
        </>
    );
}
