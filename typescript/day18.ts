import _ from "lodash";
import { apply, buildLexer, expectSingleResult, rule, seq, tok, alt, Parser } from "typescript-parsec";

enum Tok { Number, Comma, LeftBrace, RightBrace };
export type Pair = { left: SnailfishNum, right: SnailfishNum, depth: number, tag: "pair" }
export type RegNum = { tag: "num", value: number };
export type SnailfishNum = Pair | RegNum;

const lexer = buildLexer([
  [true, /^\[/g, Tok.LeftBrace],
  [true, /^\]/g, Tok.RightBrace],
  [true, /^,/g, Tok.Comma],
  [true, /^[0-9]+/g, Tok.Number],
])
const pNumber = apply(tok(Tok.Number), x => ({ tag: "num", value: parseInt(x.text) } as SnailfishNum));

const pLateBound = <T>(getParser: () => Parser<Tok, T>): Parser<Tok, T> => {
  return {
    parse(token) {
      return getParser().parse(token);
    }
  }
}

const pPair = (depth: number) => {
  const r = rule<Tok, Pair>();
  r.setPattern(
    apply(
      seq(
        tok(Tok.LeftBrace),
        alt(pNumber, pLateBound(() => pPair(depth + 1))),
        tok(Tok.Comma),
        alt(pNumber, pLateBound(() => pPair(depth + 1))),
        tok(Tok.RightBrace)
      ),
      (v => ({ left: v[1], right: v[3], depth, tag: "pair" }))
    )
  );

  return r;
}

export const SN = { // SN: "snailfish number"
  parse(input: string): Pair {
    return expectSingleResult(pPair(0).parse(lexer.parse(input)));
  },
  stringify(n: SnailfishNum): string {
    if(n.tag === "num") {
      return "" + n.value;
    }

    return `[${SN.stringify(n.left)},${SN.stringify(n.right)}]`
  },
  magnitude(n: SnailfishNum): number {
    if(n.tag === "num") {
      return n.value;
    }

    return (3 * SN.magnitude(n.left)) + (2 * SN.magnitude(n.right));
  }
}

function findExplodable(p: SnailfishNum): Pair | null {
  if(p.tag === "num") {
    return null;
  }

  if(p.depth < 4) {
    return findExplodable(p.left) || findExplodable(p.right)
  }

  return p;
}

export function* depthFirstTraverse(p: SnailfishNum): Generator<SnailfishNum> {
  if(p.tag === "pair") {
    for(const x of depthFirstTraverse(p.left)) {
      yield x;
    }
    for(const x of depthFirstTraverse(p.right)) {
      yield x;
    }
  }

  yield p;
}

export function replaceNode(root: SnailfishNum, existing: SnailfishNum, replacement: SnailfishNum): SnailfishNum {
  if(root === existing) {
    return replacement;
  }

  if(root.tag === "num") {
    return root;
  }

  return {
    ...root,
    left: replaceNode(root.left, existing, replacement),
    right: replaceNode(root.right, existing, replacement),
  }
}

function explode(number: Pair, explodable: Pair): Pair {
  const { left, right } = <{left: RegNum, right: RegNum}>explodable;
  const allNumbers = _.chain<SnailfishNum>([...depthFirstTraverse(number)])
    .filter(x => x.tag === "num")
    .value() as RegNum[];

  const leftReplaceIdx = allNumbers.indexOf(left) - 1;
  const rightReplaceIdx = allNumbers.indexOf(right) + 1;

  if(leftReplaceIdx >= 0) {
    const toReplace = allNumbers[leftReplaceIdx];
    const replacement = { ...toReplace, value: toReplace.value + left.value };

    number = replaceNode(number, toReplace, replacement) as Pair;
  }

  if(rightReplaceIdx < allNumbers.length) {
    const toReplace = allNumbers[rightReplaceIdx];
    const replacement = { ...toReplace, value: toReplace.value + right.value };

    number = replaceNode(number, toReplace, replacement) as Pair;
  }

  // number has been rewritten; must re-find the same explodable
  explodable = findExplodable(number)!;

  return replaceNode(number, explodable, { tag: "num", value: 0 }) as Pair
}

export function reduceStep(number: Pair): Pair {
  const explodable = findExplodable(number);
  if(explodable !== null) {
    return explode(number, explodable);
  }

  const splittable = _.chain([...depthFirstTraverse(number)])
    .filter(x => x.tag === "num" && x.value > 9)
    .first()
    .value() as RegNum;

  if(!splittable) {
    return number;
  }

  const parent = _.chain([...depthFirstTraverse(number)])
    .filter(x => x.tag === "pair" && (x.left === splittable || x.right === splittable))
    .first()
    .value() as Pair;

  const replacement: Pair = {
    tag: "pair",
    depth: parent.depth + 1,
    left: { tag: "num", value: Math.floor(splittable.value / 2) },
    right: { tag: "num", value: Math.ceil(splittable.value / 2) },
  }

  return replaceNode(number, splittable, replacement) as Pair;
}

function reduce(n: Pair): Pair {
  let prevNum = n;
  let newNum = reduceStep(prevNum);
  while(newNum !== prevNum) {
    prevNum = newNum;
    newNum = reduceStep(prevNum);
  }

  return newNum;
}

function add(a: Pair, b: Pair): Pair {
  const sum = `[${SN.stringify(a)},${SN.stringify(b)}]`;

  return reduce(SN.parse(sum));
}


export function part1(input: string): number {
  const numbers = input.trim().split(/\r?\n/)
    .map(x => SN.parse(x));

  const sum = numbers.reduce(add);

  return SN.magnitude(sum);
}

export function part2(input: string): number {
  const numbers = input.trim().split(/\r?\n/)
    .map(x => SN.parse(x));

  let maxSum = 0;
  for(const n1 of numbers) {
    for(const n2 of numbers) {
      if(n1 !== n2) {
        maxSum = Math.max(maxSum, SN.magnitude(add(n1, n2)));
      }
    }
  }

  return maxSum;
}