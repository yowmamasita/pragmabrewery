import express from 'express';
import { AppConfig } from '../config';

export const runServer = (config: AppConfig): void => {
  const app = express();
  app.get('/', (req, res) => res.send('hello'));
  app.listen(config.general.port, () => {
    console.log(config);
  });
};
