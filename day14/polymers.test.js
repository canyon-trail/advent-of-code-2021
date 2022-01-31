const { part1, part2, initCounts, getPairs, mapRules, incrPoly, } = require('./polymers');

const sample = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

test('getPairs returns arr of overlapping char pairs', () => {
  expect(getPairs('NNCB')).toEqual(['NN', 'NC', 'CB']);
})

describe('mapRules returns a map of pairs -> insertion value', () => {
  const rules = mapRules(sample);
  const testPairs = ['CH', 'NN', 'CN'];
  const resultPairs = ['B', 'C', 'C'];
  it('left hand pair should return right hand insertion', () => {
    for (let i = 0; i < testPairs.length; i++) {
      expect(rules.get(testPairs[i])).toEqual(resultPairs[i]);
    }
  });

})

test('part1(sample) should return 1588', () => {
  expect(part1(sample, 10)).toEqual(1588);
})

test('part2(sample) should return 2188189693529', () => {
  expect(part2(sample, 40)).toEqual(2188189693529);
})

describe('initCounts should return count of each element and pair', () => {
  const seed = sample.split('\n')[0]; //NNCB
  const counts = initCounts(seed, {});
  it('creates correct num of entries for pairs and elems', () => {
    expect(Object.keys(counts).length).toEqual(6) // Pairs: NN, NC, CB; Elems N:2, C:1, B:1
  });
  it('counts correct number of each element in original seed', () => {
    expect(counts['N']).toEqual(2);
    expect(counts['C']).toEqual(1);
    expect(counts['B']).toEqual(1);
  })
})

describe('incrPoly takes a polymer and returns updated counts object after insertion', () => {
  describe('step 1 returns correct counts for "NCNBCHB"', () => {
    const rules = mapRules(sample);
    const seed = sample.split('\n')[0];
    const poly = initCounts(seed, {});
    it('incrPoly 1 step matches example', () => {
      const newPoly = incrPoly(poly, rules);
      //example step 1 polymer: NCNBCHB
      expect(newPoly['N']).toEqual(2);
      expect(newPoly['B']).toEqual(2);
      expect(newPoly['NC']).toEqual(1);
      expect(newPoly['HB']).toEqual(1);
      expect(newPoly['NB']).toEqual(1);
    })
  })
  describe('step 2 returns correct counts for "NBCCNBBBCBHCB"', () => {
    const rules = mapRules(sample);
    const seed = sample.split('\n')[0];
    let poly = initCounts(seed, {});
    it('incrCounts 2 steps matches example', () => {
      //example result: NBCCNBBBCBHCB
      let steps = 2;
      while(steps > 0){
        poly = incrPoly(poly, rules);
        steps--;
      }
      expect(poly['N']).toEqual(2);
      expect(poly['B']).toEqual(6);
      expect(poly['BB']).toEqual(2);
      expect(poly['BC']).toEqual(2);
      expect(poly['NB']).toEqual(2);
    })
  })
})