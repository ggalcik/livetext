import { z } from 'zod';

export const CHALKBOARD_FONTSIZE_MIN = 8;
export const CHALKBOARD_FONTSIZE_MAX = 36;

// one board
export const IChalkboardPanelBoardSchema = z.object({
    fontSize: z.number(),
    text: z.string()
})
export type IChalkboardPanelBoard = z.infer<typeof IChalkboardPanelBoardSchema>;

// a set of [8] boards
export const IChalkboardPanelBoardSetSchema = z.object({
    active: z.number(),
    boards: z.array(IChalkboardPanelBoardSchema),
});
export type IChalkboardPanelBoardSet = z.infer<typeof IChalkboardPanelBoardSetSchema>;

// data for the entire Panel
export const IChalkboardPanelSchema = z.object({
    active: z.number(),
    boardSets: IChalkboardPanelBoardSetSchema.array(),
    showIntro: z.boolean().optional(),
})

export type IChalkboardPanel = z.infer<typeof IChalkboardPanelSchema>;

const boardDefault: IChalkboardPanelBoard = { text: '\n\n\n\n                Mr. dePlume\n                     (Greg)', fontSize: 20 };
const boards = new Array(8);

export const defaultChalkboardPanel: IChalkboardPanel = {
    active: 0,
    boardSets: [
        {
            active: 0,
            boards: boards.fill(boardDefault, 0, 8),
        },
        {
            active: 0,
            boards: boards.fill(boardDefault, 0, 8),
        }, {
            active: 0,
            boards: boards.fill(boardDefault, 0, 8),
        }, {
            active: 0,
            boards: boards.fill(boardDefault, 0, 8),
        },
    ],
    showIntro: true,
}