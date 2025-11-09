import {z} from 'zod';

export const PersistentDataKeySchema = z.enum(["SceneAccordion", "counterScene", "panelsScene", "soundboardData", 'slidesScene']);
export type PersistentDataKey = z.infer<typeof PersistentDataKeySchema>;
