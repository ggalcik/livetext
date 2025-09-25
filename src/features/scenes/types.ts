export const scenes = ['banners', 'atemporal', 'video', 'evolution', 'counter'] as const;
export type SceneType = typeof scenes[number];