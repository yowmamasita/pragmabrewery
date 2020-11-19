import Axios, { AxiosInstance } from 'axios';
import { Beer, BeerTemperature, BeerTemperatureRepository } from '../domain';

export class BeerTemperatureSensorAPI implements BeerTemperatureRepository {
  client: AxiosInstance;

  constructor(baseURL: string, timeout: number) {
    this.client = Axios.create({ baseURL, timeout });
  }

  getByBeer(beer: Beer): Promise<BeerTemperature> {
    return this.client.get(`/sensor/${beer.id}`).then(({ data }) => new BeerTemperature(beer, <number>data.temperature));
  }
}
