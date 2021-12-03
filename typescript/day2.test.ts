import _ from 'lodash';
import { parse, part1, part2, Up, Down, Forward } from './day2';

const sampleInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;


describe("day 2", () => {
  describe("parsing", () => {
    const instructions = sampleInput.split("\n");
    const testCases = _.zip(
      instructions,
      [5, 5, 8, 3, 8, 2 ],
      [Forward, Down, Forward, Up, Down, Forward]
      )

    testCases.forEach(([instr, expectedArg, expectedType]) => {
      describe(`instruction ${instr}`, () => {
        it(`should have arg ${expectedArg}`, () => {
          expect(parse(instr!).arg).toEqual(expectedArg);
        });
        it(`should have type ${expectedType.name}`, () => {
          expect(parse(instr!)).toBeInstanceOf(expectedType);
        });
      });
    });
  })

  it("part 1, sample input", () => {
    expect(part1(sampleInput)).toBe(150);
  });

  it("part 2, sample input", () => {
    expect(part2(sampleInput)).toBe(900);
  });
})