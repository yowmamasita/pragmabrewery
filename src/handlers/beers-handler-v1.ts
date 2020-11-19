import * as express from 'express';
import { BeerService } from '../domain';
import { Handler } from './handler-interface';

export class BeersHandler implements Handler {
  app: express.Router;

  beerService: BeerService;

  constructor(app: express.Router, beerService: BeerService) {
    this.app = app;
    this.beerService = beerService;
  }

  registerRoutes(): void {
    this.app.get('/beer-temperatures', this.getAllBeerTemps());
  }

  getAllBeerTemps(): express.Handler {
    return (req: express.Request, res: express.Response) => {
      this.beerService.getAllBeers().then(
        (beers) => Promise.all(
          beers.map((beer) => this.beerService.getBeerTemperature(beer.id)),
        ),
      )
        .then((temps) => res.send(temps))
        .catch((err) => res.send(err));
    };
  }
}
