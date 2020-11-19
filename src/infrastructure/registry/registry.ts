import { Router } from 'express';
import { BeersHandler } from '../../handlers';
import { BeerLocalRepository } from '../../repository';
import { BeerTemperatureSensorAPI } from '../../repository/beer-temperature-sensor-api';
import { BeerServiceImpl } from '../../use-cases';
import { AppConfig } from '../config';

export class Registry {
  config: AppConfig;

  constructor(config: AppConfig) {
    this.config = config;
  }

  registerBeersHandler(router: Router): void {
    const beerRepo = new BeerLocalRepository(this.config.data.beers);
    const sensorAPI = new BeerTemperatureSensorAPI(
      this.config.temperatureSensorAPI.api.baseURL,
      this.config.temperatureSensorAPI.api.timeout,
    );
    const beerService = new BeerServiceImpl(beerRepo, sensorAPI);
    const handler = new BeersHandler(router, beerService);
    handler.registerRoutes();
  }
}
