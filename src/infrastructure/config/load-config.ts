import fs from 'fs';
import yaml from 'js-yaml';

const loadConfig = (specFile: string): Record<string, unknown> => {
  const buf = fs.readFileSync(specFile);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contents: any = yaml.safeLoad(buf.toString());
  if (!contents || typeof contents === 'string') throw new Error('failed to load config');
  return <Record<string, unknown>>contents.spec;
};

export default loadConfig;
