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
  4: "0111010",
  5: "1101011",
  6: "1101111",
  7: "1010010",
  8: "1111111",
  9: "1111011",
}

const numbersByPattern = _.invert(segmentPatterns)

type WirePosition = 0 | 1 | 2 | 3 | 4 | 5 | 6
type Wire = "a" | "b" | "c" | "d" | "e" | "f" | "g"
type WireMapping = Record<Wire, WirePosition>

export function* permute(s: Set<Wire>): Generator<Wire[]> {
  for(const c of s)
  {
    const subset = new Set([...s].filter(x => x != c));

    if(subset.size === 0) {
      yield [c];
    }

    for(const sub of permute(subset))
    {
      yield [c, ...sub];
    }
  }
}

const zeros = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
}

function toMapping(wires: Wire[]): WireMapping {
  const mapping = _.chain(wires)
    .map((v, k) => [v,k])
    .fromPairs()
    .value();

  return mapping as WireMapping;
}

function getNumberFromWires(wires: Wire[], mapping: WireMapping): WirePosition | undefined {
  const ones = _.chain(wires)
    .map(v => [mapping[v], 1])
    .fromPairs()
    .value();

  const patternMap = { ...zeros, ...ones };
  const pattern = [...Array(7).keys()].map(k => patternMap[k as WirePosition]).join("");

  return numbersByPattern[pattern] as unknown as WirePosition | undefined;
}
export function matchesMapping(sample: Wire[], mapping: WireMapping): boolean {
  return getNumberFromWires(sample, mapping) !== undefined;
}

export function findMapping(samples: string[]): WireMapping {
  for(const candidate of permute(new Set(["a", "b", "c", "d", "e", "f", "g"]))) {
    const mapping = toMapping(candidate);

    let valid = true;
    for(const sample of samples) {
      if(!matchesMapping(sample.split("") as Wire[], mapping)) {
        valid = false;
        break;
      }
    }

    if(valid) {
      return mapping;
    }
  }

  throw new Error("Could not find mapping");
}

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
  const entries = input
    .split(/\r?\n/)
    .filter(x => x.length > 0)
    .map(x => x.split(" | "));

  let sum = 0;
  const cookedEntries = entries
    .map(x => [
      _.chain(x[0].split(" ")).filter(x => x.length < 7).sortBy(x => x.length).value(),
      x[1].split(" ")
    ]) as string[][][];
  for(const [samples, outputs] of cookedEntries) {

    const mapping = findMapping(samples);

    const digits = outputs
      .map(x => getNumberFromWires(x.split("") as Wire[], mapping))
      .join("");

    sum += parseInt(digits)
  }

  return sum;
}

if(require.main === module) {
  const input = readFileSync("day8.txt", { encoding: "ascii"});
  const p1start = new Date();
  const s1 = part1(input);
  const p2start = new Date();
  const s2 = part2(input);
  const p2end = new Date();
  console.log(`Day 1, part 1: ${s1} (${p2start.getTime() - p1start.getTime()}ms)`);
  console.log(`Day 1, part 2: ${s2} (${p2end.getTime() - p2start.getTime()}ms)`);
}
