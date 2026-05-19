import { z } from 'zod';

export const blipTypes = [
    'Why Angry', 'Holy Honkers', 'Orchestra', 'Snail', 'Goalpost', 'Mamma Mia', 'Egregore', 'Names'
] as const;

export const blipTypeSchema = z.enum(blipTypes);
export type IBlipType = z.infer<typeof blipTypeSchema>;

export const BlipDataSchema = z.object({
    showBlip: blipTypeSchema.optional(),
    showBlipVariant: z.string().optional(),
    deactivateRequestId: z.number().optional(),
});
export type BlipData = z.infer<typeof BlipDataSchema>;

export const RheasonSchema = z.object({
    person: z.string(),
    saying: z.string(),
});
export type Rheason = z.infer<typeof RheasonSchema>;

export const WhySoAngryBlipSchema = z.object({
    used: z.array(RheasonSchema),
});
export type WhySoAngryBlip = z.infer<typeof WhySoAngryBlipSchema>;

export const NamesBlipSchema = z.object({
    names: z.string(),
    currentDate: z.string(),
    history: z.record(z.string()).optional(),
});
export type NamesBlip = z.infer<typeof NamesBlipSchema>;


export type BlipProps = {
    endBlip: () => void,
    deactivateRequestId?: number,
    variant?: string,
    opts?: Record<string, string|boolean>,
};

type BlipOpts = Record<string, string | boolean>;

export type BlipConfig = {
    component: React.ComponentType<BlipProps>;
    opts: BlipOpts;
    variants?: BlipVariant[];
    handlesDeactivate?: boolean;
};

export type BlipVariant =
    | string
    | {
        variant: string;
        opts?: BlipOpts;
    };

export type BlipEntry =
    | React.ComponentType<BlipProps>
    | BlipConfig;
