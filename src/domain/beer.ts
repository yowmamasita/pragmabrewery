export class Beer {
  id: number;

  name: string;

  lowestSafeTemp: number;

  highestSafeTemp: number;

  constructor(id:number, name: string, lowestSafeTemp: number, highestSafeTemp: number) {
    this.id = id;
    this.name = name;
    this.lowestSafeTemp = lowestSafeTemp;
    this.highestSafeTemp = highestSafeTemp;
  }
}

export interface BeerRepository {
  getAll(): Promise<Beer[]>
  getByID(id: number): Promise<Beer>
}
