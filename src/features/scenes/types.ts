import { z } from 'zod';

// video, evolution
export const scenes =  ['banners', 'counter', 'panels', 'slides', 'whowants', 'intonation', 'philbronium'];
const scenesSchema = z.enum(scenes);
export type SceneType =  z.infer<typeof scenesSchema>

export const SceneAccordionDataSchema = z.object({
    adminSelected: scenesSchema,
    sceneSelected: scenesSchema
})

export type SceneAccordionData = z.infer<typeof SceneAccordionDataSchema>;

export const overlays = ['overcards', 'sounds', 'data', 'fonts'];
const overlaysSchema = z.enum(overlays);
export type OverlayType = z.infer<typeof overlaysSchema>;

