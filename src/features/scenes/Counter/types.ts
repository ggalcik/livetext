export type Counter = {
  id: string;
  name: string;
  value: number;
  show: boolean;
  play: boolean;
  lastIncrement: number;
};

export type CounterScene = {
  counters: Counter[];
  history: Record<string, Counter[]>;
};
