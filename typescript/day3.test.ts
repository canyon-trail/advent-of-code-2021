import { part1, part2 } from "./day3";

const exampleInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe("day 3", () => {
  it("part1 - example input", () => {
    expect(part1(exampleInput)).toBe(198);
  });

  it("part2 - example input", () => {
    expect(part2(exampleInput)).toBe(230);
  });
})