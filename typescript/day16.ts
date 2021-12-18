import _ from "lodash";
import { rule, seq, str, alt, apply, rep_sc, Parser, err, buildLexer, expectSingleResult, } from "typescript-parsec";

type Operator = "sum" | "product" | "min" | "max" | "gt" | "lt" | "eq"
const numsToOps: Record<number, Operator> = {
  0: "sum",
  1: "product",
  2: "min",
  3: "max",
  5: "gt",
  6: "lt",
  7: "eq",
}
type BasePacket<T extends string> = {
  version: number;
  tag: T;
}
type LiteralPacket = BasePacket<"literal"> & { value: number }
type OperatorPacket = BasePacket<"operator"> & {
  subPackets: Packet[]
  operation: Operator
}
type Packet = LiteralPacket | OperatorPacket

const parseBitSequence = (bits: string[]): number => parseInt(bits.join(""), 2);

const pBit = apply(alt(str("0"), str("1")), (v) => v.text);

const seq_n = <T>(p: Parser<unknown, T>, length: number): Parser<unknown, T[]> => {
  const seqArgs = Array(length).fill(p)

  return (seq as ((...ps: Parser<unknown, T>[]) => Parser<unknown, T[]>))(...seqArgs);
}

const pNumber = (width: number) => {
  return apply(
    seq_n(pBit, width),
    parseBitSequence
  )
}

const pOperator = apply(pNumber(3), n => numsToOps[n]);

const combine = <TLeft, TRight>(pLeft: Parser<unknown, TLeft>, pRightApply: (val: TLeft) => Parser<unknown, TRight>): Parser<unknown, TRight> => {
  return {
    parse(token) {
      const result = pLeft.parse(token);

      if(!result.successful) {
        return result;
      }

      return pRightApply(result.candidates[0].result).parse(result.candidates[0].nextToken);
    }
  }
}

const pLeadingLength = <T>(pItem: Parser<unknown, T>, pLength: Parser<unknown, number>): Parser<unknown, T[]> => {
  return {
    parse(token) {
      const lengthResult = err(pLength, "cannot parse length of leading length").parse(token);
      if(!lengthResult.successful) {
        return lengthResult;
      }
      const length = lengthResult.candidates[0].result;
      const beginToken = lengthResult.candidates[0].nextToken;
      let curToken = beginToken;

      const results: T[] = [];
      while(curToken?.pos.index! - beginToken?.pos.index! < length) {
        const res = pItem.parse(curToken);
        if(!res.successful) {
          return res;
        }
        results.push(res.candidates[0].result);
        curToken = res.candidates[0].nextToken;
      }

      return {
        successful: true,
        error: undefined,
        candidates: [{
          firstToken: token,
          nextToken: curToken,
          result: results,
        }]
      }
    }
  }
}

export const pLeadingQuintet = rule<unknown, string>();
pLeadingQuintet.setPattern(
  apply(
    seq(str("1"), pBit, pBit, pBit, pBit),
    vals => vals.slice(1).join("")
  )
)

export const pLastQuintet = rule<unknown, string>();
pLastQuintet.setPattern(
  apply(
    seq(str("0"), pBit, pBit, pBit, pBit),
    vals => vals.slice(1).join("")
  )
)

export const pLiteral = rule<unknown, number>();
pLiteral.setPattern(
  apply(
    seq(
      rep_sc(pLeadingQuintet),
      pLastQuintet,
    ),
    vals => parseBitSequence([...vals[0], vals[1]])
  )
)

export const pPacket = rule<unknown, Packet>();

export const pLiteralPacket = rule<unknown, LiteralPacket>();
pLiteralPacket.setPattern(
  err(
    apply(
      seq(pNumber(3), seq(str("1"), str("0"), str("0")), pLiteral),
      (vals) => ({ version: vals[0], value: vals[2], tag: "literal" })
    ),
    "cannot parse literal packet"
  )
)

const pSubPackets = rule<unknown, Packet[]>();
pSubPackets.setPattern(combine(pNumber(1), num => {
  if(num === 0) {
    return pLeadingLength(pPacket, pNumber(15));
  }

  return combine(pNumber(11), c => seq_n(pPacket, c))
}));

const pOperatorPacket = rule<unknown, OperatorPacket>();
pOperatorPacket.setPattern(
  apply(
    seq(pNumber(3), pOperator, pSubPackets),
    (vals) => ({
      version: vals[0],
      operation: vals[1],
      tag: "operator",
      subPackets: vals[2],
    })
  )
)

pPacket.setPattern({
  parse(token) {
    const literalResult = pLiteralPacket.parse(token);
    if(literalResult.successful) {
      return literalResult;
    }

    return pOperatorPacket.parse(token);
  }
});


export function parseHex(hex: string): string {
  return _.chain(hex.trim().split(""))
    .map(x => parseInt(x, 16))
    .map(x => x.toString(2))
    .map(x => x.padStart(4, "0"))
    .join("")
    .value();
}

function getVersionSum(p: Packet): number {
  if(p.tag === "literal") {
    return p.version;
  }

  return p.version + _.sum(p.subPackets.map(x => getVersionSum(x)));

}

function parseRootPacket(input: string) {
  var parsedInput = parseHex(input);
  var nullLexer = buildLexer([[true, /^./g, undefined]]);
  return expectSingleResult(pPacket.parse(nullLexer.parse(parsedInput)));
}

export function computeVersionSum(input: string): number {
  return getVersionSum(parseRootPacket(input));
}

export function part1(input: string): number {
  return computeVersionSum(input);
}

function computePacketValue(p: Packet): number {
  if(p.tag === "literal") {
    return p.value;
  }

  const subValues = p.subPackets.map(x => computePacketValue(x));

  switch(p.operation) {
    case "min":
      return _.min(subValues)!;
    case "max":
      return _.max(subValues)!;
    case "sum":
      return _.sum(subValues);
    case "product":
      return subValues.reduce((a, b) => a * b);
    case "eq":
      return subValues[0] === subValues[1] ? 1 : 0;
    case "lt":
      return subValues[0] < subValues[1] ? 1 : 0;
    case "gt":
      return subValues[0] > subValues[1] ? 1 : 0;
  }
}

export function part2(input: string): number {
  const rootPacket = parseRootPacket(input);

  return computePacketValue(rootPacket);
}
