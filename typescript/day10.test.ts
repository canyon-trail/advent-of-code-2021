import { part1, part2, getIllegalCharPos } from "./day10";

const sampleInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

describe("day 10", () => {
  it("part 1 sample input", () => {
    expect(part1(sampleInput)).toBe(26397);
  })

  it("part 2 sample input", () => {
    expect(part2(sampleInput)).toBe(288957);
  })

  describe("getIllegalCharPos", () => {
    const toMessage = (input, pos) => {
      if(pos === null) {
        return input;
      }

      return input + "\n" + Array(pos).fill(" ").join("") + "^";
    }

    const cases = [
      { input: "())", expected: 2 },
      { input: "()()", expected: null },
      { input: "(){}[]<>", expected: null },
      { input: "{([(<{}[<>[]}>{[]{[(<()>", expected: 12 },
    ]

    cases.forEach(({ input, expected }) => it(`should be ${expected} for ${input}`, () => {
      const result = getIllegalCharPos(input);
      expect(toMessage(input, result)).toBe(toMessage(input, expected));
    }))
  });

});