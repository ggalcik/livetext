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
        chosen: z.boolean(),
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

export const whoWantsToStage = ['idle', 'start', 'chat', 'tense', 'finish'] as const;
export type WhoWantsToStage= typeof whoWantsToStage[number];

export const WhoWantsToSchema =
    z.object({
        activeRoundId: z.string().nullable(),
        showRound: z.boolean().default(false),
        rounds: z.array(WhoWantsToRoundSchema),
        stage: z.enum(whoWantsToStage),
    });


export type IWhoWantsTo = z.infer<typeof WhoWantsToSchema>;

export const whoWantsToDefault: IWhoWantsTo = {
    activeRoundId: 'default',
    showRound: false,
    rounds: [
        {
            id: 'default',
            question: 'Do I care?',
            show: true,
            answers: [
                {
                    text: 'Yes',
                    correct: false,
                    show: false,
                    chosen: false,
                },
                {
                    text: 'No',
                    correct: true,
                    show: false,
                    chosen: false,
                },
                {
                    text: 'Maybe?',
                    correct: false,
                    show: false,
                    chosen: false,
                },
                {
                    text: 'New Hampshire',
                    correct: false,
                    show: false,
                    chosen: false,
                },
            ]
        }
    ],
    stage: 'idle'
}