import { usePersistentState } from "../../../hooks/usePersistentState";
import { NewRoundForm } from "./NewRoundForm";
import { produce } from 'immer';
import { whoWantsToDefault, WhoWantsToSchema, type WhoWantsToRound, type WhoWantsToAnswer, type WhoWantsToStage } from "./types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import React from "react";
import InlineEdit from "./InlineEdit";
import { HoldToConfirmButton } from "../../../components/HoldToConfirmButton";
import glog from "../../../components/glog";

export default function WhoWantsToAdmin() {

    const [whoWantsScene, setWhoWantsScene] = usePersistentState({
        storageKey: "whoWantsScene",
        schema: WhoWantsToSchema,
        fallback: whoWantsToDefault,
    });

    useEffect(() => {
        if (whoWantsScene.stage !== 'start') return;
        setWhoWantsScene(produce((draft) => {
            const theRound = draft.rounds.find(round => round.id === draft.activeRoundId);
            if (!theRound) return;
            theRound.answers = theRound.answers.map(a => ({ ...a, show: false, chosen:false }));
        }));
    }, [whoWantsScene.stage]);

    function handleNewRound(data: WhoWantsToRound) {
        setWhoWantsScene(produce((draft) => {
            draft.rounds.push(data)
        }));
        console.log('data: %o', data);
    }

    type UpdateAnswer = (
        roundId: string,
        idx: number,
        newAnswer: Partial<WhoWantsToAnswer>
    ) => void;

    const updateAnswer: UpdateAnswer = (roundId, idx, newAnswer) => {
        setWhoWantsScene(produce((draft) => {
            const theRound = draft.rounds.find(round => round.id === roundId);
            if (!theRound) return;
            if ("correct" in newAnswer) theRound.answers.forEach(a => a.correct = false);
            if ("chosen" in newAnswer) theRound.answers.forEach(a => a.chosen = false);
            theRound.answers[idx] = { ...theRound.answers[idx], ...newAnswer }
        }));
    }
    
    function showNextAnswer() {
        const theRound = whoWantsScene.rounds.find(round => round.id === whoWantsScene.activeRoundId);
        if (!theRound) return;
        const theAnswer = theRound.answers.findIndex(a => !a.show)
        if (theAnswer == -1) return;
        
        updateAnswer(theRound.id, theAnswer, {show: true})
    }

    type UpdateQuestion = (
        roundId: string,
        newQuestion: Partial<WhoWantsToRound>
    ) => void;

    const updateQuestion: UpdateQuestion = (roundId, newQuestion) => {
        setWhoWantsScene(produce((draft) => {
            const theRound = draft.rounds.find(round => round.id === roundId);
            if (!theRound) return;
            Object.assign(theRound, newQuestion);
        }));
    }

    const deleteRound = (roundId: string) => {
        setWhoWantsScene(produce((draft) => {
            draft.rounds = draft.rounds.filter(round => round.id !== roundId);
        }));
    }

    const startRound = (roundId: string) => {
        setWhoWantsScene(produce((draft) => {
            const theRound = draft.rounds.find(round => round.id === roundId);
            if (!theRound) return;
            draft.activeRoundId = roundId;
            draft.stage = 'start';
        }));
    }

    const setStage = (stage: WhoWantsToStage) => {
        setWhoWantsScene(produce((draft) => {
            draft.stage = stage;
            if (stage == 'finish') {
                const theRound = draft.rounds.find(round => round.id === whoWantsScene.activeRoundId);
                if (!theRound) return;
                glog('here');
                theRound.answers.forEach(a => { if (!a.correct && !a.chosen) a.show = false } );
            }
        }));
    }

    function ViewRound({ round, isActive = false }: { round: WhoWantsToRound, isActive?: boolean }) {
        const [editingIdx, setEditingIdx] = useState<number | 'q' | null>(null);


        return <div key={round.id} className={clsx("flex border rounded-2xl m-4 p-4 gap-x-2", isActive ? "bg-green-200 border-2" : "bg-green-50")}>
            <div className={clsx("grid grid-cols-[max-content_max-content_max-content_1fr] flex-1 gap-x-2",
            )}>

                <div className="font-bold col-span-4">
                    <InlineEdit showEdit={editingIdx == 'q'} value={round.question} bold={true}
                        startEdit={() => setEditingIdx('q')}
                        doUpdate={(txt: string) => { setEditingIdx(null); updateQuestion(round.id, { question: txt }) }} />
                </div>

                {isActive
                    ? <><div>✅</div><div>👁️</div><div>✔️</div><div></div></>
                    : <><div>✅</div><div></div><div></div><div></div></>
                }
                {round.answers.map((a, idx) => {

                    return (
                        <React.Fragment key={idx}>
                            <input type="radio" checked={a.correct}
                                onChange={() => updateAnswer(round.id, idx, { correct: true })} />
                            {isActive
                                ? <input type="checkbox" checked={a.show}
                                    onChange={(e) => updateAnswer(round.id, idx, { show: e.target.checked })} />
                                : <div></div>
                            }
                            {isActive
                                ? <input type="radio" checked={a.chosen}
                                    onChange={(e) => updateAnswer(round.id, idx, { chosen: e.target.checked })} />
                                : <div></div>
                            }


                            <InlineEdit showEdit={editingIdx == idx} value={a.text} bold={a.correct}
                                startEdit={() => setEditingIdx(idx)}
                                doUpdate={(txt: string) => { setEditingIdx(null); updateAnswer(round.id, idx, { text: txt }) }} />
                        </React.Fragment>
                    )
                }
                )}
            </div>
            <div className="w-[1px] bg-black flex-none" />
            <div className="w-20 flex-none flex flex-col justify-between align-middle">

                {isActive ?
                <HoldToConfirmButton
                    
                    onConfirm={() => { showNextAnswer() }}
                    holdMs={0}
                >
                 Show answer
                </HoldToConfirmButton>
                :
                <HoldToConfirmButton
                    onConfirm={() => { startRound(round.id) }}
                    holdMs={1000}
                >
                    Start round
                </HoldToConfirmButton>
                }
                <HoldToConfirmButton
                    disabled={isActive}
                    onConfirm={() => { deleteRound(round.id) }}
                    danger
                    holdMs={2000}
                >
                    Delete
                </HoldToConfirmButton>
            </div>
        </div>

    }


    const activeRound = whoWantsScene.activeRoundId == null ? undefined : whoWantsScene.rounds.find(item => item.id === whoWantsScene.activeRoundId);
    
    if (!activeRound) return <div>what are we even doing</div>;
    const oneChosen = activeRound.answers.find(a => a.chosen);
    const tenseActive = whoWantsScene.stage == 'chat' && oneChosen != undefined;

glog("oneChosen: %o", oneChosen);

    return (

        <div className="flex flex-col md:flex-row-reverse">

            <div className="w-full md:w-1/3">
                <div className="flex gap-2">

                    <button className="rounded border px-3 py-1 cursor-pointer" onClick={() => setStage('chat')}>chat</button>
                    <button className={clsx("rounded border px-3 py-1 ",
                        tenseActive ?  "cursor-pointer" :'opacity-50'
                    )}
                        disabled={!tenseActive}
                        onClick={() => setStage('tense')}>tense</button>
                    <button className={clsx("rounded border px-3 py-1 ",
                        whoWantsScene.stage != 'tense' ? 'opacity-50' : "cursor-pointer"
                    )}
                        disabled={whoWantsScene.stage != 'tense'}
                        onClick={() => setStage('finish')}>finish</button>
                </div>
            </div>

            <div className="w-full md:w-2/3">
                <ViewRound round={activeRound} isActive />
                {whoWantsScene.rounds.map(round => round.id === whoWantsScene.activeRoundId ? null : <ViewRound round={round} />)}
                <NewRoundForm onSubmit={handleNewRound} />
            </div>
        </div>
    )

}