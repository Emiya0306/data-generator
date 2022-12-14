import { Gender } from '../utils';

export interface Traveller {
  name: string;
  gender: Gender;
  age: number;
  local: boolean;
}

export interface Destination {
  destCity: string;
  destScenic: string;
  destCost: number;
}

export interface VehicleLog {
  vehicle: string;
  vehicleCost: number;
}

export interface Date {
  dateKey: string;
  year: number;
  month: number;
  day: number;
}

export type TravellerLog = Traveller & Destination & VehicleLog & Date;
