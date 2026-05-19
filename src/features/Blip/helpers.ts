import { parse } from "date-fns";
import type { CSSProperties } from "react";

    
    
    export function toDisplayDate(dateString?: string) : string {
        if (dateString) {
            return  parse(dateString, 'yyyyMMdd', new Date()).toDateString() + ' A.D.';
        }
        return new Date().toDateString() + ' A.D.';
    }

type Range = {
    min: number;
    max: number;
};

function hashSeed(seed: string) {
    let hash = 2166136261;

    for (let i = 0; i < seed.length; i += 1) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
}

function createSeededRandom(seed: number) {
    let state = seed;

    return function seededRandom() {
        state += 0x6D2B79F5;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function randomInRange(random: () => number, range: Range) {
    return range.min + (random() * (range.max - range.min));
}

function randomColorChannel(random: () => number, range: Range) {
    return Math.round(randomInRange(random, range));
}

export function getDailyLineStyle(dateString: string, line: number): CSSProperties {
    const scaleRange = { min: 0.78, max: 1.36 };
    const rotationRange = { min: -7, max: 7 };
    const translateXRange = { min: -20, max: 20 };
    const backgroundRange = { min: 20, max: 120 };
    const textRange = { min: 200, max: 255 };
    const seed = hashSeed(`${dateString}:${line}`);
    const random = createSeededRandom(seed);

    const scale = randomInRange(random, scaleRange);
    const rotation = randomInRange(random, rotationRange);
    const translateX = randomInRange(random, translateXRange);
    const backgroundColor = `rgb(${randomColorChannel(random, backgroundRange)} ${randomColorChannel(random, backgroundRange)} ${randomColorChannel(random, backgroundRange)})`;
    const color = `rgb(${randomColorChannel(random, textRange)} ${randomColorChannel(random, textRange)} ${randomColorChannel(random, textRange)})`;

    return {
        transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotation}deg)`,
        backgroundColor,
        color,
    };
}
