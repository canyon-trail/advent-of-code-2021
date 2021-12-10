import _ from "lodash";

export function parseInput(input: string): number[] {
  const lines = input.split(/\r?\n/);
  const depths = lines.map(x => parseInt(x));

  return depths;
}

function calculateIncreases(values: number[]): number {
  const pairs = _.zip(
    values.slice(1),
    values.slice(0, values.length - 1)
  );

  const increasesAndDecreases: boolean[] = pairs.map(
    ([current, prev]) => current! > prev!);

  const increases: boolean[] = increasesAndDecreases.filter(x => x);

  return increases.length;

}

export function part1(input: string): number {
  const depths = parseInput(input);

  return calculateIncreases(depths);
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

  return calculateIncreases(sums);
}
