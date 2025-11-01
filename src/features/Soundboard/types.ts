import {z} from 'zod';

export const SoundboardDataSchema = z.object({
    highlightNames: z.string().array(),
})
export type SoundboardData = z.infer<typeof SoundboardDataSchema>;

export const soundboardDataDefault: SoundboardData = {
    highlightNames: []
};
 