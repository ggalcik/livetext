import { z } from 'zod';

export const blipTypes = [
    'Holy Honkers', 'Egregore',
] as const;

export const blipTypeSchema = z.enum(blipTypes);
export type IBlipType = z.infer<typeof blipTypeSchema>;

export const BlipDataSchema = z.object({
    showBlip: blipTypeSchema.optional(),
});
export type BlipData = z.infer<typeof BlipDataSchema>;


export type BlipProps = {
    endBlip: () => void,
};