import { useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

export default function Evolution() {
    const [value, setValue] = useState(1);

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
            <MasterViewport name={"evolution"}>
<div className="w-full h-full">

                <div
                    style={{ backgroundColor: hexColor, width: 200, height: 200 }}
                    className="border"
                    />
                    </div>
            </MasterViewport>
        <div className="absolute top-20 left-4 text-white">
            {/* 1) Slider */}
            <input
                type="range"
                min={1}
                max={256}
                value={value}
                onChange={handleChange}
                />

            {/* 2) Back/forward buttons */}
            <div className="flex gap-2">
                <button onClick={handleBack} className="px-2 py-1 border rounded">
                    Back
                </button>
                <button onClick={handleForward} className="px-2 py-1 border rounded">
                    Forward
                </button>
            </div>

            {/* 3) Current value */}
            <div>Current value: {value}</div>

            {/* 4) Edge labels */}
            <div>{value === 1 && "red"}</div>
            <div>{value === 256 && "blue"}</div>

            {/* 5) Computed hex */}
            <div>Hex color: {hexColor}</div>

            {/* 6) Color square */}
        </div>
                </>
    );
}
