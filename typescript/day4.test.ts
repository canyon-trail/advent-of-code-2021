import _ from "lodash";
import { Board, part1, part2 } from "./day4";

const sampleInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

const [
  drawnNumbers,
  board1,
  board2,
  board3
] = sampleInput.split(/\r?\n\r?\n/).map(x => x.trim());

const parsedBoard3 = [
  [14, 21, 17, 24,  4],
  [10, 16, 15,  9, 19],
  [18,  8, 23, 26, 20],
  [22, 11, 13,  6,  5],
  [ 2,  0, 12,  3,  7],
]

describe("day 4", () => {
  describe("board class", () => {
    it("starts with parsed board", () => {
      const testee = new Board(board3);

      expect(testee.rows).toEqual(parsedBoard3);
    });

    it("starts with isWinner() false", () => {
      const testee = new Board(board3);

      expect(testee.isWinner()).toBe(false);
    });

    describe("row 0 win", () => {
      let testee: Board;
      beforeEach(() => {
        testee = new Board(board3);

        [14, 21, 17, 24, 4].forEach(x => testee.mark(x));
      });

      it("should have isWinner() true", () => {
        expect(testee.isWinner()).toBe(true);
      });

      it("should compute Board score", () => {
        const expectedScore = _.chain(parsedBoard3)
          .filter((x, idx) => idx !== 0) // filter out first row
          .flatMap()
          .sum()
          .value();
        expect(testee.score()).toBe(expectedScore);
      });
    });


    it("wins with column 3", () => {
      const testee = new Board(board3);

      [24, 9, 26, 6, 3].forEach(x => testee.mark(x));

      expect(testee.isWinner()).toBe(true);
    });
  });

  describe("part 1, sample input", () => {
    expect(part1(sampleInput)).toBe(4512);
  })

  describe("part 2, sample input", () => {
    expect(part2(sampleInput)).toBe(1924);
  })

});