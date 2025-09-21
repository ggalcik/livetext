export const scenes = ['banners', 'atemporal', 'video'] as const;
export type SceneType = typeof scenes[number];