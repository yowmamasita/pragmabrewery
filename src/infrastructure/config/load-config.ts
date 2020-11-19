import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';
import UnknownCfg from './types';

const loadConfig = (specFile: string): UnknownCfg => {
  const buf = fs.readFileSync(specFile);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contents: any = yaml.safeLoad(buf.toString());
  if (!contents || typeof contents === 'string') throw new Error('failed to load config');
  return <UnknownCfg>contents.spec;
};

export default loadConfig;
