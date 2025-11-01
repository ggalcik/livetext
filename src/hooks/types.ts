import {z} from 'zod';

export const PersistentDataKeySchema = z.enum(["SceneAccordion", "counterScene", "panelsScene", "soundboardData"]);
export type PersistentDataKey = z.infer<typeof PersistentDataKeySchema>;
