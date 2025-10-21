import { z } from 'zod';

export const scenes =  ['banners', 'counter', 'panels', 'video', 'philbronium', 'evolution']
const scenesSchema = z.enum(scenes);
export type SceneType =  z.infer<typeof scenesSchema>

export const SceneAccordionDataSchema = z.object({
    adminSelected: scenesSchema,
    sceneSelected: scenesSchema
})

export type SceneAccordionData = z.infer<typeof SceneAccordionDataSchema>;