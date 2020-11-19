import Beer from '../../domain/beer';

export default class AppData {
  beers: Beer[];

  constructor(beers: Beer[]) {
    this.beers = beers;
  }
}
