import { sampleSize } from 'lodash';
import { part1, part2, permute, findMapping, matchesMapping } from './day8';

const sampleInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

describe('day 8', () => {
  it('part 1, sample input', () => {
    expect(part1(sampleInput)).toBe(26);
  });

  it('part 2, sample input', () => {
    expect(part2(sampleInput)).toBe(61229);
  });

  it("should permute", () => {
    const result = [...permute(new Set(['a', 'b', 'c']))]

    expect(result).toEqual([
      'abc',
      'acb',
      'bac',
      'bca',
      'cab',
      'cba',
    ].map(x => x.split('')));
  });

  it("should find mapping", () => {
    const samples = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab".split(" ")

    expect(findMapping(samples)).toEqual({
      d: 0,
      e: 1,
      a: 2,
      f: 3,
      g: 4,
      b: 5,
      c: 6,
    })
  });

  describe("matchesMapping function", () => {
    const samples = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab".split(" ")
    const mapping = {
      d: 0,
      e: 1,
      a: 2,
      f: 3,
      g: 4,
      b: 5,
      c: 6,
    }
    samples.forEach(s => it(`should match mapping for ${s}`, () => {
      expect(matchesMapping(s.split(""), mapping)).toBe(true);
    }));
  });
});
