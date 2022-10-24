import dayjs from 'dayjs';

import { getInt } from '../utils';

export function getDate(startTime: number) {
  const day = getInt({
    min: 0,
    max: 6,
    prefers: (() => {
      switch (startTime) {
        case 1664553600000: return [
          { items: [0, 1], percent: 0.5 },
          { items: [2, 3, 4, 5], percent: 0.3 },
          { items: [6, 7], percent: 0.2 },
        ];
        case 1633017600000: return [
          { items: [0, 1], percent: 0.4 },
          { items: [2, 3, 4, 5], percent: 0.4 },
          { items: [6, 7], percent: 0.2 },
        ];
        case 1601481600000: return [
          { items: [0, 1], percent: 0.6 },
          { items: [2, 3, 4, 5], percent: 0.2 },
          { items: [6, 7], percent: 0.2 },
        ];
        default: return [];
      }
    })(),
  });
  const time = day * 3600000 * 24;
  return dayjs(startTime + time).format('YYYY-MM-DD');
}
