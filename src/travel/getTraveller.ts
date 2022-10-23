import dayjs from 'dayjs';

import { getFirstName, getGender, getLastName } from '../utils';

import { getAge } from './getAge';
import { getIsLocal } from './getIsLocal';
import { getDestCost, getDestination } from './getDestination';
import { Destination, Traveller, TravellerLog } from './type';
import { getVehicle } from './getVehicle';

export function getTraveller() {
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

  const time = Math.random() * 6 * 3600000 * 24;
  const date = dayjs(1664553600000 + time).format('YYYY-MM-DD');
  return { ...traveller, ...destination, vehicle, vehicleCost, date };
}

export function getTravellers() {
  const travellers: TravellerLog[] = [];
  for (let i = 0; i < 50000; i += 1) {
    travellers.push(getTraveller());
  }
  const headers = ['Name', 'Gender', 'Age', 'Local', 'Dest City', 'Dest Scenic', 'Dest Cost', 'Vehicle', 'Vehicle Cost', 'Date'].join(',');
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
