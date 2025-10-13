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

export const CounterSceneSchema =
  z.object({
    counters: z.array(CounterSchema).default([]),
    currentDate: z.string(),
    history: z.record(z.string(), z.array(CounterHistorySchema)).optional(),
    showDate: z.string().optional()
  });

export type CounterScene = z.infer<typeof CounterSceneSchema>;
