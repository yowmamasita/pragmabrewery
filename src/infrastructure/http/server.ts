import express from 'express';
import cors from 'cors';
import { AppConfig } from '../config';
import { Registry } from '../registry';

export const runServer = (config: AppConfig): void => {
  const app = express();
  app.use(cors());
  app.get('/', (req, res) => res.send('/beer-temperatures is where it\'s at!'));
  const registry = new Registry(config);
  registry.registerBeersHandler(app);
  app.listen(config.general.port, () => {
    // eslint-disable-next-line no-console
    console.log(`The server is now running at port ${config.general.port}`, config);
  });
};
