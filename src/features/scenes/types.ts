export const scenes = ['banners', 'atemporal', 'video', 'evolution'] as const;
export type SceneType = typeof scenes[number];