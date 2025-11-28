import {z} from 'zod';

export const IChalkboardPanelBoardSchema = z.object({
    fontSize: z.number(),
    text: z.string()
})

export const CHALKBOARD_FONTSIZE_MIN = 8;
export const CHALKBOARD_FONTSIZE_MAX = 36;

export type IChalkboardPanelBoard = z.infer<typeof IChalkboardPanelBoardSchema>;
export const IChalkboardPanelSchema = z.object({
    active: z.number().nullable(),
    boards: z.array(IChalkboardPanelBoardSchema),
})

export type IChalkboardPanel = z.infer<typeof IChalkboardPanelSchema>;

const boardDefault:IChalkboardPanelBoard = {text:'\n\n\n\n                Mr. dePlume\n                     (Greg)', fontSize: 20};
const boards = new Array(8);

export const defaultChalkboardPanel:IChalkboardPanel = {
    active: 0,
    boards: boards.fill(boardDefault,0,8),
}