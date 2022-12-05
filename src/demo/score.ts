import { dataType } from '../configs';
import { getDouble, getInt } from '../utils';

const { DATE, INT, VARCHAR } = dataType;

interface BaseHeader {
  name: string;
}

type EnumType<T> = T[] | (() => T[]);

type CustomType<T> = () => T;

interface HeaderVarchar extends BaseHeader {
  type: typeof VARCHAR;
  length?: number;
  enum?: EnumType<string>;
  custom?: CustomType<string>;
}

interface HeaderInt extends BaseHeader {
  type: typeof INT;
  min: number;
  max: number;
  enum?: EnumType<number>;
  custom?: CustomType<string>;
}

interface HeaderFloat extends BaseHeader {
  type: typeof INT;
  min?: number;
  max?: number;
  enum?: EnumType<number>;
  custom?: CustomType<string>;
}

interface HeaderDate extends BaseHeader {
  type: typeof DATE;
  min?: number;
  max?: number;
  enum?: EnumType<number>;
  custom?: CustomType<string>;
}

type Header = HeaderVarchar | HeaderInt | HeaderFloat | HeaderDate;

type Headers = Array<Header>;

interface Student {
  country: string;
  city: string;
  street: string;
  year: string;
  month: string;
  day: string;
  monthName: string;
  dateKey: string;
}

export function generateDemo(recordCount = 200) {
  let data = '';
  const headers: Headers = [
    { name: 'Country', type: VARCHAR },
    { name: 'City', type: VARCHAR },
    { name: 'Street', type: VARCHAR },
    { name: 'Year', type: VARCHAR },
    { name: 'Month', type: VARCHAR },
    { name: 'Day', type: VARCHAR },
    { name: 'DateKey', type: VARCHAR },
    { name: 'MonthName', type: VARCHAR },
    { name: 'Measure1', type: INT },
    { name: 'Measure2', type: INT },
    { name: 'Measure3', type: INT },
  ];

  data += headers.map((header) => header.name).join(',');
  data += '\r\n';

  const countries = ['China', 'America', 'Japan'];
  const cities = [
    ['Shanghai', 'Beijing', 'Guangzhou'],
    ['New York'],
    ['Tokyo', 'Kyoto'],
  ];
  const streets = [
    [
      ['Street 1', 'Street 2', 'Street 3'],
      ['Street 1', 'Street 2'],
      ['Street 1'],
    ],
    [
      ['Street 1', 'Street 2', 'Street 3'],
    ],
    [
      ['Street 1', 'Street 2'],
      ['Street 1'],
    ],
  ];
  const years = ['2020', '2021', '2022'];
  const months = [
    ['1', '2', '3'],
    ['1'],
    ['1', '2'],
  ];
  const monthNames = [
    ['January', 'February', 'March'],
    ['January'],
    ['January', 'February'],
  ];
  const days = [
    [
      ['1', '2', '3'],
      ['1', '2'],
      ['1'],
    ],
    [
      ['1', '2', '3'],
    ],
    [
      ['1', '2'],
      ['1'],
    ],
  ];
  const students: Student[] = [];
  for (let i = 0; i < recordCount; i += 1) {
    const countryEnumAt = Math.floor(Math.random() * countries.length);
    const cityEnumAt = Math.floor(Math.random() * cities[countryEnumAt].length);
    const streetEnumAt = Math.floor(Math.random() * streets[countryEnumAt][cityEnumAt].length);
    const yearEnumAt = Math.floor(Math.random() * years.length);
    const monthEnumAt = Math.floor(Math.random() * months[yearEnumAt].length);
    const dayEnumAt = Math.floor(Math.random() * days[yearEnumAt][monthEnumAt].length);
    students.push({
      country: countries[countryEnumAt],
      city: cities[countryEnumAt][cityEnumAt],
      street: streets[countryEnumAt][cityEnumAt][streetEnumAt],
      year: years[yearEnumAt],
      month: months[yearEnumAt][monthEnumAt],
      day: days[yearEnumAt][monthEnumAt][dayEnumAt],
      dateKey: `${years[yearEnumAt]}-${months[yearEnumAt][monthEnumAt]}-${days[yearEnumAt][monthEnumAt][dayEnumAt]}`,
      monthName: monthNames[yearEnumAt][monthEnumAt],
    });
  }

  for (const student of students) {
    const record = [
      student.country,
      student.city,
      student.street,
      student.year,
      student.month,
      student.day,
      student.dateKey,
      student.monthName,
      getInt({ min: 0, max: 1000 }),
      getInt({ min: 0, max: 10000 }),
      getDouble({ min: 0, max: 100000, decimal: 9 }),
    ].join(',');
    data += `${record}\r\n`;
  }

  return data;
}
