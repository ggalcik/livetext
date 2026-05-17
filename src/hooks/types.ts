import { z } from 'zod';

export const persistentDataKeys = [
    "SceneAccordion",
    "counterScene",
    "panelsScene",
    "soundboardData",
    'slidesScene',
    'chalkboardPanel',
    'vidclip',
    'blipData',
    'whySoAngryBlip'
];

export const PersistentDataKeySchema = z.enum(persistentDataKeys);
export type PersistentDataKey = z.infer<typeof PersistentDataKeySchema>;
