import { buildLexer, Rule, expectSingleResult } from "typescript-parsec";
import { part1, part2, parseHex, pLiteral, pPacket } from "./day16";

var lexer = buildLexer([[true, /^./g, undefined]]);
function parseWithRule<T>(rule: Rule<unknown, T>, input: string){
  return expectSingleResult(rule.parse(lexer.parse(input)));
}

describe("day 16", () => {
  const part1Examples = [
    { input: '8A004A801A8002F478', expected: 16 },
    { input: '620080001611562C8802118E34', expected: 12 },
    { input: 'C0015000016115A2E0802F182340', expected: 23 },
    { input: 'A0016C880162017C3686B18A3D4780', expected: 31 },
  ]

  part1Examples.forEach(testCase => it(`should compute part 1 for ${testCase.input}`, () => {
    expect(part1(testCase.input)).toBe(testCase.expected);
  }))

  const part2Examples = [
    { input: 'C200B40A82', expected: 3 },
    { input: '04005AC33890', expected: 54 },
    { input: '880086C3E88112', expected: 7 },
    { input: 'CE00C43D881120', expected: 9 },
    { input: 'D8005AC2A8F0', expected: 1 },
    { input: 'F600BC2D8F', expected: 0 },
    { input: '9C005AC2F8F0', expected: 0 },
    { input: '9C0141080250320F1802104A08', expected: 1 },
  ]
  part2Examples.forEach(testCase => it(`should compute part 2 for ${testCase.input}`, () => {
    expect(part2(testCase.input)).toBe(testCase.expected);
  }))

  it("should parse hex to binary", () => {
    expect("100".padStart(4, '0')).toBe("0100")
    expect(parseHex('D2FE28\n')).toBe("110100101111111000101000");
  });

  it("should parse literal (quintet-encoded number)", () => {
    expect(parseWithRule(pLiteral, '101111111000101000')).toBe(2021);
  });

  it("should parse literal packet", () => {
    expect(parseWithRule(pPacket, '110100101111111000101000')).toEqual({
      version: 6,
      value: 2021,
      tag: "literal",
    });
  });

  it("should parse length type 1 operator packet", () => {
    expect(parseWithRule(pPacket, '11101110000000001101010000001100100000100011000001100000')).toEqual({
      version: 7,
      tag: "operator",
      operation: "max",
      subPackets: [
        expect.objectContaining({ value: 1 }),
        expect.objectContaining({ value: 2 }),
        expect.objectContaining({ value: 3 }),
      ]
    });
  });

  it("should parse length type 0 operator packet", () => {
    expect(parseWithRule(pPacket, '00111000000000000110111101000101001010010001001000000000')).toEqual({
      version: 1,
      tag: "operator",
      operation: "lt",
      subPackets: [
        expect.objectContaining({ value: 10 }),
        expect.objectContaining({ value: 20 }),
      ]
    });
  });
});