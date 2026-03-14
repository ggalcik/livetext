import { z } from 'zod';

export const intonementSections = [
    'Intro', 
    'Wisdom',
    'Knowledge', 
    'Truth', 
    'Nyeh', 
] as const;

export const IIntonementTypeSchema = z.enum(intonementSections);
export type IIntonementType = z.infer<typeof IIntonementTypeSchema>;

export const IIntonementSceneSchema = z.object({
    active: IIntonementTypeSchema,
    advanced: z.boolean().optional(),
});

export type IIntonementScene = z.infer<typeof IIntonementSceneSchema>;

