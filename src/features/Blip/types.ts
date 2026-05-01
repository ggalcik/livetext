import { z } from 'zod';

export const blipTypes = [
    'Why Angry', 'Holy Honkers', 'Orchestra', 'Snail', 'Goalpost', 'Mamma Mia', 'Egregore'
] as const;

export const blipTypeSchema = z.enum(blipTypes);
export type IBlipType = z.infer<typeof blipTypeSchema>;

export const BlipDataSchema = z.object({
    showBlip: blipTypeSchema.optional(),
    showBlipVariant: z.string().optional(),
});
export type BlipData = z.infer<typeof BlipDataSchema>;


export type BlipProps = {
    endBlip: () => void,
    variant?: string,
    opts?: Record<string, string|boolean>,
};

type BlipOpts = Record<string, string | boolean>;

export type BlipVariant =
    | string
    | {
        variant: string;
        opts?: BlipOpts;
    };

export type BlipEntry =
  | React.ComponentType<BlipProps>
  | {
      component: React.ComponentType<BlipProps>;
      opts: BlipOpts;
      variants?: BlipVariant[];
    };
