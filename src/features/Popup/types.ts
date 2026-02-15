 import { z } from 'zod';
 
 export const PopupDataSchema = z.object({
     showBlip: z.boolean(),
 });
 export type PopupData = z.infer<typeof PopupDataSchema>;