import { part1, part2, flood, createGrid } from './day9';

const sampleInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe('day 9', () => {
  it('part 1, sample input', () => {
    expect(part1(sampleInput)).toBe(15);
  });

  it('part 2, sample input', () => {
    expect(part2(sampleInput)).toBe(1134);
  });

  it("should find middle basin", () => {
    const basin = flood(3, 2, createGrid(sampleInput));
    expect(basin.size).toBe(14);
  });
});
