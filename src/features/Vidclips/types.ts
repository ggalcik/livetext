import { z } from 'zod';

export const VidSettingsSchema = z.object({
    filename: z.string(),
    loop: z.boolean().optional(),
    stayOnDone: z.boolean().optional(),
});
export type VidSettings = z.infer<typeof VidSettingsSchema>;

export const VidclipSchema = z.object({
    play_timestamp: z.number().optional(),
    vidSettings: VidSettingsSchema.optional(),
})

export type Vidclip = z.infer<typeof VidclipSchema>;

export const vidclipDefault: Vidclip = {
    play_timestamp: 0,
    vidSettings: {
        filename: 'mollys back.mp4',
        loop: false,
        stayOnDone: false
    }
}


