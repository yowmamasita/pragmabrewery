import { Beer } from './beer';
import { BeerTemperature } from './beer-temperature';

export interface BeerService {
  getAllBeers(): Promise<Beer[]>
  getBeerTemperature(id: number): Promise<BeerTemperature>
}
