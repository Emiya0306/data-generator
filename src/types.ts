export interface Prefer {
  range?: [number, number];
  items?: number[];
  percent: number;
}

export interface RandomArgs {
  prefers?: Prefer[];
}
