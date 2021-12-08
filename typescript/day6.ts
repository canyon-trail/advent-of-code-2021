import { readFileSync } from "fs";

export function parseInput(file: string) {
  let array: string[] = file.split(',');
  let result: number[] = array.map((str: string) => Number(str));
  return result;
}

export function part1(input: string) {
  const TIMER_START = 6;
  const FIRST_TIMER_START = TIMER_START + 2;
  const DAYS = 80;

  let lanternfish: number[] = parseInput(input);

  for (let i = 0; i < DAYS; i += 1) {

    for (let j = 0; j < lanternfish.length; j += 1) {
      let newFish = 0;

      if (lanternfish[j] === 0) {
        lanternfish[j] = 6;
        newFish += 1;
      } else {
        lanternfish[j] -= 1;
      }

      for (let k = 0; k < newFish; k += 1) {
        lanternfish.push(9);
      }
    }
    
  }
  return lanternfish.length;
}

// Part 2
export function part2(input: string) {
  const DAYS = 256;
  let initialAges: number[] = parseInput(input);

  let lanternfish = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let fish of initialAges) {
    lanternfish[fish] += 1;
  }

  for (let i = 0; i < DAYS; i += 1) {
    let reset = 0;
    for (let i = 0; i < 9; i += 1) {
      if (i === 0) {
        lanternfish['9'] = lanternfish['0'];
        reset = lanternfish['0'];
      } 

      lanternfish[i] = lanternfish[i + 1];
    }
    lanternfish['6'] += reset;
  }
  
  let count = 0;
  for (let i = 0; i < 9; i += 1) {
    count += lanternfish[i];
  }

  return count;
}

if(require.main === module) {
  const input = readFileSync('day6.txt', 'utf-8');
  console.log(`Day 1, part 1: ${part1(input)}`);
  console.log(`Day 1, part 2: ${part2(input)}`);
}