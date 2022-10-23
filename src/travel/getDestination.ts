import { GENDER, getHierarchies, Hierarchy } from '../utils';

import { Traveller } from './type';

export function getDestination(traveller: Traveller) {
  const hierarchies: Hierarchy[] = [
    {
      name: 'Shanghai',
      percent: traveller.local ? 0.5 : 0.25,
      children: [
        { name: 'Shanghai Disney Resort', percent: traveller.gender === GENDER.FEMALE || traveller.age < 8 ? 0.15 : 0.04 },
        { name: 'Oriental Pearl TV Tower', percent: !traveller.local ? 0.2 : 0.04 },
        { name: 'Happy Valley in Shanghai', percent: traveller.gender === GENDER.FEMALE || traveller.age < 8 ? 0.14 : 0.04 },
        { name: 'Shanghai Haichang Ocean Park', percent: traveller.gender === GENDER.FEMALE || traveller.age < 8 ? 0.13 : 0.04 },
        { name: 'Shanghai Astronomy Museum', percent: traveller.age < 25 ? 0.14 : 0.04 },
        { name: 'Shanghai Ocean Aquarium', percent: traveller.age < 8 ? 0.09 : 0.04 },
        { name: 'Shanghai Wild Animal Park', percent: traveller.age < 8 ? 0.05 : 0.04 },
        { name: 'Nanjing Road Walkway', percent: !traveller.local ? 0.13 : 0.04 },
        { name: 'People\'s Square of Shanghai', percent: traveller.local ? 0.11 : 0.04 },
      ],
    },
    {
      name: 'Beijing',
      percent: traveller.local ? 0.1 : 0.25,
      children: [
        { name: 'The Imperial Palace', percent: !traveller.local ? 0.34 : 0.04 },
        { name: 'The Great Wall', percent: !traveller.local ? 0.29 : 0.04 },
        { name: 'Universal Beijing Resort', percent: traveller.local || traveller.gender === GENDER.FEMALE ? 0.25 : 0.04 },
        { name: 'Fragrant Hills Park', percent: !traveller.local ? 0.02 : 0.04 },
        { name: 'The Summer Palace', percent: 0.04 },
        { name: 'Beijing Zoo', percent: traveller.local ? 0.06 : 0.04 },
      ],
    },
    {
      name: 'HangZhou',
      percent: traveller.local ? 0.25 : 0.25,
      children: [
        { name: 'Thousand Islet Lake', percent: !traveller.local ? 0.14 : 0.04 },
        { name: 'Song Cheng', percent: !traveller.local ? 0.29 : 0.04 },
        { name: 'LingYin Temple', percent: 0.25 },
        { name: 'The West Lake', percent: !traveller.local ? 0.12 : 0.04 },
        { name: 'Xixi National Wetland Park', percent: traveller.local || traveller.gender === GENDER.FEMALE ? 0.14 : 0.04 },
        { name: 'Hang Zhou Botanical Garden', percent: 0.06 },
      ],
    },
    {
      name: 'SuZhou',
      percent: traveller.local ? 0.15 : 0.25,
      children: [
        { name: 'HB World', percent: 0.14 },
        { name: 'Humble Administrator\'s Garden', percent: !traveller.local ? 0.29 : 0.04 },
        { name: 'Zhouzhuang Town', percent: traveller.local ? 0.25 : 0.04 },
        { name: 'Hanshan Temple', percent: traveller.local ? 0.12 : 0.04 },
        { name: 'Huqiu Scenic Area', percent: traveller.local ? 0.14 : 0.04 },
        { name: 'Lion Forest Garden', percent: !traveller.local ? 0.06 : 0.04 },
      ],
    },
  ];
  return getHierarchies({ hierarchies });
}

export function getDestCost(name: string) {
  return {
    'Shanghai Disney Resort': 450,
    'Oriental Pearl TV Tower': 198,
    'Happy Valley in Shanghai': 180,
    'Shanghai Haichang Ocean Park': 89,
    'Shanghai Astronomy Museum': 100,
    'Shanghai Ocean Aquarium': 155,
    'Shanghai Wild Animal Park': 99,
    'Nanjing Road Walkway': 300,
    'People\'s Square of Shanghai': 200,
    'The Imperial Palace': 60,
    'The Great Wall': 40,
    'Universal Beijing Resort': 516,
    'Fragrant Hills Park': 10,
    'The Summer Palace': 30,
    'Beijing Zoo': 15,
    'Thousand Islet Lake': 185,
    'Song Cheng': 88,
    'LingYin Temple': 20,
    'The West Lake': 150,
    'Xixi National Wetland Park': 70,
    'Hang Zhou Botanical Garden': 10,
    'HB World': 321,
    'Humble Administrator\'s Garden': 80,
    'Zhouzhuang Town': 50,
    'Hanshan Temple': 20,
    'Huqiu Scenic Area': 70,
    'Lion Forest Garden': 20,
  }[name]!;
}
