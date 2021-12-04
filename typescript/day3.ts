import { readFileSync } from "fs";
import _ from "lodash";

export function part1(input: string): number {
  const lines = input.split("\n").map(x => x.trim());

  const bits: number[][] = lines.map(x => x.split("").map(x => parseInt(x)));

  const bitColumns: number[][] = _.unzip(bits);

  const bitSums: number[] = bitColumns.map(x => _.sum(x));

  const gammaBits: number[] = bitSums.map(x => _.round(x / lines.length))

  const gamma = bitsToNumber(gammaBits);

  const epsilonBits = gammaBits.map(x => 1 - x);

  const epsilon = bitsToNumber(epsilonBits);

  return gamma * epsilon;
}

export function part2(input: string): number {
  const lines = input.split("\n").map(x => x.trim());

  const bits: number[][] = lines.map(x => x.split("").map(x => parseInt(x)));

  let remainingO2Candidates = bits;
  let remainingCO2Candidates = bits;

  let o2candidatebit = 0;
  while(remainingO2Candidates.length > 1) {
    const bitColumn = remainingO2Candidates.map(x => x[o2candidatebit]);
    const mostCommonBit = _.round(_.sum(bitColumn) / remainingO2Candidates.length);

    remainingO2Candidates = remainingO2Candidates.filter(x => x[o2candidatebit] === mostCommonBit);

    o2candidatebit++;
  }

  let co2candidatebit = 0;
  while(remainingCO2Candidates.length > 1) {
    const bitColumn = remainingCO2Candidates.map(x => x[co2candidatebit]);
    const leastCommonBit = 1 - _.round(_.sum(bitColumn) / remainingCO2Candidates.length);

    remainingCO2Candidates = remainingCO2Candidates.filter(x => x[co2candidatebit] === leastCommonBit);

    co2candidatebit++;
  }

  return bitsToNumber(remainingCO2Candidates[0]) * bitsToNumber(remainingO2Candidates[0]);
}

function bitsToNumber(bits: number[]): number {
  return parseInt(bits.join(""), 2);
}

if(require.main === module) {
  const input = readFileSync("day3.txt", { encoding: "ascii"});
  console.log(`Day 3, part 1: ${part1(input)}`);
  console.log(`Day 3, part 2: ${part2(input)}`);
}
