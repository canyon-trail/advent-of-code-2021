import { part1, part2, parseInput } from './day6';

const sampleInput = `3,4,3,1,2`;

describe('day 6', () => {
  it('part 1, sample input', () => {
    expect(part1(sampleInput)).toBe(5934);
  });

  it('part 2, sample input', () => {
    expect(part2(sampleInput)).toBe(26984457539);
  });

  it('parseInput should return an array of numbers', () => {
    expect(parseInput(sampleInput)).toEqual([3,4,3,1,2])

  })
});
