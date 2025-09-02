import clsx from "clsx";
import { useState } from "react";
import { useMeasure } from "react-use";


interface IMasterViewport {
    children: React.ReactNode
}

function randomHexColor(): `#${string}` {
    return ('#' + Math.floor(Math.random() * 0xFFFFFF)
        .toString(16)
        .padStart(6, '0')) as `#${string}`;
}

// points expressed as a percentage of screen width
export function MasterViewport({ children }: IMasterViewport) {

    const [panelMoving, setPanelMoving] = useState(false);
    const [pointer, setPointer] = useState({ pxp: 0, pyp: 0 })
    const [edges, setEdges] = useState({
        top: 50,
        left: 0,
        right: 100,
        bottom: 100
    });
    const [borderColor, setBorderColor] = useState('#000000');
    const [masterRef, { width: masterWidth, height: masterHeight }] = useMeasure<HTMLDivElement>();


    // simple! now:
    // TODO: make it move the box entire rather than just an edge
    // define a tolerance distance, e.g. more than 10 pixels away, move the box instead of the edge
    // will need to put previous position in state, to compare to current position, then 
    // move edges accordingly
    function doPanelMove(evt: React.MouseEvent) {
        evt.preventDefault();
        // 0-100 percent of screen
        const pxp = parseFloat((evt.pageX / masterWidth * 100).toFixed(1));
        const pyp = parseFloat((evt.pageY / masterHeight * 100).toFixed(1));
        setPointer({ pxp, pyp });
        const newEdges = { ...edges };
        const EDGE_NUDGE = 5;

        if (Math.abs(pyp - newEdges.top) < Math.abs(pyp - newEdges.bottom))
            newEdges.top = pyp - EDGE_NUDGE;
        else
            newEdges.bottom = pyp + EDGE_NUDGE;

        if (Math.abs(pxp - newEdges.left) < Math.abs(pxp - newEdges.right))
            newEdges.left = pxp - EDGE_NUDGE;
        else
            newEdges.right = pxp + EDGE_NUDGE;

        setEdges(newEdges);


    }

    return (
        <>

            <div ref={masterRef}
                className={clsx(`h-full w-full overflow-hidden relative z-0`)}
                onMouseDown={(e) => { setPanelMoving(true); doPanelMove(e) }}
                onMouseUp={() => setPanelMoving(false)}
                onMouseMove={(e) => { if (panelMoving) doPanelMove(e) }}
            >

                <div style={{
                    top: `${edges.top}%`,
                    left: `${edges.left}%`,
                    width: `${edges.right - edges.left}%`,
                    height: `${edges.bottom - edges.top}%`
                }}
                    className={clsx("flex items-center justify-center absolute w-full h-full  ",

                    )}>
                    <div className={clsx("absolute w-full h-full ",

                        panelMoving
                            ? "block border-red-400"
                            : "hidden border-black"
                    )}>          </div>
                    {children}


                </div>
            </div>





            <div className="absolute top-6 left-3 -z-10">
                {panelMoving &&
                    <div className="top-0 left-0 p-4 text-white">
                        window: {`${masterWidth.toFixed(1)}, ${masterHeight.toFixed(1)}`}<br />
                        pointer: {pointer.pxp},{pointer.pyp}<br />
                    </div>
                }
            </div>
        </>
    );
};
