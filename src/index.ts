import * as fs from 'fs';
import * as path from 'path';

import { outputDir } from "./configs";
import { generateScore } from './generators';

fs.writeFileSync(path.join(outputDir, './data.csv'), generateScore(1200), 'utf8');
