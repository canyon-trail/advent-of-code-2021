const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'input.txt'), 'utf-8', (err, input) => {
  if (err) console.error(err);

  if (require.main === module) {
    part1(input);
    part2(input);
  }
})

function part1(puzzleInput) {
  const { dots, folds } = parseInput(puzzleInput);

  const foldedDots = foldDots(dots, [folds[0]]);
  const uniqueCoords = [...foldedDots.values()];
  const result = uniqueCoords.reduce((total, yset) => total + yset.size, 0);
  console.log('part1 Result: ', result);
  return result;
}

function part2(puzzleInput) {
  const { dots, folds } = parseInput(puzzleInput);

  const foldedDots = foldDots(dots, folds);
  const [cols, rows] = getGridSize(foldedDots);
  const dotarr = [];
  
  for (let row = 0; row < rows; row ++){
    dotarr.push([]);
  }

  for (const [x, ys] of foldedDots) {
    for (const yval of ys) {
      dotarr[yval][x] = 'X';
    }
  }
  console.log('part2 Result:\n');
  const LETTER_WIDTH = Math.ceil(cols / 8);
  let currLetter = [];
  for(let letter = 0; letter < 8; letter++){
    currLetter = [];
    for(let row = 0; row < rows; row ++){
      currLetter.push([]);
      for(let col = letter * LETTER_WIDTH; col < (letter + 1) * LETTER_WIDTH ; col++){
        const val = dotarr[row][col] === 'X' ? '[#]': ' . '
        currLetter[row].push(val);
      }
    }
    console.log(`LETTER #: ${letter + 1}`);
    console.table(currLetter);
  }
}


function getGridSize(dots) {
  const xs = Array.from(dots.keys());
  const ys = [];
  for (const yvals of dots.values()) {
    ys.push(...yvals.values());
  }
  const cols = Math.max(...xs) + 1;
  const rows = Math.max(...ys) + 1;
  return [cols, rows];
}

function foldDots(dots, folds) {
  for (const fold of folds) {
    const [axis, lineCoord] = fold;
    if (axis === 'x') { //vertical line
      for (const [x, ys] of dots) {
        const dist = lineCoord - x;
        const newX = lineCoord + dist;
        if (x > lineCoord) {
          const newYs = dots.has(newX) 
            ? new Set([...dots.get(newX), ...ys]) 
            : ys;
            
          dots.delete(x);
          dots.set(newX, newYs)
        }
      }
    }
    if (axis === 'y') { //horizontal line
      for (const [x, ys] of dots) {

        const newYs = new Set();
        for (const y of ys) {
          if (y > lineCoord) {
            const dist = lineCoord - y;
            newYs.add(lineCoord + dist)
          } else {
            newYs.add(y);
          }
        }

        dots.set(x, newYs);
      }
    }
  }
  return dots;
}

function parseInput(puzzleInput) {
  const lines = puzzleInput.split('\n');
  const linebreak = lines.indexOf('');
  const foldlines = lines.slice(linebreak + 1).filter(line => line !== '');
  const dotlines = lines.slice(0, linebreak);
  const dots = new Map();
  for (let dotline of dotlines) {
    const dot = dotline.split(',').map(val => parseInt(val));
    const x = dot[0];
    const y = dot[1];
    if (dots.has(x)) {
      dots.set(x, dots.get(x).add(y));
    } else {
      dots.set(x, new Set([y]));
    }
  }
  const folds = [];
  for (const foldline of foldlines) {
    const equalsign = foldline.indexOf('=');
    const axis = foldline.substring(equalsign - 1, equalsign);
    const lineCoord = parseInt(foldline.substring(equalsign + 1))
    folds.push([axis, lineCoord]);
  }

  return { dots, folds };
}
module.exports = { part1, getGridSize, foldDots, parseInput }