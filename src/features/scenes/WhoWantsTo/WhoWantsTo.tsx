import { useEffect, useRef, useState } from "react";
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import { whoWantsToStarfield } from "../data";
import './WhoWantsTo.css';
import medallion from '../assets/whowants.png'
import { AudioController } from "../../../components/AudioController";
import { whoWantsToDefault, WhoWantsToSchema, type WhoWantsToAnswer, type WhoWantsToRound, type WhoWantsToState } from "./types";
import clsx from "clsx";
import { usePersistentState } from "../../../hooks/usePersistentState";

const million_start = "/local/scenes/whowantsto/million 1-start.mp3";
const million_chat = "/local/scenes/whowantsto/million 2-ask.mp3";

export default function WhoWantsTo() {
    const [stage, setStage] = useState<WhoWantsToState>('start');
    const [whoScene, setWhoScene] = usePersistentState({
        storageKey: 'panelsScene',
        schema: WhoWantsToSchema,
        fallback: whoWantsToDefault
    })

    const audioRef = useRef<AudioController | null>(null);
    const round = (whoScene.activeRoundId === null
        ? whoScene.rounds.find(item => item.id === 'default')
        : whoScene.rounds.find(item => item.id === whoScene.activeRoundId)
    )
        || whoScene.rounds.find(item => item.id === 'default');


    if (!audioRef.current) {
        audioRef.current = new AudioController();
    }

    useEffect(() => {
        if (stage === 'start') {
            audioRef.current?.setVolume(0);
            audioRef.current?.playUrl(million_start);
        }
        if (stage === 'chat') {
            audioRef.current?.setVolume(0);
            audioRef.current?.playUrl(million_chat, { loop: true });
        }
    }, [stage]);

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
            question && 'justify-center text-4xl',
            !question && 'mx-4 px-2 text-2xl',
            mode === 'norm' && 'text-white',
            mode === 'good' && 'text-black bg-green-500',
            mode === 'chosen' && 'text-black bg-orange-500',
        )}>
            {mode !== 'none' && children}
        </div>
    }

    function WhoBox(ident: string, item: WhoWantsToRound | WhoWantsToAnswer, opts: IWhoBoxOpts = {}): React.ReactNode {
        const { showText = true, mode = 'none' } = opts;
        const q = "question" in item;

        return <WhoBoxOuter question={q} mode={mode}>
            {showText && !q &&
                <>
                    <span className={clsx("mr-2 text-md",
                        mode === 'good' && 'text-emerald-200',
                        mode !== 'good' && 'text-amber-400')}
                    >•{ident}: </span>
                    {item.text}
                </>
            }
            {showText && q && item.question}
        </WhoBoxOuter>
    }

    const grid = 1;
    const vid = false;


    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-blue-800">
            <div className="absolute bottom-0 w-[1200px] animate-oscillate">

                {vid && <video className="-translate-x-1/4"
                    src={whoWantsToStarfield}
                    autoPlay
                    loop
                    muted
                    playsInline
                />}

            </div>

            {stage === 'start' &&
                <div className="absolute top-1/2 w-full">
                    <div className="text-center">
                        <img className="inline animate-medallion" src={medallion}
                            onAnimationEnd={() => setStage('chat')} />
                    </div>
                </div>
            }




            <MasterViewport name={"whowantsto"} needCtrl>

                {stage === 'chat' && round &&
                    <div className={clsx(
                        grid == 1 && "grid grid-rows-[2fr_1fr_1fr_1fr_1fr] grid-cols-1 gap-2 w-full h-full ",
                        grid != 1 && "grid grid-rows-[2fr_1fr_1fr] grid-cols-2 [&>:first-child]:col-span-2 gap-4 w-full h-full "
                    )} >
                        {/* <div className="grid grid-rows-[2fr_1fr_1fr] grid-cols-2 [&>:first-child]:col-span-2 gap-4 w-full h-full ">  */}


                        {WhoBox('Q', round, { mode: 'norm' })}
                        {WhoBox('A', round.answers[0], { mode: 'norm' })}
                        {WhoBox('B', round.answers[1], { mode: 'norm' })}
                        {WhoBox('C', round.answers[2], { mode: 'norm' })}
                        {WhoBox('D', round.answers[3], { mode: 'norm' })}

                    </div>

                }


            </MasterViewport>



        </div>
    );
}

