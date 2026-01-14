import { z } from 'zod';

export const persistentDataKeys = [
    "SceneAccordion",
    "counterScene",
    "panelsScene",
    "soundboardData",
    'slidesScene',
    'chalkboardPanel',
    'vidclip'
];

export const PersistentDataKeySchema = z.enum(persistentDataKeys);
export type PersistentDataKey = z.infer<typeof PersistentDataKeySchema>;
