import fs from 'fs';
import * as yaml from 'js-yaml';
import { UnknownCfg } from './types';

export const loadConfig = (specFile: string): UnknownCfg => {
  const buf = fs.readFileSync(specFile);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contents: any = yaml.safeLoad(buf.toString());
  if (!contents || typeof contents === 'string') throw new Error('failed to load config');
  return <UnknownCfg>contents.spec;
};
