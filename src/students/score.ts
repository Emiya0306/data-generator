import dayjs from 'dayjs';

import { dataType, zhCharset } from '../configs';
import { getInt, getText } from '../utils';

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
  name: string;
  gender: string;
  age: number;
  school: string;
  class: string;
  country: string;
  city: string;
  street: string;
}

export function generateScore(recordCount = 200) {
  let data = '';
  const headers: Headers = [
    { name: 'Name', type: VARCHAR },
    { name: 'Gender', type: VARCHAR },
    { name: 'Age', type: VARCHAR },
    { name: 'School', type: VARCHAR },
    { name: 'Class', type: VARCHAR },
    { name: 'Country', type: VARCHAR },
    { name: 'City', type: VARCHAR },
    { name: 'Street', type: VARCHAR },
    { name: 'Chinese', type: INT },
    { name: 'English', type: INT },
    { name: 'Math', type: INT },
    { name: 'Date', type: DATE },
    { name: 'Desc', type: VARCHAR },
  ];

  data += headers.map((header) => header.name).join(',');
  data += '\r\n';

  const schools = ['小学', '初中', '高中'];
  const classes = [
    ['一年级(1)班', '一年级(2)班', '二年级(1)班', '二年级(2)班', '三年级(1)班'],
    ['初一(1)班', '初二(1)班', '初二(2)班', '初三(1)班'],
    ['高一(1)班', '高一(2)班', '高二(1)班', '高二(2)班', '高三(1)班', '高三(2)班'],
  ];
  const countries = ['美国', '中国', '日本', '英国'];
  const cities = [
    ['华盛顿', '纽约', '德克萨斯'],
    ['上海', '北京', '广州'],
    ['东京', '京都'],
    ['伦敦'],
  ];
  const streets = [
    [
      ['华盛顿街1号', '华盛顿街2号', '华盛顿街3号', '华盛顿街3号'],
      ['纽约街1号', '纽约街2号'],
      ['德克萨斯街1号', '德克萨斯街2号', '德克萨斯街3号'],
    ],
    [
      ['上海街1号', '上海街2号', '上海街3号', '上海街4号', '上海街5号'],
      ['北京街1号', '北京街2号', '北京街3号'],
      ['广州街1号'],
    ],
    [
      ['东京街1号'],
      ['京都街1号', '京都街2号', '京都街3号'],
    ],
    [
      ['伦敦街1号', '伦敦街2号', '伦敦街3号', '伦敦街4号'],
    ],
  ];
  const students: Student[] = [];
  for (let i = 0; i < recordCount; i += 1) {
    const schoolEnumAt = Math.floor(Math.random() * schools.length);
    const classEnumAt = Math.floor(Math.random() * classes[schoolEnumAt].length);
    const countryEnumAt = Math.floor(Math.random() * countries.length);
    const cityEnumAt = Math.floor(Math.random() * cities[countryEnumAt].length);
    const streetEnumAt = Math.floor(Math.random() * streets[countryEnumAt][cityEnumAt].length);
    students.push({
      name: getText(3, zhCharset),
      gender: Math.random() > 0.5 ? 'F' : 'M',
      age: Math.floor(Math.random() * 10) + 10,
      school: schools[schoolEnumAt],
      class: classes[schoolEnumAt][classEnumAt],
      country: countries[countryEnumAt],
      city: cities[countryEnumAt][cityEnumAt],
      street: streets[countryEnumAt][cityEnumAt][streetEnumAt],
    });
  }

  const dates: number[] = [];
  // for (let i = 1577980800000; i < 1641139200000; i += 1296000000) {
  for (let i = 1577980800000; i < 1641139200000; i += 51840000) {
    dates.push(i);
  }

  for (const date of dates) {
    for (const student of students) {
      const record = [
        student.name,
        student.gender,
        student.age,
        student.school,
        student.class,
        student.country,
        student.city,
        student.street,
        getInt({ min: 0, max: 100 }),
        getInt({ min: 0, max: 100 }),
        getInt({ min: 0, max: 100 }),
        dayjs(date).format('YYYY-MM-DD'),
        getText(10),
      ].join(',');
      data += `${record}\r\n`;
    }
  }

  // for (const student of students) {
  //   const record = [
  //     student.name,
  //     student.class,
  //     getInt({min: 0, max: 100}),
  //     getInt({min: 0, max: 100}),
  //     getInt({min: 0, max: 100}),
  //     getText(10),
  //   ].join(',');
  //   data += `${record}\r\n`;
  // }

  return data;
}
