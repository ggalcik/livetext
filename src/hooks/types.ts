import { z } from 'zod';

export const persistentDataKeys = [
    "adminAccordionState",
    "SceneAccordion",
    "counterScene",
    "panelsScene",
    "soundboardData",
    'slidesScene',
    'chalkboardPanel',
    'vidclip',
    'blipData',
    'whySoAngryBlip',
    'NamesBlip',
    'AngryBlip',
    'helloBlip',
    'winnerPanel',
    'christolyzerPanel'
];

export const PersistentDataKeySchema = z.enum(persistentDataKeys);
export type PersistentDataKey = z.infer<typeof PersistentDataKeySchema>;
