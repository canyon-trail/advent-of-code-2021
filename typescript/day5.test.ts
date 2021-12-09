import { part1, part2, Line } from "./day5";

const sampleInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

describe("day 5", () => {
  describe("Line class", () => {
    it("should parse", () => {
      const testee = new Line("1,2 -> 3,4");
      expect(testee).toEqual(expect.objectContaining({
        x1: 1,
        y1: 2,
        x2: 3,
        y2: 4,
      }));
    });

    it("should emit coords (Horizontal)", () => {
      const hLine = new Line("9,4 -> 3,4");

      expect(hLine.coords).toEqual([
        "3,4",
        "4,4",
        "5,4",
        "6,4",
        "7,4",
        "8,4",
        "9,4",
      ]);
    });

    it("should emit coords (Vertical)", () => {
      const hLine = new Line("4,1 -> 4,4");

      expect(hLine.coords).toEqual([
        "4,1",
        "4,2",
        "4,3",
        "4,4",
      ]);
    })
  })

  it("part 1, sample input", () => {
    expect(part1(sampleInput)).toBe(5);
  });
  it("part 2, sample input", () => {
    expect(part2(sampleInput)).toBe(12);
  });

});