import express from 'express';
import { AppConfig } from '../config';
import { Registry } from '../registry';

export const runServer = (config: AppConfig): void => {
  const app = express();
  app.get('/', (req, res) => res.send('hello'));
  const registry = new Registry(config);
  registry.registerBeersHandler(app);
  app.listen(config.general.port, () => {
    console.log(`The server is now running at port ${config.general.port}`, config);
  });
};
