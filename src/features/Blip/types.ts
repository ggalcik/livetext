import { z } from 'zod';

export const blipTypes = [
    'Why Angry', 'Holy Honkers', 'Holy Sulfur', 'Orchestra', 'Snail', 'Goalpost', 'Mamma Mia', 'Egregore'
] as const;

export const blipTypeSchema = z.enum(blipTypes);
export type IBlipType = z.infer<typeof blipTypeSchema>;

export const BlipDataSchema = z.object({
    showBlip: blipTypeSchema.optional(),
});
export type BlipData = z.infer<typeof BlipDataSchema>;


export type BlipProps = {
    endBlip: () => void,
    opts?: Record<string, string|boolean>,
};

export type BlipEntry =
  | React.ComponentType<BlipProps>
  | {
      component: React.ComponentType<BlipProps>;
      opts: Record<string, string|boolean>;
    };