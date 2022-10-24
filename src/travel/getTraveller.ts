import { getFirstName, getGender, getLastName } from '../utils';

import { getAge } from './getAge';
import { getIsLocal } from './getIsLocal';
import { getDestCost, getDestination } from './getDestination';
import { Destination, Traveller, TravellerLog } from './type';
import { getVehicle } from './getVehicle';
import { getDate } from './getDate';

// shanghai_resident_travel
export function getTraveller(startTime: number) {
  const gender = getGender();
  const traveller: Traveller = {
    name: `${getFirstName()}${getLastName(gender)}`,
    gender,
    age: getAge(),
    local: getIsLocal(),
  };
  const [destCity, destScenic] = getDestination(traveller);
  const destCost = getDestCost(destScenic);
  const destination: Destination = { destCity, destScenic, destCost };
  const { vehicle, vehicleCost } = getVehicle(traveller, destination);

  const date = getDate(startTime);
  return { ...traveller, ...destination, vehicle, vehicleCost, date };
}

export function getTravellers() {
  const travellers: TravellerLog[] = [];
  for (let i = 0; i < 35374; i += 1) {
    travellers.push(getTraveller(1601481600000));
  }
  for (let i = 0; i < 25836; i += 1) {
    travellers.push(getTraveller(1633017600000));
  }
  for (let i = 0; i < 40246; i += 1) {
    travellers.push(getTraveller(1664553600000));
  }
  const headers = ['Name', 'Gender', 'Age', 'Local', 'Dest_City', 'Dest_Scenic', 'Dest_Cost', 'Vehicle', 'Vehicle_Cost', 'Date'].join(',');
  const data = travellers.map((record) => [
    record.name,
    record.gender,
    record.age,
    String(record.local),
    record.destCity,
    record.destScenic,
    record.destCost,
    record.vehicle,
    record.vehicleCost,
    record.date,
  ].join(',')).join('\r\n');
  return `${headers}\r\n${data}`;
}
