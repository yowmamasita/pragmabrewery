export default class Beer {
  name: string;

  lowestSafeTemp: number;

  highestSafeTemp: number;

  constructor(name: string, lowestSafeTemp: number, highestSafeTemp: number) {
    this.name = name;
    this.lowestSafeTemp = lowestSafeTemp;
    this.highestSafeTemp = highestSafeTemp;
  }
}
