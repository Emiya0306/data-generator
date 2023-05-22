import * as fs from 'fs';
import * as path from 'path';

import { outputDir } from './configs';
import { generateDemo } from './demo';
import { generateScore } from './students';
import { getTravellers } from './travel';
import { getBranchmark } from './branchmark';

switch (process.argv[2]) {
  case 'students':
    fs.writeFileSync(path.join(outputDir, './student.csv'), generateScore(1200), 'utf8');
    break;
  case 'demo':
    fs.writeFileSync(path.join(outputDir, './demo.csv'), generateDemo(1000000), 'utf8');
    break;
  case 'travel':
    fs.writeFileSync(path.join(outputDir, './travel.csv'), getTravellers(), 'utf8');
    break;
  case 'branchmark':
    fs.writeFileSync(path.join(outputDir, './branchmark.csv'), getBranchmark({ column: [10], row: [5000], measure: { count: 1 } }), 'utf8');
    break;
  default:
    console.log('Please input project name.');
    break;
}
