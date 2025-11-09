import { z } from "zod";

// Individual slide
export const SlideSchema = z.object({
  filename: z.string(),
  marked: z.boolean().default(false),
});

// Panel scene (top-level saved state)
export const SlidesSceneSchema = z.object({
  slides: z.array(SlideSchema),
  selected: z.string().optional(),
});

// What usePersistentState will infer
export type SlidesScene = z.infer<typeof SlidesSceneSchema>;

// Fallback for first load
export const SlidesSceneFallback: SlidesScene = {
  slides: [],
};
