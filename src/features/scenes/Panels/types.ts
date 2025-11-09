import { type JSX } from 'react';
import { z } from 'zod';

export const panelTypes = ['copy Rhizic','Las Lajas','Aaaamennn', 'HolyHonkers'] as const;

export const IPanelTypeSchema = z.enum(panelTypes);
export type IPanelType = z.infer<typeof IPanelTypeSchema>;

export const IPanelSchema = z.object({
    element: z.unknown(), // jsx element
    backgroundElement: z.unknown().optional(), // jsx element
    adminElement: z.unknown().optional(), // jsx element
    soundEnter: z.string().optional(),
    boomerangDelay: z.number().optional(),
     noViewport: z.boolean().optional(),
});
export type IPanel = z.infer<typeof IPanelSchema>;

export const IPanelsSchema = z.record(IPanelTypeSchema, IPanelSchema);
export type IPanels = z.infer<typeof IPanelsSchema>;


export const IPanelSceneSchema = z.object({
    active: z.object({
        panel: IPanelTypeSchema,
        duration: z.number().optional(),
       
    }).nullable()
});
export type IPanelScene = z.infer<typeof IPanelSceneSchema>;

