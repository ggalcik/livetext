import { useEffect, useState } from "react";

type RandomSetOptions = {
  intervalMs?: number;
  minNumbers?: number;
  maxNumbers?: number;
  numberMin?: number;
  numberMax?: number;
  minNumberInterval?: number;
  maxNumberInterval?: number;
  addChancePercent?: number;
  allowDuplicates?: boolean;
};

type RandomEntry = {
  value: number;
  remainingIntervals: number;
};

const defaultOptions: Required<RandomSetOptions> = {
  intervalMs: 1000,
  minNumbers: 1,
  maxNumbers: 4,
  numberMin: 0,
  numberMax: 8,
  minNumberInterval: 3,
  maxNumberInterval: 6,
  addChancePercent: 20,
  allowDuplicates: false,
};

export function useRandomSet(
  active: boolean = false,
  options: RandomSetOptions = {}
): number[] {
  const opts = { ...defaultOptions, ...options };

  opts.minNumbers = Math.min(opts.minNumbers, opts.numberMax - opts.numberMin + 1);

  const [numbers, setNumbers] = useState<RandomEntry[]>([]);

  useEffect(() => {
    if (!active) {
      setNumbers([]);
      return;
    }

    const timer = setInterval(() => {
      setNumbers(prev => {
        // 1. Decrement lifespan and remove expired
        const updated = prev
          .map(entry => ({
            ...entry,
            remainingIntervals: entry.remainingIntervals - 1,
          }))
          .filter(entry => entry.remainingIntervals > 0);

        // 2. Determine how many new numbers we can add
        const existingValues = new Set(updated.map(entry => entry.value));

        let next = [...updated];

        const slotsToFill = opts.maxNumbers - next.length;

        for (let i = 0; i < slotsToFill; i++) {

          const mustFill = next.length < opts.minNumbers;
          const chance = mustFill ? 0 : Math.random() * 100;

          if (chance <= opts.addChancePercent) {
            const newValue = opts.allowDuplicates
              ? pickRandom(opts.numberMin, opts.numberMax)
              : pickRandom(opts.numberMin, opts.numberMax, existingValues);

            if (newValue === null) break;

            const remainingIntervals = randomInRange(
              opts.minNumberInterval,
              opts.maxNumberInterval
            );

            next.push({ value: newValue, remainingIntervals });
            existingValues.add(newValue);
          }
        }

        return next;
      });
    }, opts.intervalMs);

    return () => clearInterval(timer);
  }, [active, opts]);

  return numbers.map(entry => entry.value).sort();
}

// --- helpers ---
function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(
  min: number,
  max: number,
  existing?: Set<number>
): number | null {
  if (!existing) {
    return randomInRange(min, max);
  }

  const available: number[] = [];
  for (let i = min; i <= max; i++) {
    if (!existing.has(i)) available.push(i);
  }

  if (available.length === 0) return null;
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}
