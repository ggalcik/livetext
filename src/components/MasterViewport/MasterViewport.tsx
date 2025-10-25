import clsx from "clsx";
import { useEffect, useState } from 'react';
import { useMeasure } from "react-use";

interface IMasterViewport {
    children: React.ReactNode;
    name: string;
    needCtrl?: boolean;
    resizable?: boolean;
}

interface Pointer {
    pxp: number;
    pyp: number;
}

interface Edges {
    top: number;
    left: number;
    right: number;
    bottom: number;
}

const defaultEdges: Edges = {
    top: 50,
    left: 0,
    right: 100,
    bottom: 100,
};

interface Window {
    width: number; height: number
}
interface ViewportData {
    edges: Edges;
    windowSize: Window;
}



function getNamedFromLocal(name: string): Edges {
    const saved = localStorage.getItem("MasterViewports");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed[name]?.edges) return parsed[name].edges as Edges;
        } catch {
            // ignore malformed JSON
        }
    }
    return defaultEdges;
}

export function MasterViewport({ children, name, needCtrl=false, resizable=true }: IMasterViewport) {
    const [panelMoving, setPanelMoving] = useState(false);
    const [pointer, setPointer] = useState<Pointer | null>(null);
    const [edges, setEdges] = useState<Edges>(getNamedFromLocal(name));
    const [ctrlKey, setCtrlKey] = useState(false);
    const [movingWhich, setMovingWhich] = useState<'box' | 'edge' | null>(null);

    const [masterRef, { width: masterWidth, height: masterHeight }] = useMeasure<HTMLDivElement>();

    function saveToLocal(name: string, windowSize?: Window) {
        try {
            const saved = localStorage.getItem("MasterViewports");
            const parsed = saved ? JSON.parse(saved) : {};
            parsed[name] = {
                ...(parsed[name] || {}),
                edges,
                windowSize: windowSize ?? parsed[name]?.windowSize ?? { width: 0, height: 0 },
            };
            localStorage.setItem("MasterViewports", JSON.stringify(parsed));
        } catch (err) {
            console.error("Failed to save MasterViewports data", err);
        }
    }

    useEffect(() => {
        setEdges(getNamedFromLocal(name));
    }, [name]);

    // handlePointer function
    function handlePointer(p: Pointer | null) {
        setPointer(p);
        if (!p) {
            setMovingWhich(null);
            try {
                const saved = localStorage.getItem("MasterViewports");
                const parsed = saved ? JSON.parse(saved) : {};
                parsed[name] = {
                    ...(parsed[name] || {}),
                    edges,
                };
                localStorage.setItem("MasterViewports", JSON.stringify(parsed));
            } catch (err) {
                console.error("Failed to save MasterViewports data", err);
            }
        }
    }


    function doPanelMove(evt: React.MouseEvent) {
        evt.preventDefault();
        const EDGE_NUDGE = 2;
        const EDGE_RANGE = 5;

        const newEdges = { ...edges };

        const pxp = parseFloat(((evt.pageX / masterWidth) * 100).toFixed(1));
        const pyp = parseFloat(((evt.pageY / masterHeight) * 100).toFixed(1));

        const [fromTop, fromBottom] = [Math.abs(pyp - edges.top), Math.abs(pyp - edges.bottom)];
        const [fromLeft, fromRight] = [Math.abs(pxp - edges.left), Math.abs(pxp - edges.right)];

        let newMovingWhich = movingWhich;

        if (!resizable) {
            newMovingWhich = 'box';
        } else if (!movingWhich) {
            if (Math.min(fromTop, fromBottom, fromLeft, fromRight) > EDGE_RANGE)
                newMovingWhich = 'box';
            else
                newMovingWhich = 'edge';
            setMovingWhich(newMovingWhich);
        }

        const BORDER_STOP = 2;

        if (newMovingWhich === 'box') {
            if (pointer != null) {
                const [moveX, moveY] = [pxp - pointer.pxp, pyp - pointer.pyp];
                if (newEdges.right + moveX > BORDER_STOP && newEdges.left + moveX < (100 - BORDER_STOP)) {
                    newEdges.left += moveX;
                    newEdges.right += moveX;
                }
                if (newEdges.bottom + moveY > BORDER_STOP && newEdges.top + moveY < (100 - BORDER_STOP)) {
                    newEdges.top += moveY;
                    newEdges.bottom += moveY;
                }
            }
        } else {
            if (fromTop < fromBottom) newEdges.top = pyp - EDGE_NUDGE;
            else newEdges.bottom = pyp + EDGE_NUDGE;

            if (fromLeft < fromRight) newEdges.left = pxp - EDGE_NUDGE;
            else newEdges.right = pxp + EDGE_NUDGE;
        }

        handlePointer({ pxp, pyp });
        setEdges(newEdges);
    }

    return (
        <>
            <div
                ref={masterRef}
                className={clsx("h-full w-full overflow-hidden relative z-0")}
                onKeyDown={(e) => {alert('ctrl');if (e.ctrlKey) setCtrlKey(true)}}
                onKeyUp={() => setCtrlKey(false)}
                onMouseLeave={() => setCtrlKey(false)}
                onMouseDown={(e) => {
                     if (e.button !== 0) return;
                     if (needCtrl && !e.ctrlKey) return;
                    setPanelMoving(true);
                    doPanelMove(e);
                }}
                onMouseUp={() => {
                    setPanelMoving(false);
                    handlePointer(null);
                }}
                onMouseMove={(e) => {
                    if (panelMoving) doPanelMove(e);
                }}
            >
                <div
                    style={{
                        top: `${edges.top}%`,
                        left: `${edges.left}%`,
                        width: `${edges.right - edges.left}%`,
                        height: `${edges.bottom - edges.top}%`,
                    }}
                    className={clsx("flex items-center justify-center absolute w-full h-full")}
                >
                    {children}
                    <div
                        className={clsx(
                            "absolute z-0 w-full h-full border-2 border-dashed border-red-300",
                            panelMoving || ctrlKey ? "block border-red-400" : "hidden border-black"
                        )}
                    >
                        <div className="w-2 h-2 top-0 left-0 absolute bg-red-400"></div>
                        <div className="w-2 h-2 top-0 right-0 absolute bg-red-400"></div>
                        <div className="w-2 h-2 bottom-0 left-0 absolute bg-red-400"></div>
                        <div className="w-2 h-2 bottom-0 right-0 absolute bg-red-400"></div>
                    </div>
                </div>
            </div>

            {panelMoving && (
                <div className="absolute top-6 left-3 text-white ">
                    <div>master panel {name}</div>
                    <div className="top-0 left-0 p-4">
                        window: {`${masterWidth.toFixed(1)}, ${masterHeight.toFixed(1)}`}<br />
                        pointer: {pointer && `${pointer.pxp},${pointer.pyp}`}<br />
                    </div>
                </div>
            )}  
                  {ctrlKey && (
                <div className="absolute top-6 left-3 text-white ">
                   
                    <div className="top-0 right-0 p-4">
                       ctrl
                    </div>
                </div>
            )}
        </>
    );
}
