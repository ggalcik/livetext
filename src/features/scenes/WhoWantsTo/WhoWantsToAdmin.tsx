import { usePersistentState } from "../../../hooks/usePersistentState";
import { NewRoundForm } from "./NewRoundForm";
import { produce } from 'immer';
import { whoWantsToDefault, WhoWantsToSchema, type WhoWantsToRound, type WhoWantsToAnswer } from "./types";
import clsx from "clsx";
import { useState } from "react";
import React from "react";
import { number } from "zod";

export default function WhoWantsToAdmin() {

    const [whoWantsScene, setWhoWantsScene] = usePersistentState({
        storageKey: "whoWantsScene",
        schema: WhoWantsToSchema,
        fallback: whoWantsToDefault,
    });

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

    function showRound(round: WhoWantsToRound, isActive: boolean = false) {
        const [editingIdx, setEditingIdx] = useState<number | 'q' | null>(null);
        const cellBase =
            "w-full box-border px-1 py-0.5 text-base leading-6 rounded border border-transparent";

        return <div key={round.id} className={clsx("grid grid-cols-[max-content_max-content_1fr] border rounded-2xl m-4 p-4 gap-2",
            isActive ? "bg-green-200 border-2" : "bg-green-50")}>

            <div className="font-bold col-span-3">{round.question}</div>

            <div>✅</div><div>👁️</div><div></div>
            {round.answers.map((a, idx) => {
                const isEditing = editingIdx === idx;

                return (
                    <React.Fragment key={idx}>
                        <input type="radio" disabled={isActive} checked={a.correct}
                            onChange={() => updateAnswer(round.id, idx, { correct: true })} />
                        <input type="checkbox" checked={a.show} disabled={!isActive}
                            onChange={(e) => updateAnswer(round.id, idx, { show: e.target.checked })} />
                        { editingIdx == idx ? (
                            <input
                                className={clsx(cellBase, "border-gray-300 focus:border-gray-400 bg-white")}
                                defaultValue={a.text}
                                autoFocus
                                onBlur={(e) => {
                                    const nextText = e.target.value;
                                    setEditingIdx(null);
                                    updateAnswer(round.id, idx, { text: nextText });
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}
                            />
                        ) : (
                            <div
                                className={clsx(
                                    cellBase,
                                    "cursor-text",
                                    a.correct && "font-bold"
                                )}
                                onClick={() => setEditingIdx(idx)}
                            >
                                {a.text}
                            </div>
                        )}
                        {/* <div className={clsx(a.correct && "font-bold")}>{a.text}</div> */}
                    </React.Fragment>
                )
            }
            )}

        </div>

    }


    const activeRound = whoWantsScene.activeRoundId == null ? undefined : whoWantsScene.rounds.find(item => item.id === whoWantsScene.activeRoundId);

    if (!activeRound) return <div>what are we even doing</div>;

    return (

        <div className="flex  flex-col md:flex-row-reverse">
            <div className="w-full md:w-1/2">controls</div>
            <div className="w-full md:w-1/2">
                {showRound(activeRound, true)}
                {whoWantsScene.rounds.map(round => round.id === whoWantsScene.activeRoundId ? null : showRound(round))}
                <NewRoundForm onSubmit={handleNewRound} />
            </div>
        </div>
    )

}