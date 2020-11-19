import AppConfig from './src/infrastructure/config/app-config';
import http from './src/infrastructure/http';

const specFileEnvPath = 'SPEC_FILE';

const run = (): void => {
  const filePath: string = process.env[specFileEnvPath] || './.config.yml';
  const config = AppConfig.load(filePath);
  http.runServer(config);
};

run();
