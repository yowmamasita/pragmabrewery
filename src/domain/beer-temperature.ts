import { Beer } from './beer';

export class BeerTemperature {
  beer: Beer;

  currentTemperature: number;

  constructor(beer: Beer, currentTemperature: number) {
    this.beer = beer;
    this.currentTemperature = currentTemperature;
  }

  isSafe(): boolean {
    return this.currentTemperature >= this.beer.lowestSafeTemp
    && this.currentTemperature <= this.beer.highestSafeTemp;
  }
}

export interface BeerTemperatureRepository {
  getByBeer(beer: Beer): Promise<BeerTemperature>
}
