import { z } from 'zod';

export const scenes =  ['banners', 'philbronium', 'video', 'evolution', 'counter']
const scenesSchema = z.enum(scenes);
export type SceneType =  z.infer<typeof scenesSchema>

export const SceneAccordionDataSchema = z.object({
    adminSelected: scenesSchema,
    sceneSelected: scenesSchema
})

export type SceneAccordionData = z.infer<typeof SceneAccordionDataSchema>;