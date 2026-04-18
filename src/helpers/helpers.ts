export function randomOne<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomSample<T>(arr: T[], n: number): T[] {
  if (n < 0) throw new Error('n must be >= 0');

  const sampleSize = Math.min(n, arr.length);
  const copy = [...arr];

  for (let i = 0; i < sampleSize; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, sampleSize);
}