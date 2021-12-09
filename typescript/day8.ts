import { readFileSync } from "fs";
import _ from "lodash";

export function part1(input: string): number {
  const entries = input.split(/\r?\n/).filter(x => x.length > 0);

  const outputValueEntries = entries.map(x => x.split(" | ")[1]);

  const outputValues = _.flatMap(
    outputValueEntries,
    e => e.split(" ")
  );

  const filteredOutputValues = outputValues
    .filter(x => [2,3,4,7].indexOf(x.length) >= 0);

  return filteredOutputValues.length;
}

export function part2(input: string): number {
  return 0;
}

if(require.main === module) {
  const input = readFileSync("day8.txt", { encoding: "ascii"});
  console.log(`Day 1, part 1: ${part1(input)}`);
  console.log(`Day 1, part 2: ${part2(input)}`);
}
