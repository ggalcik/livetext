import { useEffect, useRef, useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";
import { produce } from 'immer';
import { whoWantsToStarfield } from "../data";
import './WhoWantsTo.css';
import medallion from '../assets/whowants.png'
import { AudioController } from "../../../components/AudioController";
import { whoWantsToDefault, WhoWantsToSchema, type WhoWantsToAnswer, type WhoWantsToRound, type WhoWantsToStage } from "./types";
import clsx from "clsx";
import { useWhoWantsState } from "./helpers";

const million_start = "/local/scenes/whowantsto/million 1-start w claps.mp3";
const million_chat = "/local/scenes/whowantsto/million 2-ask.mp3";
const million_tense = "/local/scenes/whowantsto/million 3-answer.mp3";
const million_win = "/local/scenes/whowantsto/million 4-win.mp3";
const million_lose = "/local/scenes/whowantsto/crowd lose.mp3";

const vid = true;
const volume = 1;


export default function WhoWantsTo() {
    const [whoScene, setWhoScene] = useWhoWantsState();
    const [winBlink, setWinBlink] = useState(0);

    const audioRef = useRef<AudioController | null>(null);
    const round = (whoScene.activeRoundId === null
        ? whoScene.rounds.find(item => item.id === 'default')
        : whoScene.rounds.find(item => item.id === whoScene.activeRoundId)
    )
        || whoScene.rounds.find(item => item.id === 'default');

    const rightAnswer = round && round.answers.find(a => a.correct);
    const thatIsCorrect = rightAnswer && rightAnswer.chosen;


    if (!audioRef.current) {
        audioRef.current = new AudioController();
    }

    const setStage = (stage: WhoWantsToStage) => {
        setWhoScene(produce((draft) => {
            draft.stage = stage;
        }));
    }

    useEffect(() => {
        setStage('start');
    }, []);

    useEffect(() => {
        if (!(whoScene.stage == 'finish' && thatIsCorrect)) return;

        setWinBlink(0);

        const interval = setInterval(() => {
            setWinBlink(prev => {
                if (prev >= 6) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [whoScene.stage, thatIsCorrect]);

    useEffect(() => {
        if (whoScene.stage === 'start') {
            audioRef.current?.setVolume(volume);
            audioRef.current?.playUrl(million_start);
        }
        if (whoScene.stage === 'chat') {
            audioRef.current?.setVolume(volume);
            audioRef.current?.playUrl(million_chat, { loop: true });
        }
        if (whoScene.stage === 'tense') {
            audioRef.current?.setVolume(volume);
            audioRef.current?.playUrl(million_tense);
        }
        if (whoScene.stage === 'finish') {
            audioRef.current?.setVolume(volume);
            audioRef.current?.playUrl(thatIsCorrect ? million_win : million_lose);
        }

    }, [whoScene.stage]);

    type WhoBoxMode = "none" | "norm" | "good" | "chosen";
    interface IWhoBoxOpts {
        showText?: boolean,
        mode?: WhoBoxMode,
    }

    function WhoText(str: string) {

    }


    interface IWhoBoxOuter {
        children: React.ReactNode;
        question: boolean;
        mode?: WhoBoxMode;
    }

    function WhoBoxOuter({ children, question = true, mode = 'none' }: IWhoBoxOuter) {

        return <div className={clsx("bg-black border-2 border-blue-400 font-bold flex items-center font-[Conduit]",
            question && 'justify-center p-2',
            !question && 'mx-4 px-2',
            mode === 'norm' && 'text-white',
            mode === 'good' && 'text-black bg-green-500',
            mode === 'chosen' && 'text-black bg-orange-500',
        )}>
            <div className={clsx('', mode == 'none' && 'opacity-0')}>
            {children}
            </div>
        </div>
    }

    function WhoBox(ident: string, item: WhoWantsToRound | WhoWantsToAnswer, opts: IWhoBoxOpts = {}): React.ReactNode {
        const { showText = true, mode = 'none' } = opts;
        const q = "question" in item;
        let qSize = 'text-4xl';
        if (q && item.question.length > 60) qSize = 'text-3xl';
        let aSize = 'text-3xl';
        if (!q && item.text.length > 40) aSize = 'text-2xl';

        return <WhoBoxOuter question={q} mode={mode}>
            {showText && q && <div className={`text-center ${qSize}`}>{item.question}</div>}
            { !q &&
                <div className="flex items-center">
                    <span className={clsx("mr-2 text-2xl",
                        mode === 'good' && 'text-emerald-200',
                        mode !== 'good' && 'text-amber-400')}
                    >•{ident}: </span>
                    <div className={`inline-block my-2 leading-[1em] ${aSize}`}>{item.text}</div>
                </div>
            }
        </WhoBoxOuter>
    }

    function answerMode(answer: WhoWantsToAnswer): WhoBoxMode {
        if (whoScene.stage == 'finish' && answer.correct) {
            if (thatIsCorrect) return winBlink % 2 == 1 ? 'chosen' : 'good';
            return 'good';
        }

        if ((['tense', 'finish'].includes(whoScene.stage) && answer.chosen))
            return 'chosen';

        if (answer.show) return 'norm';

        return 'none';
    }


    const grid = 1;
    const started = whoScene.stage !== 'idle' && whoScene.stage !== "start";

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">

            <div className="absolute bottom-0 w-[1200px] animate-oscillate">

                {vid && <video className="-translate-x-1/4"
                    src={whoWantsToStarfield}
                    autoPlay
                    loop
                    muted
                    playsInline
                />}

            </div>

            {whoScene.stage === 'start' &&
                <div className="absolute top-1/2 w-full">
                    <div className="text-center">
                        <img className="inline animate-medallion" src={medallion}
                            onAnimationEnd={() => setStage('chat')} />
                    </div>
                </div>
            }




            <MasterViewport name={"whowantsto"} needCtrl>

                {started && round &&
                    <div className={clsx("animate-fade-in-1s",
                        grid == 1 && "grid grid-rows-[2fr_1fr_1fr_1fr_1fr] grid-cols-1 gap-2 w-full h-full ",
                        grid != 1 && "grid grid-rows-[2fr_1fr_1fr] grid-cols-2 [&>:first-child]:col-span-2 gap-4 w-full h-full "
                    )} >
                        {/* <div className="grid grid-rows-[2fr_1fr_1fr] grid-cols-2 [&>:first-child]:col-span-2 gap-4 w-full h-full ">  */}


                        {WhoBox('Q', round, { mode: 'norm' })}
                        {WhoBox('A', round.answers[0], { mode: answerMode(round.answers[0]), showText: round.answers[0].show })}
                        {WhoBox('B', round.answers[1], { mode: answerMode(round.answers[1]), showText: round.answers[1].show })}
                        {WhoBox('C', round.answers[2], { mode: answerMode(round.answers[2]), showText: round.answers[2].show })}
                        {WhoBox('D', round.answers[3], { mode: answerMode(round.answers[3]), showText: round.answers[3].show })}

                    </div>

                }


            </MasterViewport>



        </div>
    );
}

