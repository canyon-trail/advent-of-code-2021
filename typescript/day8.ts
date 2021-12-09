import { readFileSync } from "fs";
import _ from "lodash";

/*
labeling the segments based on numbers:
 0000
1    2
1    2
 3333
4    5
4    5
 6666
*/
const segmentPatterns = {
  0: "1110111",
  1: "0010010",
  2: "1011101",
  3: "1011011",
  4: "0111001",
  5: "1101011",
  6: "1101111",
  7: "1010010",
  8: "1111111",
  9: "1111011",
}

const numbersByPattern = _.invert(segmentPatterns)

//function* permute()

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
