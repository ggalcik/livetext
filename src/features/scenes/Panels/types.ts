import { z } from 'zod';

export const panelTypes = [
    'Why So Angry', 
    'HolyHonkers',
    'Chalkboard', 
    'Orchestra', 
    'Pivat',
    'Aaaamennn', 
    'Las Lajas',
] as const;

export const IPanelTypeSchema = z.enum(panelTypes);
export type IPanelType = z.infer<typeof IPanelTypeSchema>;

export const IPanelSchema = z.object({
    element: z.unknown(), // jsx element
    backgroundElement: z.unknown().optional(), // jsx element
    adminElement: z.unknown().optional(), // jsx element
    soundEnter: z.string().optional(),
    boomerangDelay: z.number().optional(),
    noViewport: z.boolean().optional(),
    ctrlViewport: z.boolean().optional(),
});
export type IPanel = z.infer<typeof IPanelSchema>;

export const IPanelsSchema = z.record(IPanelTypeSchema, IPanelSchema);
export type IPanels = z.infer<typeof IPanelsSchema>;

const IPanelDataBaseSchema = z.object({
    panel: IPanelTypeSchema.exclude(['Orchestra','Why So Angry']),
    duration: z.number().optional(),
});

const IPanelOrchestraSchema = IPanelDataBaseSchema.extend({
    panel: z.literal('Orchestra'),
    stopVideo: z.string().optional(),
});

const IPanelWhySoAngrySchema = IPanelDataBaseSchema.extend({
    panel: z.literal('Why So Angry'),
    rheazon: z.string().optional(),
    showCopyright: z.boolean().optional(),
});

export type IPanelOrchestra = z.infer<typeof IPanelOrchestraSchema>;

const IPanelDataSchema = z.discriminatedUnion('panel', [
  IPanelDataBaseSchema,
  IPanelOrchestraSchema,
  IPanelWhySoAngrySchema,
]);


export const IPanelSceneSchema = z.object({
    active: IPanelDataSchema.nullable()
});

export type IPanelScene = z.infer<typeof IPanelSceneSchema>;

