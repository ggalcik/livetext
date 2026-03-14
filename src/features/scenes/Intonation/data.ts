import { type IIntonementType } from './types';
import afterIntro from './assets/snail_choral_1a.mp3';
import afterWisdom from './assets/snail_choral_1b.mp3';
import afterKnowledge from './assets/snail_choral_2.mp3';
import afterTruth from './assets/snail_choral_3.mp3';
import afterClosing from './assets/snail_choral_nyeh.mp3';


export const afterChants: Record<IIntonementType, string> = {
    'Intro': afterIntro,
    'Wisdom': afterWisdom,
    'Knowledge': afterKnowledge,
    'Truth': afterTruth,
    'Nyeh': afterClosing,
}

export const intonations: Record<IIntonementType, string> = {
    'Intro': `You are invited to join me in the escargological intonation.`,
    'Wisdom': `We beseech that which shall not be beseechéd, 
        we implore that which shall not be imploréd, 
        we give thanks to that which cares not for our thanks, 
        but has nevertheless expressed our universe through its glorious nethers, 
        the Ontological Snail.`,
    'Knowledge': `Being out of space time and mat-ter, 
        the Ontological Snail, 
        without thought intent or malice, 
        divinely shimmied through its celestial garden 
        and cast off the unneeded effluence 
        incompatible with its perfetic existence: 
        our physical realm. `,
    'Truth': `We know this because we have spoken the truth, 
        and in listening to the truth we know it truth to be, 
        and when the truth be written 
        those writings shall represent the truth, 
        for the writings shall confirm their truth, 
        which shall be written on the shells of our hearts 
        for this day, and for all days to come.`,
    'Nyeh': `All this we hold,
        not in prayer but in confidence, 
        not in supplication but in understanding, 
        not with the weakness of faith 
        but with the shells of our hearts:
        Nyeh.`,
}
