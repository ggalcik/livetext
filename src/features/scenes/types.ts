export const scenes = ['banners', 'philbronium', 'video', 'evolution', 'counter'] as const;
export type SceneType = typeof scenes[number];