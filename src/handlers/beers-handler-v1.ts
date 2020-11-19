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
    this.app.get('/beers', this.getAllBeers());
  }

  getAllBeers(): express.Handler {
    return (req: express.Request, res: express.Response) => {
      this.beerService.getAllBeers().then((beers) => res.send(beers));
    };
  }
}
