import { readFileSync } from "fs";
import _ from "lodash";

export class Board {
  rows: number[][];
  marks: Record<number, boolean>;
  constructor(input: string) {
    this.rows = input.split(/\r?\n/)
      .map(
        x => x.split(" ").filter(x => x.length).map(cell => parseInt(cell))
      );

    this.marks = {};
  }

  mark(num: number) {
    this.marks[num] = true;
  }

  isWinner(): boolean {
    const markedRows = this.rows.map(row => row.filter(x => this.marks[x]));
    const winningRows = markedRows.filter(row => row.length === 5);

    const columns = _.unzip(this.rows);
    const markedColumns = columns.map(col => col.filter(x => this.marks[x]));
    const winningColumns = markedColumns.filter(col => col.length === 5);

    return winningRows.length > 0 || winningColumns.length > 0;
  }

  score(): number {
    return _.chain(this.rows)
      .flatMap()
      .filter(x => !this.marks[x])
      .sum()
      .value();
  }
}

function parseInput(input: string): [number[], Board[]] {
  const [unparsedCalledNumbers, ...unparsedBoards] = input
    .split(/\r?\n\r?\n/)
    .map(x => x.trim())
    .filter(x => x.length);

  const boards = unparsedBoards.map(x => new Board(x));

  const calledNumbers = unparsedCalledNumbers
    .split(",")
    .map(x => parseInt(x));

  return [calledNumbers, boards];
}

export function part1(input: string): number {
  const [calledNumbers, boards] = parseInput(input);

  for(const num of calledNumbers) {
    for(const board of boards) {
      board.mark(num);

      if(board.isWinner()) {
        return board.score() * num;
      }
    }
  }

  return 0;
}

export function part2(input: string): number {
  const [calledNumbers, boards] = parseInput(input);

  let remainingBoards = boards;
  let lastScore = 0;
  for(const num of calledNumbers) {

    remainingBoards = remainingBoards.filter(board => {
      board.mark(num);

      if(board.isWinner()) {
        lastScore = board.score() * num;
        return false;
      }

      return true;
    });
  }

  return lastScore;
}

if(require.main === module) {
  const input = readFileSync("day4.txt", { encoding: "ascii"});
  console.log(`Day 1, part 1: ${part1(input)}`);
  console.log(`Day 1, part 2: ${part2(input)}`);
}
