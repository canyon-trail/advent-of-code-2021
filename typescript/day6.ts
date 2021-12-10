import { readFileSync } from "fs";
import _ from "lodash";

type Population = Record<number, number>;

export function* populationSizeGenerator(startCounter: number): Generator<number> {
  let population: Population = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    [startCounter]: 1,
  };

  while(true) {
    let newFishCount = population[0] ? population[0] : 0;
    const count = _.reduce(population, (agg, count) => agg + count);

    yield count!;

    population = {
      8: newFishCount,
      7: population[8],
      6: population[7] + population[0],
      5: population[6],
      4: population[5],
      3: population[4],
      2: population[3],
      1: population[2],
      0: population[1],
    }
  }
}

export function populationSizeAtDay(startCounter: number, day: number): number {
  const seq = populationSizeGenerator(startCounter);
  seq.next();
  let val: number = 1;
  for(let d = 0; d < day; d++) {
    val = seq.next().value;
  }

  return val;
}

export function part1(input: string): number {
  const startNums = input.split(",").map(x => parseInt(x));

  const sizes = startNums.map(x => populationSizeAtDay(x, 80));

  return _.sum(sizes);
}

export function part2(input: string): number {
  const startNums = input.split(",").map(x => parseInt(x));

  const sizes = startNums.map(x => populationSizeAtDay(x, 256));

  return _.sum(sizes);
}
