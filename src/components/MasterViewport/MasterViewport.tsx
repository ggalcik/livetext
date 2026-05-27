import clsx from "clsx";
import { useEffect, useState } from 'react';
import { useMeasure } from "react-use";
import { gGlobal } from '../../features/Global/global';

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

interface DragState {
    mode: 'box' | 'edge';
    activeEdges: Partial<Record<keyof Edges, true>>;
    startPointer: Pointer;
    startEdges: Edges;
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

const BORDER_STOP = 2;
const EDGE_NUDGE = 2;
const EDGE_RANGE = 5;
const MIN_SIZE = 4;

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

export function MasterViewport({ children, name: sentName, needCtrl = false, resizable = true }: IMasterViewport) {

    const name = `${sentName}${gGlobal.activeLayout ? `_${gGlobal.activeLayout}` : ''}`;
    const [panelMoving, setPanelMoving] = useState(false);
    const [pointer, setPointer] = useState<Pointer | null>(null);
    const [edges, setEdges] = useState<Edges>(getNamedFromLocal(name));
    const [ctrlKey, setCtrlKey] = useState(false);
    const [dragState, setDragState] = useState<DragState | null>(null);

    const [masterRef, { width: masterWidth, height: masterHeight }] = useMeasure<HTMLDivElement>();

    useEffect(() => {
        setEdges(getNamedFromLocal(name));
    }, [name]);

    function handlePointer(p: Pointer | null, edgesToSave?: Edges) {
        setPointer(p);
        if (!p) {
            setDragState(null);
            try {
                const saved = localStorage.getItem("MasterViewports");
                const parsed = saved ? JSON.parse(saved) : {};
                parsed[name] = {
                    ...(parsed[name] || {}),
                    edges: edgesToSave ?? edges,
                };
                localStorage.setItem("MasterViewports", JSON.stringify(parsed));
            } catch (err) {
                console.error("Failed to save MasterViewports data", err);
            }
        }
    }

    function clamp(value: number, min: number, max: number) {
        return Math.min(max, Math.max(min, value));
    }

    function getPointerPercent(evt: React.MouseEvent): Pointer | null {
        if (!masterWidth || !masterHeight) return null;

        const rect = evt.currentTarget.getBoundingClientRect();
        const pxp = parseFloat(((((evt.clientX - rect.left) / masterWidth) * 100)).toFixed(1));
        const pyp = parseFloat(((((evt.clientY - rect.top) / masterHeight) * 100)).toFixed(1));

        return { pxp, pyp };
    }

    function getDragState(nextPointer: Pointer): DragState {
        const { pxp, pyp } = nextPointer;
        const [fromTop, fromBottom] = [Math.abs(pyp - edges.top), Math.abs(pyp - edges.bottom)];
        const [fromLeft, fromRight] = [Math.abs(pxp - edges.left), Math.abs(pxp - edges.right)];

        if (!resizable) {
            return {
                mode: 'box',
                activeEdges: {},
                startPointer: nextPointer,
                startEdges: { ...edges },
            };
        }

        if (Math.min(fromTop, fromBottom, fromLeft, fromRight) > EDGE_RANGE) {
            return {
                mode: 'box',
                activeEdges: {},
                startPointer: nextPointer,
                startEdges: { ...edges },
            };
        }

        return {
            mode: 'edge',
            activeEdges: {
                ...(fromTop < fromBottom ? { top: true } : { bottom: true }),
                ...(fromLeft < fromRight ? { left: true } : { right: true }),
            },
            startPointer: nextPointer,
            startEdges: { ...edges },
        };
    }

    function doPanelMove(evt: React.MouseEvent) {
        evt.preventDefault();
        const nextPointer = getPointerPercent(evt);
        if (!nextPointer) return;

        const activeDrag = dragState ?? getDragState(nextPointer);

        if (!dragState) {
            setDragState(activeDrag);
        }

        const moveX = nextPointer.pxp - activeDrag.startPointer.pxp;
        const moveY = nextPointer.pyp - activeDrag.startPointer.pyp;
        const newEdges = { ...activeDrag.startEdges };

        if (activeDrag.mode === 'box') {
            const width = activeDrag.startEdges.right - activeDrag.startEdges.left;
            const height = activeDrag.startEdges.bottom - activeDrag.startEdges.top;

            newEdges.left = clamp(activeDrag.startEdges.left + moveX, BORDER_STOP - width, 100 - BORDER_STOP);
            newEdges.right = newEdges.left + width;
            newEdges.top = clamp(activeDrag.startEdges.top + moveY, BORDER_STOP - height, 100 - BORDER_STOP);
            newEdges.bottom = newEdges.top + height;
        } else {
            if (activeDrag.activeEdges.top) {
                newEdges.top = clamp(
                    activeDrag.startEdges.top + moveY,
                    BORDER_STOP - EDGE_NUDGE,
                    activeDrag.startEdges.bottom - MIN_SIZE
                );
            }
            if (activeDrag.activeEdges.bottom) {
                newEdges.bottom = clamp(
                    activeDrag.startEdges.bottom + moveY,
                    activeDrag.startEdges.top + MIN_SIZE,
                    100 + EDGE_NUDGE
                );
            }
            if (activeDrag.activeEdges.left) {
                newEdges.left = clamp(
                    activeDrag.startEdges.left + moveX,
                    BORDER_STOP - EDGE_NUDGE,
                    activeDrag.startEdges.right - MIN_SIZE
                );
            }
            if (activeDrag.activeEdges.right) {
                newEdges.right = clamp(
                    activeDrag.startEdges.right + moveX,
                    activeDrag.startEdges.left + MIN_SIZE,
                    100 + EDGE_NUDGE
                );
            }
        }

        handlePointer(nextPointer);
        setEdges(newEdges);
    }

    return (
        <>
            <div
                ref={masterRef}
                className={clsx("h-full w-full overflow-hidden relative z-0 [container-type:size]")}
                onKeyDown={(e) => { if (e.ctrlKey) setCtrlKey(true) }}
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
                    handlePointer(null, edges);
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
                <div className={`absolute ${gGlobal.layout.crampedPortrait ? 'bottom-6' : 'top-6'} left-3 text-white`}>
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
