import { readFileSync } from "fs";
import _ from "lodash";

const cycleLength = 6; // 0 index
const firstCyclePenalty = 2;
const totalCycle = cycleLength + firstCyclePenalty;

export function parseInput(input: string): number[] {
  return input.split(",").map((x) => parseInt(x));
}

export function initializeTimers(timers: number[]): number[] {
  let initialValues = _.countBy(timers);
  for (let i = 0; i <= cycleLength + firstCyclePenalty; i++) {
    if (!initialValues[i]) initialValues[i] = 0;
  }

  return _.map(initialValues);
}

export function cycle(timerCounts: number[]) {
  let spawnCounts = timerCounts.shift()!;
  timerCounts.push(spawnCounts);
  timerCounts[cycleLength] += spawnCounts;
  return timerCounts;
}

export function part1(input: string) {
  const timers = parseInput(input);
  let timerCounts = initializeTimers(timers);
  const cyclesToCount = 80;

  for (let i = 0; i < cyclesToCount; i++) timerCounts = cycle(timerCounts);

  return _.sum(timerCounts);
}

export function part2(input: string) {
  const timers = parseInput(input);
  let timerCounts = initializeTimers(timers);
  const cyclesToCount = 256;

  for (let i = 0; i < cyclesToCount; i++) timerCounts = cycle(timerCounts);

  return _.sum(timerCounts);
}

if (require.main === module) {
  const input = readFileSync("day6.txt", "utf-8");
  console.log(`Day 6, part 1: ${part1(input)}`);
  console.log(`Day 6, part 2: ${part2(input)}`);
}
