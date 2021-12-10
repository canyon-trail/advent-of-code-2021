import { readFileSync } from "fs";
const day = process.argv[2];

const input = readFileSync(`day${day}.txt`, { encoding: "ascii"});

const { part1, part2 } = require(`./day${day}`);

const p1start = new Date();
const s1 = part1(input);
const p2start = new Date();
const s2 = part2(input);
const p2end = new Date();
console.log(`Day ${day}, part 1: ${s1} (${p2start.getTime() - p1start.getTime()}ms)`);
console.log(`Day ${day}, part 2: ${s2} (${p2end.getTime() - p2start.getTime()}ms)`);