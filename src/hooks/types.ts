import {z} from 'zod';

export const PersistentDataKeySchema = z.enum(["SceneAccordion", "counterScene"]);
export type PersistentDataKey = z.infer<typeof PersistentDataKeySchema>;
