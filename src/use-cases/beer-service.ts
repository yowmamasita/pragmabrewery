import {
  Beer, BeerRepository, BeerService, BeerTemperature, BeerTemperatureRepository,
} from '../domain';

export class BeerServiceImpl implements BeerService {
  beerRepo: BeerRepository;

  beerTempRepo: BeerTemperatureRepository;

  constructor(beerRepository: BeerRepository, beerTempRepository: BeerTemperatureRepository) {
    this.beerRepo = beerRepository;
    this.beerTempRepo = beerTempRepository;
  }

  getAllBeers(): Promise<Beer[]> {
    return this.beerRepo.getAll();
  }

  getBeerTemperature(id: number): Promise<BeerTemperature> {
    const getBeer = this.beerRepo.getByID(id);
    return getBeer.then((beer) => this.beerTempRepo.getByBeer(beer));
  }
}
