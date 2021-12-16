import _ from "lodash";

export function createGrid(input: string): number[][] {
  const innerRows = input.split(/\r?\n/)
    .filter(x => x.length > 0)
    .map(x => x.split("").map(v => parseInt(v)));

  const width = innerRows[0].length;
  const padRow = Array<number>(width + 2).fill(10);

  const rows = [padRow, ...innerRows.map(row => [10, ...row, 10]), padRow];

  return rows;
}

function findLowPoints(rows: number[][]): [number, number][] {
  const height = rows.length - 2;
  const width = rows[0].length - 2;

  const lowPoints: [number, number][] = [];
  for(let y = 1; y <= height; y++) {
    for(let x = 1; x <= width; x++) {
      const val = rows[y][x];

      const neighborVals = [
        rows[y][x - 1], // left
        rows[y][x + 1], // right
        rows[y - 1][x], // top
        rows[y + 1][x], // bottom
      ]

      if(neighborVals.filter(v => v <= val).length === 0) {
        lowPoints.push([x,y])
      }
    }
  }

  return lowPoints;
}

export function part1(input: string): number {
  const rows = createGrid(input);

  const lowPoints = findLowPoints(rows);

  const riskSum = _(lowPoints)
    .map(coord => rows[coord[1]][coord[0]] + 1)
    .sum();


  return riskSum;
}

export function flood(x: number, y: number, rows: number[][], marks?: Set<string>): Set<string> {
  if(!marks) {
    marks = new Set<string>();
  }
  const val = rows[y][x];

  if(val > 8) {
    return marks;
  }

  var coord = `${x},${y}`;

  if(marks.has(coord)) {
    return marks;
  }

  marks.add(coord);
  flood(x + 1, y, rows, marks);
  flood(x - 1, y, rows, marks);
  flood(x, y + 1, rows, marks);
  flood(x, y - 1, rows, marks);

  return marks;
}

export function part2(input: string): number {
  const rows = createGrid(input);

  const lowPoints = findLowPoints(rows);

  const basinSizes = _.chain(lowPoints)
    .map(coord => flood(coord[0], coord[1], rows))
    .map(basin => basin.size)
    .orderBy(x => -x) // descending sort
    .value()
    ;

  return _(basinSizes)
    .take(3)
    .reduce((a, b) => a * b)!
    ;

}
