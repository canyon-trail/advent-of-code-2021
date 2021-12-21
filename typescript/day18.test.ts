import { SN, reduceStep, Pair, SnailfishNum, depthFirstTraverse, replaceNode, part1, part2 } from "./day18";

const sampleInput = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

describe("day 18", () => {
  describe("single-step explodes", () => {
    it("should explode to right-handed right pair", () => {
      const parsed = SN.parse("[[[[[9,8],1],2],3],4]");

      const expected = "[[[[0,9],2],3],4]";

      expect(SN.stringify(reduceStep(parsed))).toEqual(expected);
    });

    it("should to left-handed right pair", () => {
      const parsed = SN.parse("[[[[[9,8],[1,2]],[3,4]],5],6]");

      const expected = "[[[[0,[9,2]],[3,4]],5],6]";

      expect(SN.stringify(reduceStep(parsed))).toEqual(expected);
    });

    it("should explode to right-handed left pair", () => {
      const parsed = SN.parse("[[1,2],[[[[9,8],1],1],1]]");

      const expected = "[[1,11],[[[0,9],1],1]]";

      expect(SN.stringify(reduceStep(parsed))).toEqual(expected);
    });

    it("should explode to left-handed left pair", () => {
      const parsed = SN.parse("[1,[[[[9,8],1],1],1]]");

      const expected = "[10,[[[0,9],1],1]]";

      expect(SN.stringify(reduceStep(parsed))).toEqual(expected);
    });
  });

  it("should compute magnitude", () => {
    const num = SN.parse("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");

    expect(SN.magnitude(num)).toBe(3488);

  });

  it("should compute part1 example", () => {

    expect(part1(sampleInput)).toBe(4140)
  });

  it("should compute part2 example", () => {

    expect(part2(sampleInput)).toBe(3993)
  });

  it("should replace node", () => {
    const parsed = SN.parse("[[[[[9,8],1],2],3],4]");

    const allNodes = [...depthFirstTraverse(parsed)];

    const toReplace = allNodes.find(x => x.tag === "pair" && x.depth === 4)!;
    const replacement: SnailfishNum = { tag: "num", value: 0 };

    const actual = replaceNode(parsed, toReplace, replacement) as Pair;

    expect(SN.stringify(actual)).toEqual("[[[[0,1],2],3],4]");
  });

  it("should parse simple pair", () => {
    expect(SN.parse("[1,2]")).toEqual({
      left: { value: 1, tag: "num" },
      right: { value: 2, tag: "num" },
      depth: 0,
      tag: "pair",
    })
  })
});