import clsx from "clsx";
import type { ReactNode } from "react";
import { getDailyLineStyle, toDisplayDate } from "./helpers";
import type { NamesDisplayData } from "./types";

export default function NamesDisplay({ names, currentDate, historical, isExiting, children }: NamesDisplayData & { isExiting: boolean; children?: ReactNode }) {
    const lines = names.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    return (
                <div className={clsx(
                    "group/names w-full h-full backdrop-blur-sm bg-black/50 [container-type:size] text-center",
                    isExiting ? "animate-names-exit" : "animate-names-enter"
                )}>
                    {children}

                    <div className={clsx(
                        "font-[Carter_One] border border-black inline-block shadow-lg shadow-black -rotate-2 p-4 text-center text-4xl text-amber-200",
                        historical ? "bg-stone-700" : "bg-blue-800"
                    )}>
                        {historical ? "My favorite names on:" : "My favorite names today"}
                    </div>
                    <div className="font-[Carter_One] border border-black inline-block shadow shadow-black rotate-1 translate-x-[70%] -translate-y-[30%] p-2 text-center text-md bg-blue-700 text-amber-200">{toDisplayDate(currentDate)}</div>

                    <div className="flex flex-wrap justify-center gap-2 w-[80%] m-auto">
                        {lines.map((line, index) => (
                            <div
                                key={`${index}-${line}`}
                                className="font-[Candara] border border-black inline-block  shadow-lg shadow-black text-shadow p-2 px-8 text-2xl"
                                style={getDailyLineStyle(currentDate, index)}
                            >
                                {line}
                            </div>
                        ))}
                    </div>

                </div>
    );
}
