import * as React from "react";
import type { WhoWantsToAnswer, WhoWantsToRound } from "./types";

function makeId(): string {
    // decent browser id: crypto if available, fallback otherwise
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function trimNonEmpty(s: string): boolean {
    return s.trim().length > 0;
}

type NewRoundFormProps = {
    initialAnswersCount?: number;
    onSubmit: (round: WhoWantsToRound) => void;
};

export function NewRoundForm({ initialAnswersCount = 4, onSubmit }: NewRoundFormProps) {
    const [question, setQuestion] = React.useState<string>("");
    const [answers, setAnswers] = React.useState<WhoWantsToAnswer[]>(
        Array.from({ length: initialAnswersCount }, () => ({
            text: "",
            show: false,
            correct: false,
        }))
    );

    // one radio group: store the index of the correct answer (or null)
    const [correctIndex, setCorrectIndex] = React.useState<number | null>(null);

    const [error, setError] = React.useState<string | null>(null);

    const allTextsOk =
        trimNonEmpty(question) && answers.every((a) => trimNonEmpty(a.text));

    const correctOk = correctIndex !== null;

    const canSubmit = allTextsOk && correctOk;

    function setAnswerText(i: number, text: string) {
        setAnswers((prev) =>
            prev.map((a, idx) => (idx === i ? { ...a, text } : a))
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!trimNonEmpty(question)) {
            setError("Question text can’t be empty.");
            return;
        }
        if (!answers.every((a) => trimNonEmpty(a.text))) {
            setError("All answer texts must be non-empty.");
            return;
        }
        if (correctIndex === null) {
            setError("Pick which answer is correct.");
            return;
        }

        setError(null);

        const round: WhoWantsToRound = {
            id: makeId(),
            question: question.trim(),
            show: false,
            answers: answers.map((a, idx) => ({
                text: a.text.trim(),
                show: a.show,
                correct: idx === correctIndex ? true : undefined,
            })),
        };

        onSubmit(round);

        // optional: reset form after submit
        // setQuestion("");
        // setAnswers((prev) =>
        //     prev.map(() => ({ text: "", show: false, correct: false }))
        // );
        // setCorrectIndex(null);
    }

    return (
        <form className="grid grid-cols-[min-content_min-content_1fr] items-center gap-2 m-4 p-4 border border-amber-700" onSubmit={handleSubmit} >
            {/* Question row */}
            <div className="font-medium">Q</div>
            <div /> {/* no radio for question */}
            <input
                className=" rounded border px-2 py-1"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
            />


            {/* Answer rows */}
            {answers.map((a, i) => (
                <React.Fragment key={i}>
                    <div className="font-medium">{`A${i + 1}`}</div>

                    <div className="flex justify-center">
                        <input
                            className="w-6 h-6 "
                            tabIndex={-1}
                            type="radio"
                            name="correctAnswer"
                            checked={correctIndex === i}
                            onChange={() => setCorrectIndex(i)}
                        />
                    </div>

                    <input
                        className=" rounded border px-2 py-1"
                        value={a.text}
                        onChange={(e) => setAnswerText(i, e.target.value)}
                        placeholder={`Answer ${i + 1}`}
                    />
                </React.Fragment>

            ))}

            {error && <div className="text-sm col-span-3 text-red-600">{error}</div>}

            <div className="flex items-center col-span-3 gap-2">
                <button
                    type="submit"
                    disabled={!canSubmit}
                    className="rounded border px-3 py-1 disabled:opacity-50 cursor-pointer"
                >
                    Add round
                </button>

                {!canSubmit && (
                    <div className="text-sm text-zinc-500">
                        fill it out, man
                    </div>
                )}
            </div>
        </form>
    );
}
