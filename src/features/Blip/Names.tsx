import { useState } from "react";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { Button } from "../../components/Button";
import { gGlobal } from "../Global/global";
import { format } from "date-fns";
import { getDailyLineStyle, toDisplayDate } from "./helpers";

export default function Names() {
    const [confirmReset, setConfirmReset] = useState(false);
    const crampedStyle = gGlobal.layout.crampedPortrait;
    const [textValue, setTextValue] = useState("");

    function handleDayReset() {
        setConfirmReset(false);
    }

    const today = format(Date.now(), 'yyyyMMdd');
    const lines = textValue
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);


    return (
        <div className="absolute w-full h-full text-white">
            <MasterViewport name="blip_names">
                <div className="w-full h-full backdrop-blur-sm [container-type:size] text-center">

                    <div className="font-[Carter_One] border border-black inline-block shadow -rotate-2 p-4 text-center text-4xl bg-blue-800 text-amber-200">My favorite names today</div>
                    <div className="font-[Carter_One] border border-black inline-block shadow rotate-1 translate-x-[70%] -translate-y-[30%] p-2 text-center text-md bg-blue-700 text-amber-200">{toDisplayDate(today)}</div>

                    <div className="flex flex-wrap items-center w-[80%] m-auto">
                        {lines.map((line, index) => (
                            <div
                                key={`${index}-${line}`}
                                className="font-[Carter_One] border border-black inline-block shadow text-shadow p-2 px-8 text-2xl"
                                style={getDailyLineStyle(today, index)}
                            >
                                {line}
                            </div>
                        ))}
                    </div>

                </div>
            </MasterViewport>
            <div className={crampedStyle ? "absolute left-4 bottom-4 w-2/3" : "absolute left-4 top-4 w-2/3"}>
                <div className="flex flex-col gap-2">
                    <textarea
                        rows={4}
                        className=" w-full resize-none rounded border border-white/30 bg-black/20 p-2 text-white"
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            className="w-20"
                            onClick={() => setConfirmReset((prev) => !prev)}
                        >
                            {confirmReset ? "Cancel" : "Day reset"}
                        </Button>
                        {confirmReset && (
                            <Button type="button" className="w-16" onClick={handleDayReset}>
                                Sure?
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
