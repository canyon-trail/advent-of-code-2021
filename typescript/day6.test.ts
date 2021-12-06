import _ from "lodash";
import { part1, part2, populationSizeAtDay, populationSizeGenerator } from "./day6";

const sampleInput = "3,4,3,1,2"

describe("day 6", () => {
  describe("populationSizeAtDay function", () => {
    it("should return 1 at day 0", () => {
      expect(populationSizeAtDay(6, 0)).toBe(1);
    });

    it("should return 2 at day 1 for counter 0", () => {
      expect(populationSizeAtDay(0, 1)).toBe(2);
    });
    it("should return 1 at day 0 for counter 0", () => {
      expect(populationSizeAtDay(0, 0)).toBe(1);
    });

    it("should return 2 at days 7-13", () => {
      _.range(7, 14).forEach(x => {
        expect(populationSizeAtDay(6, x)).toBe(2);
      });
    });

    it("should return 3 at day 14", () => {
      expect(populationSizeAtDay(6, 14)).toBe(3);
    });
  });

  describe("populationSizeGenerator", () => {
    it("first n is", () => {
      const actual: number[] = [];

      const expected = [
        1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 5, 5, 7, 7, 8, 8,
      ]

      const seq = populationSizeGenerator(6);
      seq.next();
      for(let i = 0; i < expected.length; i++) {
        actual.push(seq.next().value);
      }

      expect(actual).toEqual(expected);
    });
  });

  it("part 1, sample input", () => {
    expect(part1(sampleInput)).toBe(5934);
  });
});