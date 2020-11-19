import { Beer } from '../../domain';

export class AppData {
  beers: Beer[];

  constructor(beers: Beer[]) {
    this.beers = beers;
  }
}
