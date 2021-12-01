import { readFileSync } from "fs";
import _ from "lodash";

export function parseInput(input: string): number[] {
  const lines = input.split(/\r?\n/);
  const depths = lines.map(x => parseInt(x));

  return depths;
}

export function part1(input: string): number {
  const depths = parseInput(input);

  const increases = _.zip(depths.slice(1), depths.slice(0, depths.length - 1))
    .map(([current, prev]) => current! > prev!)
    .filter(x => x)
    ;

	return increases.length;
}

export function computePart2Sums(depths: number[]): number[] {
  const sums = _.zip(
    depths.slice(2, depths.length),
    depths.slice(1, depths.length - 1),
    depths.slice(0, depths.length - 2))
    .map(([a, b, c]) => a! + b! + c!)
    ;

    return sums;
}

export function part2(input: string): number {
  const depths = parseInput(input);

  const sums = computePart2Sums(depths);

  const increases = _.zip(sums.slice(1), sums.slice(0, sums.length - 1))
    .map(([current, prev]) => current! > prev!)
    .filter(x => x)
    ;

	return increases.length;
}

if(require.main === module) {
  const input = readFileSync("day1.txt", { encoding: "ascii"});
  console.log(`Day 1, part 1: ${part1(input)}`);
  console.log(`Day 1, part 2: ${part2(input)}`);
}
