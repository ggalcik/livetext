import clsx from "clsx";
import { useRef, useEffect, useCallback, useState } from 'react';
import { useMeasure } from "react-use";
import glog from "../../components/glog";


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
    const [pointer, setPointer] = useState<{ pxp: number; pyp: number } | null>(null)
    const [edges, setEdges] = useState({
        top: 50,
        left: 0,
        right: 100,
        bottom: 100
    });
    const [borderColor, setBorderColor] = useState('#000000');
    const [masterRef, { width: masterWidth, height: masterHeight }] = useMeasure<HTMLDivElement>();


    // TODO: save position to state on mouseup
    function doPanelMove(evt: React.MouseEvent) {
        evt.preventDefault()
        const EDGE_NUDGE = 2; // edge will be positioned this percent outside pointer location
        const EDGE_RANGE = 5; // this percent away, we're moving the box, not just an edge    
        const newEdges = { ...edges };

        // convert pixel location to 0-100 percent of window
        const pxp = parseFloat((evt.pageX / masterWidth * 100).toFixed(1));
        const pyp = parseFloat((evt.pageY / masterHeight * 100).toFixed(1));

        const [fromTop, fromBottom] = [Math.abs(pyp - edges.top), Math.abs(pyp - edges.bottom)];
        const [fromLeft, fromRight] = [Math.abs(pxp - edges.left), Math.abs(pxp - edges.right)];

        if (Math.min(fromTop, fromBottom, fromLeft, fromRight) > EDGE_RANGE) {
            // move box
            if (pointer != null) {
                const [moveX, moveY] = [pxp - pointer.pxp, pyp - pointer.pyp];
                newEdges.left += moveX;
                newEdges.right += moveX;
                newEdges.top += moveY;
                newEdges.bottom += moveY;
            }
        } else {
            if (fromTop < fromBottom)
                newEdges.top = pyp - EDGE_NUDGE;
            else
                newEdges.bottom = pyp + EDGE_NUDGE;

            if (fromLeft < fromRight)
                newEdges.left = pxp - EDGE_NUDGE;
            else
                newEdges.right = pxp + EDGE_NUDGE;
        }
        setPointer({ pxp, pyp });
        setEdges(newEdges);


    }



    return (
        <>

            <div ref={masterRef}
                className={clsx(`h-full w-full overflow-hidden relative z-0`)}
                onMouseDown={(e) => { setPanelMoving(true); doPanelMove(e) }}
                onMouseUp={() => { setPanelMoving(false), setPointer(null)}}
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
                    <div className={clsx("absolute z-0 w-full h-full border-2 border-dashed border-red-300 ",

                        panelMoving
                            ? "block border-red-400"
                            : "hidden border-black"
                    )}>
                        <div className="w-2 h-2 top-0 left-0 absolute bg-red-400"></div>
                        <div className="w-2 h-2 top-0 right-0 absolute bg-red-400"></div>
                        <div className="w-2 h-2 bottom-0 left-0 absolute bg-red-400"></div>
                        <div className="w-2 h-2 bottom-0 right-0 absolute bg-red-400"></div>
                    </div>
                    {children}


                </div>
            </div>





            <div className="absolute top-6 left-3 -z-10">
                {panelMoving &&
                    <div className="top-0 left-0 p-4 text-white">
                        window: {`${masterWidth.toFixed(1)}, ${masterHeight.toFixed(1)}`}<br />
                        pointer: {pointer && `${pointer.pxp},${pointer.pyp}`}<br />
                    </div>
                }
            </div>
        </>
    );
};
