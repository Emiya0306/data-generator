import { getInt } from '../utils';

export function getAge() {
  return getInt({
    min: 4,
    max: 50,
    prefers: [
      { range: [4, 18], percent: 0.25 },
      { range: [18, 28], percent: 0.35 },
      { range: [28, 39], percent: 0.25 },
      { range: [28, 50], percent: 0.15 },
    ],
  });
}
