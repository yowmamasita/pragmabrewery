import { Beer } from '../domain';
import { BeerLocalRepository } from './beer-local-repository';

test('no beer data, get all returns nothing', () => {
  expect.assertions(1);
  const repo = new BeerLocalRepository([]);
  return expect(repo.getAll()).resolves.toHaveLength(0);
});

test('no beer data, get by id returns an error', () => {
  expect.assertions(1);
  const repo = new BeerLocalRepository([]);
  return expect(repo.getByID(1)).rejects.toThrowError('beer not found');
});

test('has beer data, get all returns all', () => {
  expect.assertions(1);
  const beerData = [
    new Beer(1, 'a', 0, 10),
    new Beer(2, 'b', 0, 10),
    new Beer(3, 'c', 0, 10),
  ];
  const repo = new BeerLocalRepository(beerData);
  return expect(repo.getAll()).resolves.toHaveLength(3);
});

test('has beer data, get by id returns expected beer', () => {
  expect.assertions(1);
  const beerData = [
    new Beer(1, 'a', 0, 10),
    new Beer(2, 'b', 0, 10),
    new Beer(3, 'c', 0, 10),
  ];
  const repo = new BeerLocalRepository(beerData);
  expect(repo.getByID(2)).resolves.toMatchObject(beerData[1]);
});

test('has beer data, get by id returns error', () => {
  expect.assertions(1);
  const beerData = [
    new Beer(1, 'a', 0, 10),
    new Beer(2, 'b', 0, 10),
    new Beer(3, 'c', 0, 10),
  ];
  const repo = new BeerLocalRepository(beerData);
  return expect(repo.getByID(4)).rejects.toThrowError('beer not found');
});
