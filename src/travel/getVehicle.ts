import { Destination, Traveller, VehicleLog } from './type';

export const VEHICLE = {
  PLANE: 'plane',
  TRAIN: 'train',
  CAR: 'car',
  BUS: 'bus',
  METRO: 'metro',
  BICK: 'bick',
  FOOT: 'foot',
} as const;

export type Vehicle = ValueOf<typeof VEHICLE>;

export function getVehicle(traveller: Traveller, destination: Destination): VehicleLog {
  if (destination.destCity === 'Shanghai') {
    const seed = Math.random();
    if (seed < 0.4) {
      return {
        vehicle: VEHICLE.METRO,
        vehicleCost: 5,
      };
    }
    if (seed >= 0.4 && seed < 0.7) {
      return {
        vehicle: VEHICLE.BUS,
        vehicleCost: 2,
      };
    }
    if (seed >= 0.7 && seed < 0.85) {
      return {
        vehicle: VEHICLE.BICK,
        vehicleCost: 1.5,
      };
    }
    return {
      vehicle: VEHICLE.FOOT,
      vehicleCost: 0,
    };
  }
  if (destination.destCity === 'Beijing') {
    const seed = Math.random();
    if (seed < 0.6) {
      return {
        vehicle: VEHICLE.PLANE,
        vehicleCost: 700,
      };
    }
    if (seed >= 0.6 && seed < 0.75) {
      return {
        vehicle: VEHICLE.CAR,
        vehicleCost: 400,
      };
    }
    return {
      vehicle: VEHICLE.TRAIN,
      vehicleCost: 576,
    };
  }
  if (destination.destCity === 'HangZhou') {
    const seed = Math.random();
    if (seed < 0.75) {
      return {
        vehicle: VEHICLE.CAR,
        vehicleCost: 40,
      };
    }
    if (seed >= 0.6 && seed < 0.65) {
      return {
        vehicle: VEHICLE.PLANE,
        vehicleCost: 300,
      };
    }
    return {
      vehicle: VEHICLE.TRAIN,
      vehicleCost: 65,
    };
  }
  if (destination.destCity === 'SuZhou') {
    const seed = Math.random();
    if (seed < 0.5) {
      return {
        vehicle: VEHICLE.CAR,
        vehicleCost: 10,
      };
    }
    if (seed >= 0.5 && seed < 0.55) {
      return {
        vehicle: VEHICLE.PLANE,
        vehicleCost: 200,
      };
    }
    return {
      vehicle: VEHICLE.TRAIN,
      vehicleCost: 35,
    };
  }
  return {
    vehicle: VEHICLE.CAR,
    vehicleCost: 100,
  };
}
