import { readFileSync } from "fs";

export type Position = {
  x: number;
  y: number;
}
type SubmarineState = Position & {
  aim: number;
}
type Instruction = {
  arg: number;
  reducePart1(p: Position): Position;
  reducePart2(s: SubmarineState): SubmarineState;
}
class InstructionBase {
  arg: number;
  constructor(arg: string) {
    this.arg = parseInt(arg);
  }
}
export class Up extends InstructionBase implements Instruction {
  constructor(arg: string) { super(arg) }
  reducePart1({ x, y }: Position): Position {
    return { x, y: y - this.arg }
  }
  reducePart2({ x, y, aim }: SubmarineState): SubmarineState {
    return { x, y, aim: aim - this.arg }
  }
}
export class Down extends InstructionBase implements Instruction {
  constructor(arg: string) { super(arg) }
  reducePart1({ x, y }: Position): Position {
    return { x, y: y + this.arg }
  }
  reducePart2({ x, y, aim }: SubmarineState): SubmarineState {
    return { x, y, aim: aim + this.arg }
  }
}
export class Forward extends InstructionBase implements Instruction {
  constructor(arg: string) { super(arg) }
  reducePart1({ x, y }: Position): Position {
    return { x: x + this.arg, y: y }
  }
  reducePart2({ x, y, aim }: SubmarineState): SubmarineState {
    return { x: x + this.arg, y: y + aim * this.arg, aim }
  }
}

export function part1(input: string): number {
  const instructions = input.split("\n");

  const offsets = instructions
    .filter(x => x.trim().length > 0)
    .map(x => parse(x));

  var finalPoint = offsets.reduce(
    (pt, instr) => instr.reducePart1(pt),
    { x: 0, y: 0 });

  return finalPoint.x * finalPoint.y;
}

export function part2(input: string): number {
  const instructions = input.split("\n");

  const offsets = instructions
    .filter(x => x.trim().length > 0)
    .map(x => parse(x));

  var finalState = offsets.reduce(
    (state, instr) => instr.reducePart2(state),
    { x: 0, y: 0, aim: 0 });

  return finalState.x * finalState.y;
}

export function parse(instruction: string): Instruction {
  const [type, arg] = instruction.split(" ");
  switch(type) {
    case "forward": return new Forward(arg);
    case "up": return new Up(arg);
    case "down": return new Down(arg);
  }

  throw new Error("Unexpected instruction " + instruction);
}

if(require.main === module) {
  const input = readFileSync("day2.txt", { encoding: "ascii"});
  console.log(`Day 2, part 1: ${part1(input)}`);
  console.log(`Day 2, part 2: ${part2(input)}`);
}
