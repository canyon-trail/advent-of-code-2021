import { part1, part2, computePart2Sums, parseInput } from './day1';

const sampleInput = `199
200
208
210
200
207
240
269
260
263`;
describe('day 1', () => {
  it('part 1, sample input', () => {
    expect(part1(sampleInput)).toBe(7);
  });

  it('part 2, sample input', () => {
    expect(part2(sampleInput)).toBe(5);
  });

  it('part 2, compute sums', () => {
    const depths = parseInput(sampleInput);

    expect(computePart2Sums(depths)).toEqual([607, 618, 618, 617, 647, 716, 769, 792])

  })
});
