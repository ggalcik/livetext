import { usePersistentState } from "../../../hooks/usePersistentState";
import { NewRoundForm } from "./NewRoundForm";
import { produce } from 'immer';
import { whoWantsToDefault, WhoWantsToSchema, type WhoWantsToRound, type WhoWantsToAnswer } from "./types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import React from "react";
import { number } from "zod";
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
            theRound.answers = theRound.answers.map(a => ({...a, show: false}));
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
            theRound.answers[idx] = { ...theRound.answers[idx], ...newAnswer }
        }));
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

    function ViewRound({ round, isActive = false }: { round: WhoWantsToRound, isActive?: boolean }) {
        const [editingIdx, setEditingIdx] = useState<number | 'q' | null>(null);


        return <div key={round.id} className={clsx("flex border rounded-2xl m-4 p-4 gap-x-2", isActive ? "bg-green-200 border-2" : "bg-green-50")}>
            <div className={clsx("grid grid-cols-[max-content_max-content_1fr] flex-1 gap-x-2",
            )}>

                <div className="font-bold col-span-3">
                    <InlineEdit showEdit={editingIdx == 'q'} value={round.question} bold={true}
                        startEdit={() => setEditingIdx('q')}
                        doUpdate={(txt: string) => { setEditingIdx(null); updateQuestion(round.id, { question: txt }) }} />
                </div>

                <div>✅</div><div>👁️</div><div></div>
                {round.answers.map((a, idx) => {

                    return (
                        <React.Fragment key={idx}>
                            <input type="radio" disabled={isActive} checked={a.correct}
                                onChange={() => updateAnswer(round.id, idx, { correct: true })} />
                            <input type="checkbox" checked={a.show} disabled={!isActive}
                                onChange={(e) => updateAnswer(round.id, idx, { show: e.target.checked })} />

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

                <HoldToConfirmButton
                    disabled={isActive}
                    onConfirm={() => { glog("round.id: ", round.id), startRound(round.id) }}
                    holdMs={1000}
                >
                    Start round
                </HoldToConfirmButton>
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

    return (

        <div className="flex flex-col md:flex-row-reverse">
            <div className="w-full md:w-1/2">controls</div>
            <div className="w-full md:w-1/2">
                <ViewRound round={activeRound} isActive />
                {whoWantsScene.rounds.map(round => round.id === whoWantsScene.activeRoundId ? null : <ViewRound round={round} />)}
                <NewRoundForm onSubmit={handleNewRound} />
            </div>
        </div>
    )

}