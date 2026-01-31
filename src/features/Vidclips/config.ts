import type { Vidclip, VidSettings } from "./types";

export const VIDDIR = '../../../video';

export const VIDCLIPS:Record<string, VidSettings> = {
    "Molly's back e1": {
        filename: 'mollys back edit 1.mp4',
    },
    "clarke": {
        filename: 'clarke no fade.mp4',
    },
    "pivat!": {
        filename: 'pivat clip.mp4',
    },
    "vegetables": {
        filename: 'eat your vegetables.mp4',
    },
    "Sulfur.": {
        filename: 'sulfur.mp4',
    },
    "intermission": {
        filename: 'intermission.mp4',
        loop: true,
    } ,   "abiogenesis": {
        filename: 'abiogenesis.mp4',
    }
}