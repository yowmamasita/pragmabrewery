import { Beer, BeerRepository } from '../domain';

export class BeerLocalRepository implements BeerRepository {
  beers: Beer[];

  constructor(beers: Beer[]) {
    this.beers = beers;
  }

  getAll(): Promise<Beer[]> {
    return new Promise((resolve) => {
      resolve(this.beers);
    });
  }

  getByID(id: number): Promise<Beer> {
    return new Promise((resolve, reject) => {
      const results = this.beers.filter((beer) => beer.id === id);
      if (!results.length) reject(new Error('beer not found'));
      resolve(results[0]);
    });
  }
}
