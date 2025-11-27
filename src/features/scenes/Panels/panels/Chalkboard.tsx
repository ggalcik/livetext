import clsx from 'clsx';
import chalkboard from './assets/chalkboard.png';
import chalkboardWall from './assets/chalkboard_wall.png';
import { usePersistentState } from '../../../../hooks/usePersistentState';
import { defaultChalkboardPanel, IChalkboardPanelSchema, CHALKBOARD_FONTSIZE_MIN, CHALKBOARD_FONTSIZE_MAX } from './types';
import glog from '../../../../components/glog';

export function ChalkboardBackground() {

    return <div className="absolute top-0 left-0 w-full h-full bg-[length:100%_auto] bg-top bg-black bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${chalkboardWall})` }}
    ></div>
}

const colorPairs = [['#0092b8', '#a2f4fd'],
['#bb36bd', '#e4b3e5'],
['#868719', '#dfe17b'],
['#19790e', '#8ada82']]

function boardLetter(seq: number, sel: number | null, click: () => void) {
    const left = (seq * 42);
    const rot = [4, 0, -8, -3, 2, 0, 6, 1];
    const letter = String.fromCharCode(seq + (seq === 6 ? 65 : 97))
    // const top = [4, 0, -8, -3, 2, 0, 6, 1];
    // const bg = '#0092b8';
    // const bgHi = '#a2f4fd';
    const selected = seq === sel;
    const colors = [colorPairs[0], colorPairs[1], colorPairs[2], colorPairs[0],
    colorPairs[1], colorPairs[0], colorPairs[3], colorPairs[1]];
    return (
        <div key={`letter-${seq}`}
            style={{
                left: `${left}px`,
                top: `${Math.abs(rot[seq])}px`,
                transform: `rotate(${rot[seq] * 2}deg)`,
                "--bg-color": selected ? colors[seq][1] : colors[seq][0],
                "--hover-color": colors[seq][1],
            } as React.CSSProperties}
            className={clsx(
                "absolute cursor-pointer font-[Courier] font-bold  px-2 py-1",
                " ring  ring-offset-3 shadow-lg shadow-black transition-colors duration-150",
                // "bg-[#e4b3e5]"
                "bg-[var(--bg-color)] hover:bg-[var(--hover-color)]",
                selected ? 'ring-black ring-offset-white' : 'ring-black/50 ring-offset-white/70'
            )}
            onClick={(e) => { e.preventDefault(); click() }}
            onMouseDown={(e) => { e.preventDefault(); }}
        >{letter}</div>
    );
}

function boardSizer(sel: number | null, label: '+'|'-', click: () => void) {
    const rots = [4, -8];
    const colors = [colorPairs[0], colorPairs[1]];
    const rot = label === "+" ? rots[0] : rots[1];
    const colorPair = label === "+" ? colors[0] : colors[1];
    return (
        <div key={`sizer-${label}`}
            style={{
                transform: `rotate(${rot}deg)`,
                "--bg-color": colorPair[0],
                "--hover-color": colorPair[1],
            } as React.CSSProperties}
            className={clsx(
                "absolute cursor-pointer font-[Courier] font-bold  px-2 py-1",
                " border shadow-lg shadow-black transition-colors duration-150",
                // "bg-[#e4b3e5]"
                "bg-[var(--bg-color)] hover:bg-[var(--hover-color)]",
               
            )}
            onClick={(e) => { e.preventDefault(); click() }}
            onMouseDown={(e) => { e.preventDefault(); }}
        >{label}</div>
    );
}

export function Chalkboard() {
    const [chalkboardPanel, setChalkboardPanel] = usePersistentState({
        storageKey: 'chalkboardPanel',
        schema: IChalkboardPanelSchema,
        fallback: defaultChalkboardPanel
    })

    const active = chalkboardPanel.active;

    function setActive(sel: number | null) {
        setChalkboardPanel(
            {
                ...chalkboardPanel,
                active: sel
            }
        )
    }

    function setBoardText(sel: number | null, text: string) {
        if (sel === null) return;
        const boards = [...chalkboardPanel.boards];
        boards[sel] = { ...boards[sel], text }
        setChalkboardPanel(
            {
                ...chalkboardPanel,
                boards
            }
        )
    }

    function setBoardFontSize(sel: number | null, fontChange: '+'|'-') {
        if (sel === null) return;
        const boards = [...chalkboardPanel.boards];
        const currentSize = boards[sel].fontSize;
        const fontSize = currentSize + (fontChange === '+' ? 2 : -2);
        glog('setBoardFontSize %s %s, %s %s', sel, fontChange, currentSize, fontSize);
        if (fontSize < CHALKBOARD_FONTSIZE_MIN || fontSize > CHALKBOARD_FONTSIZE_MAX) return;
        boards[sel] = { ...boards[sel], fontSize }
        setChalkboardPanel(
            {
                ...chalkboardPanel,
                boards
            }
        )
    }

    return (
        <div className={`bg-[length:100%_100%] w-full h-full`}
            style={{ backgroundImage: `url(${chalkboard})` }}
        >
            <div className="pl-[12%] pr-[10%] py-[9%] h-full w-full box-border ">
                <textarea
                    spellCheck="false"
                    className="
                    h-full w-full text-white bg-transparent border-0 focus:outline-none
                    text-xl font-bold font-[Segoe_Print] resize-none
                    "
                    style={{fontSize: `${chalkboardPanel.boards[active ?? 0].fontSize}px`}}
                    value={chalkboardPanel.boards[active ?? 0].text || ''}
                    onChange={e => setBoardText(active, e.target.value)}
                ></textarea>
            </div>

            <div className="top-2.5 ml-[12%] absolute">
                {Array.from({ length: 8 }, (_, i) => boardLetter(i, active, () => setActive(i)))}
            </div>

            <div className="top-5/8 right-[10%] absolute">
                {boardSizer(active, '+', () => setBoardFontSize(active, '+'))}
                <div className='top-12 right-2 absolute'>

                {boardSizer(active, '-', () => setBoardFontSize(active, '-'))}
                </div>
            </div>

        </div>
    );
}