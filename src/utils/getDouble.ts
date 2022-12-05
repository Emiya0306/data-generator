import { RandomArgs } from '../types';

interface GetDoubleArgs extends RandomArgs {
  min?: number;
  max?: number;
  decimal?: number;
}
export function getDouble(args: GetDoubleArgs) {
  const { min = 0, max = 65536, prefers, decimal = 0 } = args;
  // 当有随机偏好时
  if (prefers) {
    // 随机百分比
    const step = Math.random();
    let cStep = 0;
    for (const prefer of prefers) {
      cStep += prefer.percent;
      // 如果命中百分比
      if (cStep >= step) {
        // 如果是范围型的，则随机范围内的数字
        if (prefer.range) {
          const [perferMin, perferMax] = prefer.range!;
          return Math.round(perferMin + Math.random() * (perferMax - perferMin))
            + Math.random().toFixed(decimal);
        }
        // 如果是枚举型的，则随机枚举内的数字
        if (prefer.items) {
          return prefer.items![Math.floor(Math.random() * (prefer.items.length - 1))];
        }
      } else {
        // 如果命中之外的百分比，则正常随机数
        return Math.round(min + Math.random() * (max - min))
          + Math.random().toFixed(decimal);
      }
    }
  }
  // 当没有随机偏好时，正常随机数
  return Math.round(min + Math.random() * (max - min))
    + Math.random().toFixed(decimal);
}
