import { readFileSync } from "fs";
import _ from "lodash";

export function calculateMedian(values: number[]): number {
  const sorted = _.sortBy(values);

  if(sorted.length % 2 == 1) {
    const meanIdx = _.round((sorted.length / 2) - 1);

    return values[meanIdx];
  }

  const leftIdx = _.floor((sorted.length / 2) - 1);
  const rightIdx = _.ceil((sorted.length / 2) - 1);
  const left = sorted[leftIdx];
  const right = sorted[rightIdx];

  return (left + right) / 2;
}

export function computeFuel(delta: number) {
  // sum of natural numbers
  return delta * (delta + 1) / 2;
}

export function part1(input: string): number {
  const positions = input.split(",").map(x => parseInt(x));

  const median = calculateMedian(positions);

  return _.chain(positions)
    .map(x => Math.abs(median - x))
    .reduce((acc, x) => acc + x)
    .value();
}

function computeTotalFuelForPosition(position: number, positions: number[]): number {
  return _.chain(positions)
    .map(x => computeFuel(Math.abs(position - x)))
    .reduce((acc, x) => acc + x)
    .value();
}

export function part2(input: string): number {
  const positions = input.split(",").map(x => parseInt(x));

  const totals = positions.map((x, idx) => computeTotalFuelForPosition(idx, positions));

  return _.min(totals)!;
}
