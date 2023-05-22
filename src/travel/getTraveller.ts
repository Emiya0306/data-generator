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
    cost: 0,
  };
  const [destCity, destScenic] = getDestination(traveller);
  const destCost = getDestCost(destScenic);
  const destination: Destination = { destCity, destScenic, destCost };
  const { vehicle, vehicleCost } = getVehicle(traveller, destination);

  const date = getDate(startTime);
  return { ...traveller, ...destination, vehicle, vehicleCost, ...date, cost: vehicleCost + destCost };
}

export function getTravellers() {
  const travellers: TravellerLog[] = [];
  for (let i = 0; i < 30000; i += 1) {
    travellers.push(getTraveller(1601481600000));
  }
  const headers = ['Name', 'Gender', 'Age', 'DestCity', 'DestScenic', 'Vehicle', 'DateKey', 'Year', 'Month', 'Day', 'Cost'].join(',');
  const data = travellers.map((record) => [
    record.name,
    record.gender,
    record.age,
    record.destCity,
    record.destScenic,
    record.vehicle,
    record.dateKey,
    record.year,
    record.month,
    record.day,
    record.cost,
  ].join(',')).join('\r\n');
  return `${headers}\r\n${data}`;
}
