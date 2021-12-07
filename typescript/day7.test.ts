import { part1, part2, calculateMedian, computeFuel } from './day7';

const sampleInput = `16,1,2,0,4,2,7,1,2,14`;

describe('day 1', () => {
  it('calculates median', () => {
    const positions = sampleInput.split(",").map(x => parseInt(x));

    expect(calculateMedian(positions)).toBe(2);
  });

  it('part 1, sample input', () => {
    expect(part1(sampleInput)).toBe(37);
  });

  it('part 2, sample input', () => {
    expect(part2(sampleInput)).toBe(168);
  });

  it('computeFuel(11) should be 66', () => {
    expect(computeFuel(11)).toBe(66);
  });

});
