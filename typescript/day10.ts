import _ from "lodash";

const openToClose: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}
const illegalScores: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}
const completionScores: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

function runParsing(line: string): [string[], number | null] {
  const stack: string[] = [];

  for(let pos = 0; pos < line.length; pos++) {
    const current = line[pos];

    if(openToClose[current]) {
      stack.unshift(current);
    } else { // assuming no weird stray inputs
      const stackTop = stack[0];

      if(openToClose[stackTop] !== current) {
        return [stack, pos];
      }

      stack.shift();
    }
  }

  return [stack, null];

}

export function getIllegalCharPos(line: string): number | null {
  const [_, pos] = runParsing(line);

  return pos;
}

function getIllegalChar(line: string): string | null {
  var pos = getIllegalCharPos(line);

  return pos === null ? null : line[pos];
}

function scoreStack(stack: string[]): number {
  let score = 0;
  while(stack.length) {
    const cur = stack.shift();

    const curScore = completionScores[openToClose[cur!]];

    score = score * 5 + curScore;
  }

  return score;
}


export function part1(input: string): number {
  const lines = input.split(/\r?\n/).filter(x => x.length);

  return _(lines)
    .map(x => getIllegalChar(x))
    .filter(x => x !== null)
    .map(x => illegalScores[x!])
    .sum();
}

export function part2(input: string): number {
  const lines = input.split(/\r?\n/).filter(x => x.length);

  const scores = _(lines)
    .map(x => runParsing(x))
    .filter(x => x[1] === null)
    .map(x => x[0])
    .map(x => scoreStack(x))
    .orderBy(x => x)
    .toArray()
    .value();

  const middleIdx = _.floor(scores.length / 2);

  return scores[middleIdx];
}
