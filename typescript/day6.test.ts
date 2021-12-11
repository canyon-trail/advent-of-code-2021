import { cycle, part1, part2 } from "./day6";

const sampleInput = `3,4,3,1,2`;
describe("Part 1", () => {
  it("Should return 5934", () => {
    expect(part1(sampleInput)).toBe(5934);
  });
});

describe("Cycle", () => {
  it("Should move values forward 1 position", () => {
    let test = [0, 1, 1, 2, 1, 0, 0, 0, 0];
    expect(cycle(test)).toEqual([1, 1, 2, 1, 0, 0, 0, 0, 0]);
  });
});

describe("Part 2", () => {
  it("Should return 26984457539", () => {
    expect(part2(sampleInput)).toBe(26984457539);
  });
});
