import { z } from 'zod';

export const CounterSchema = z.object({
    id: z.string(),
    name: z.string(),
    value: z.number(),
    show: z.boolean(),
    play: z.boolean(),
    lastIncrement: z.number(),
})

export const CounterHistorySchema = z.object({
    name: z.string(),
    value: z.number(),
})

export type CounterHistory = z.infer<typeof CounterHistorySchema>;

export type Counter = z.infer<typeof CounterSchema>;

const WhoWantsToAnswerSchema = z.object({
        text: z.string(),
        show: z.boolean(),
        correct: z.boolean().optional()
})
export type WhoWantsToAnswer = z.infer<typeof WhoWantsToAnswerSchema>;

const WhoWantsToRoundSchema = z.object({
    id: z.string(),
    question: z.string().default(""),
    show: z.boolean(),
    answers: WhoWantsToAnswerSchema.array(),
})
export type WhoWantsToRound = z.infer<typeof WhoWantsToRoundSchema>;

export const whoWantsToState = ['idle', 'start', 'chat', 'tense', 'win', 'lose'] as const;
export type WhoWantsToState = typeof whoWantsToState[number];

export const WhoWantsToSchema =
    z.object({
        activeRoundId: z.string().nullable(),
        showRound: z.boolean().default(false),
        chosen: z.number().nullable(),
        rounds: z.array(WhoWantsToRoundSchema),
        state: z.enum(whoWantsToState),
    });


export type IWhoWantsTo = z.infer<typeof WhoWantsToSchema>;

export const whoWantsToDefault: IWhoWantsTo = {
    activeRoundId: 'default',
    showRound: false,
    chosen: null,
    rounds: [
        {
            id: 'default',
            question: 'So this is it, is it?',
            show: true,
            answers: [
                {
                    text: 'Yes',
                    correct: true,
                    show: false
                },
                {
                    text: 'No',
                    correct: false,
                    show: false
                },
                {
                    text: 'Aubergine',
                    correct: false,
                    show: false
                },
                {
                    text: 'Kentucky',
                    correct: false,
                    show: false
                },
            ]
        }
    ],
    state: 'idle'
}