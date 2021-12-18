const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'input.txt'), 'utf-8', (err, data) => {
  if (err) console.error(err);

  if (require.main === module) {
    part1(data, 10);
    part2(data, 40);
  }
})

function part1(puzzleInput, steps){
  const result = runPoly(puzzleInput, steps);
  console.log('part1 result: ', result);
  return result;
  
};
function part2(puzzleInput, steps) {
  const result = runPoly(puzzleInput, steps)
  console.log('part2 result: ', result);
  return result;
}

function runPoly(puzzleInput, steps) {
  const rules = mapRules(puzzleInput);
  const seed = puzzleInput.split('\n')[0];
  let poly = initCounts(seed, {});
  while (steps > 0){
    poly = incrPoly(poly, rules);
    steps--;
  }
  const result = calcResult(poly);
  return result;
}

function getPairs(str) {
  const chars = str.split('')
  const pairs = [];
  for (let i = 0; i < chars.length - 1; i++) {
    pairs.push(chars[i] + chars[i + 1]);
  }
  return pairs;
};

function mapRules(puzzleInput) {
  const rules = new Map();
  const rulestrs = puzzleInput.split('\n').slice(2);
  for (const str of rulestrs) {
    const [key, val] = str.split(' -> ');
    rules.set(key, val)
  }
  return rules;
}

function calcResult(poly) {
  const elems = Object.keys(poly).filter(key => key.length === 1);
  const min = elems.reduce((prev, curr) => poly[curr] < poly[prev] ? curr : prev)
  const max = elems.reduce((prev, curr) => poly[curr] > poly[prev] ? curr : prev)
  const result = poly[max] - poly[min];
  return result;
}

//initialize counts for pairs and elements in seed
function initCounts(seed, counts) {
  const seedPairs = getPairs(seed);
  seedPairs.forEach((pair, index) => {
    const [elem1, elem2] = pair.split('');
    counts[elem1] = counts[elem1] + 1 || 1;
    counts[pair] = counts[pair] + 1 || 1;
    if (index === seedPairs.length - 1) {
      counts[elem2] = counts[elem2] + 1 || 1;
    }
  });
  return counts;
}

function incrPoly(poly, rules) {
  const newPoly = {};

  // copy existing element counts
  const elems = Object.keys(poly)
    .filter(key => key.length === 1);
  for (const elem of elems) {
    newPoly[elem] = poly[elem];
  }

  //restructure pairs and add new elements
  const pairs = Object.keys(poly)
    .filter(key => key.length > 1);

  pairs.forEach(pair => {
    let pairCount = poly[pair];
    const newElem = rules.get(pair);
    const newPair1 = pair.charAt(0) + newElem;
    const newPair2 = newElem + pair.charAt(1);
    for (const key of [newPair1, newPair2, newElem]) {
      newPoly[key] = newPoly[key] + pairCount || pairCount;
    }
  })
  
  return newPoly;
}

module.exports = { part1, part2, getPairs, mapRules, initCounts, incrPoly }