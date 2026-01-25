import clsx from 'clsx';
import chalkboard from './assets/chalkboard.png';
import chalkboardWall from './assets/chalkboard_wall.png';
import { usePersistentState } from '../../../../hooks/usePersistentState';
import { boardDefault, defaultChalkboardPanel, IChalkboardPanelSchema, CHALKBOARD_FONTSIZE_MIN, CHALKBOARD_FONTSIZE_MAX } from './types';
import glog from '../../../../components/glog';
import './Chalkboard.css'
import { useEffect, useState } from 'react';
import plinkIn from './assets/plink_in.mp3';
import whooshOut from './assets/whoosh_out.mp3';


export function ChalkboardBackground() {
    return <div className="absolute top-0 left-0 w-full h-full bg-[length:100%_auto] bg-top bg-black bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${chalkboardWall})` }}
    ></div>
}

// const BOARD_FONT = 'Kristen ITC';
// const BOARD_FONT = 'Atomic Age';
// const BOARD_FONT = 'Bahnschrift';
// const BOARD_FONT = 'KG Ten Thousand Reasons';
const BOARD_FONT = 'Segoe Print'; 


const colorPairs =
    [['#0092b8', '#a2f4fd'],
    ['#bb36bd', '#e4b3e5'],
    ['#868719', '#a2a339'],
    ['#19790e', '#8ada82']]

function boardLetter(seq: number, sel: number | null, click: () => void) {
    const left = (seq * 50);
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
                "absolute cursor-pointer font-[Courier] font-bold text-2xl px-2 py-1",
                " ring  ring-offset-3 shadow-[6px_10px_8px] shadow-black/50 transition-colors duration-150",
                // "bg-[#e4b3e5]"
                "bg-[var(--bg-color)] hover:bg-[var(--hover-color)]",
                selected 
                ? 'text-black ring-black ring-offset-white' 
                : 'text-gray-800 ring-black/50 ring-offset-white/60'
            )}
            onClick={(e) => { e.preventDefault(); click() }}
            onMouseDown={(e) => { e.preventDefault(); }}
        >{letter}</div>
    );
}

function boardShape(seq: number, sel: number, click: () => void) {
    const top = (seq * 55);
    const rot = [4, 0, -8, -3];
    const shapes = ['✩', '△', '⭘', '⬠'];
    // const shapes = ['α', 'β', 'γ', 'δ'];
    // const shapes = ['■', '▲', '◆', '◕']
    // const top = [4, 0, -8, -3, 2, 0, 6, 1];
    // const bg = '#0092b8';
    // const bgHi = '#a2f4fd';
    const selected = seq === sel;
    const colors = [colorPairs[2], colorPairs[0], colorPairs[1], colorPairs[0]];
    return (
        <div key={`shape-${seq}`}
            style={{
                top: `${top}px`,
                transform: `rotate(${rot[seq] * 2}deg)`,
                "--bg-color": selected ? colors[seq][1] : colors[seq][0],
                "--hover-color": colors[seq][1],
            } as React.CSSProperties}
            className={clsx(
                "absolute cursor-pointer font-[Courier] font-bold text-2xl px-1 py-1 h-[1.5em]",
                " ring ring-offset-3 shadow-[6px_10px_8px] shadow-black/50 transition-colors duration-150",
                // "bg-[#e4b3e5]"
                "bg-[var(--bg-color)] hover:bg-[var(--hover-color)]",
                                selected 
                ? 'text-black ring-black ring-offset-white' 
                : 'text-gray-600 ring-black/50 ring-offset-white/60'
            )}
            onClick={(e) => { e.preventDefault(); click() }}
            onMouseDown={(e) => { e.preventDefault(); }}
        >{shapes[seq]}</div>
    );
}

function boardSizer(label: '+' | '-', click: () => void) {
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

export function ChalkboardAdmin() {
    const [chalkboardPanel, setChalkboardPanel] = usePersistentState({
        storageKey: 'chalkboardPanel',
        schema: IChalkboardPanelSchema,
        fallback: defaultChalkboardPanel
    })

    const showIntro = chalkboardPanel.showIntro;

    function toggleShowIntro() {
        setChalkboardPanel((p) => {
            return { ...p, showIntro: !p.showIntro }
        })
    }

    return (
        <div className='flex gap-2'>
            <input type="checkbox" className='w-8 h-8'
                checked={showIntro}
                onChange={toggleShowIntro} />
            <div> show intro</div>
        </div>

    )

}

export function Chalkboard() {
    const [chalkboardPanel, setChalkboardPanel] = usePersistentState({
        storageKey: 'chalkboardPanel',
        schema: IChalkboardPanelSchema,
        fallback: defaultChalkboardPanel
    })
    const [showIntro, setShowIntro] = useState(chalkboardPanel.showIntro);

    useEffect(() => {


        if (!chalkboardPanel.showIntro) return;
        const plinkSound = new Audio(plinkIn);
        const whooshSound = new Audio(whooshOut);

        // const plinkTimeout = setTimeout(() => {
        plinkSound.play().catch(error => console.error("Error playing plinkIn:", error));
        // }, 500); 

        const whooshTimeout = setTimeout(() => {
            whooshSound.play().catch(error => console.error("Error playing whooshOut:", error));
        }, 2000);

        return () => {
            //   clearTimeout(plinkTimeout);
            clearTimeout(whooshTimeout);

            plinkSound.pause();
            whooshSound.pause();
            plinkSound.currentTime = 0;
            whooshSound.currentTime = 0;
        };
    }, []);

    const active = chalkboardPanel.active;


    function getActives() {
        const activeSet = chalkboardPanel.boardSets[chalkboardPanel.active];
        // glog("activeSet chalkboardPanel %o ", chalkboardPanel);
        const activeBoard = activeSet.boards[activeSet.active];
        const currentSet = chalkboardPanel.active;
        const currentBoard = activeSet.active;
        return { activeSet, activeBoard, currentSet, currentBoard };
    }

    function setActive(sel: number) {
        const { activeSet, currentSet, currentBoard } = getActives();


        const newSets = [...chalkboardPanel.boardSets];
        newSets[currentSet] = { ...newSets[currentSet], active: sel };

        setChalkboardPanel(
            {
                ...chalkboardPanel,
                boardSets: newSets
            }
        )
    }

    function setActiveSet(sel: number) {
        setChalkboardPanel(
            {
                ...chalkboardPanel,
                active: sel
            }
        )
    }

    function setBoardText(text: string) {
        const { activeSet, currentSet, currentBoard } = getActives();

        const newBoards = [...activeSet.boards];
        newBoards[currentBoard] = { ...newBoards[currentBoard], text };

        const newSets = [...chalkboardPanel.boardSets];
        newSets[currentSet] = { ...newSets[currentSet], boards: newBoards };

        setChalkboardPanel(
            {
                ...chalkboardPanel,
                boardSets: newSets,
            }
        )
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Tab') {
            e.preventDefault();

            const { currentTarget } = e;
            const start = currentTarget.selectionStart;
            const end = currentTarget.selectionEnd;
            const textareaValue = currentTarget.value;
            const spaces = '    ';

            const newText =
                textareaValue.substring(0, start) +
                spaces +
                textareaValue.substring(end);

            setBoardText(newText);
            currentTarget.selectionStart = start + spaces.length;
            currentTarget.selectionEnd = start + spaces.length;
        }
    }

    function setBoardFontSize(fontChange: '+' | '-') {

        const { activeSet, activeBoard, currentSet, currentBoard } = getActives();
        const currentSize = activeBoard.fontSize;
        const fontSize = currentSize + (fontChange === '+' ? 2 : -2);

        if (fontSize < CHALKBOARD_FONTSIZE_MIN || fontSize > CHALKBOARD_FONTSIZE_MAX) return;

        const newBoards = [...activeSet.boards];
        newBoards[currentBoard] = { ...newBoards[currentBoard], fontSize };

        const newSets = [...chalkboardPanel.boardSets];
        newSets[currentSet] = { ...newSets[currentSet], boards: newBoards };

        setChalkboardPanel(
            {
                ...chalkboardPanel,
                boardSets: newSets,
            }
        )
    }

    interface IntroProps {
        onAnimationComplete: () => void;
    }

    function Intro({ onAnimationComplete }: IntroProps) {
        const words = [
            { text: "Let's", classes: "top-20 left-30 text-yellow-200 text-4xl -rotate-10" },
            { text: "Go", classes: "top-30 left-25 text-pink-300 text-7xl" },
            { text: "To", classes: "top-27 left-55 text-pink-300 text-7xl" },
            { text: "the", classes: "top-46 left-13 text-yellow-200 text-4xl rotate-2" },
            { text: "Board!", classes: "top-48 left-35 text-pink-300 text-7xl -rotate-3" },
        ];

        const handleBgEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
            // Only trigger the callback when the actual animation ends (not the children's)
            if (event.currentTarget === event.target) {
                onAnimationComplete();
            }
        };
        return (
            <div className='absolute top-0 left-0 w-full h-full scale-110'>
                <div
                    className='absolute top-0 left-0 w-full h-full opacity-80 animate-bg-fade'
                    onAnimationEnd={handleBgEnd} // <-- Function call here
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%)',
                        opacity: 0.8
                    }} // Initial state must be 0.8
                />
                <div className='absolute left-24'>

                    {words.map((word, i) => (
                        <div
                            key={i}
                            className={`absolute drop-shadow-xl/100 stroke-black font-[Ravie]  animate-intro opacity-0 ${word.classes}`}
                            style={{
                                animationDelay: `${i * 0.1}s`,
                            }}
                        >
                            {word.text}
                        </div>
                    ))}
                </div>
            </div>
        )
    };


    const { activeSet, activeBoard, currentSet, currentBoard } = getActives();

    return (
        <div className={`bg-[length:100%_100%] w-full h-full`}
            style={{ backgroundImage: `url(${chalkboard})` }}
        >
            <div className="pl-[12%] pr-[12%] py-[9%] h-full w-full box-border ">
                <textarea
                    spellCheck="false"
                    className={`
                    h-full w-full text-white bg-transparent border-0 focus:outline-none
                    text-xl font-bold  resize-none pl-4  placeholder-white 
                    `}
                    style={{ font: `${activeBoard.fontSize}px/1.2em '${BOARD_FONT}'`, 
                }}
                    value={activeBoard.text}
                    onChange={e => setBoardText(e.target.value)}
                    onKeyDown={e => handleKeyDown(e)}
                    placeholder={boardDefault.text}
                ></textarea>
            </div>

            <div className="top-2.5 ml-[12%] absolute">
                {Array.from({ length: 8 }, (_, i) => boardLetter(i, currentBoard, () => setActive(i)))}
            </div>

            <div className="top-[10%] right-[10%] absolute">
                {Array.from({ length: 4 }, (_, i) => boardShape(i, currentSet, () => setActiveSet(i)))}
            </div>

            <div className="top-5/8 right-[10%] absolute">
                {boardSizer('+', () => setBoardFontSize('+'))}
                <div className='top-12 right-2 absolute'>

                    {boardSizer('-', () => setBoardFontSize('-'))}
                </div>
            </div>

            {showIntro && <Intro onAnimationComplete={() => setShowIntro(false)} />}
        </div>
    );
}