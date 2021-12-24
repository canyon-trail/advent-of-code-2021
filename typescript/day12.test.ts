import { part1, part2, parseInput, findPaths } from './day12';

const sampleInput1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const sampleInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const sampleInput3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

describe('day 12', () => {
  it("parses input", () => {
    const actual = parseInput(sampleInput1);

    expect(actual.connections).toEqual({
      start: new Set(["A", "b"]),
      A: new Set(["start", "b", "c", "end"]),
      b: new Set(["start", "A", "d", "end"]),
      c: new Set(["A"]),
      d: new Set(["b"]),
      end: new Set(["A", "b"])
    });
  });

  it("finds paths", () => {
    const expectedPaths = [
      'start,A,b,A,c,A,end',
      'start,A,b,A,end',
      'start,A,b,end',
      'start,A,c,A,b,A,end',
      'start,A,c,A,b,end',
      'start,A,c,A,end',
      'start,A,end',
      'start,b,A,c,A,end',
      'start,b,A,end',
      'start,b,end',
    ].sort();

    const actual = findPaths(parseInput(sampleInput1))
      .map(x => x.join(","))
      .sort();

    expect(actual).toEqual(expectedPaths);
  });

  it('part 1, sample input 1', () => {
    expect(part1(sampleInput1)).toBe(10);
  });
  it('part 1, sample input 2', () => {
    expect(part1(sampleInput2)).toBe(19);
  });
  it('part 1, sample input 3', () => {
    expect(part1(sampleInput3)).toBe(226);
  });

  it('part 2, sample input 1', () => {
    expect(part2(sampleInput1)).toBe(36);
  });

});
