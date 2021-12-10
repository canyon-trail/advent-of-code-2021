import _ from "lodash";

type Orientation =
  | "Horizontal"
  | "Vertical";

export class Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  spec: string;
  constructor(spec: string) {
    const matches = (/^([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)$/).exec(spec) as RegExpMatchArray;
    this.spec = spec;

    const [x1, y1, x2, y2] = matches.slice(1).map(x => parseInt(x));

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

  }

  get orientation(): Orientation | null {
    if(this.x1 === this.x2) {
      return "Vertical";
    }

    if(this.y1 === this.y2) {
      return "Horizontal";
    }

    return null;
  }

  get xMax() { return Math.max(this.x1, this.x2); }
  get xMin() { return Math.min(this.x1, this.x2); }
  get yMax() { return Math.max(this.y1, this.y2); }
  get yMin() { return Math.min(this.y1, this.y2); }

  get coords(): string[] {
    if(this.orientation === "Horizontal") {
      return _.range(this.xMin, this.xMax + 1)
        .map(x => `${x},${this.y1}`);
    }
    if(this.orientation === "Vertical") {
      return _.range(this.yMin, this.yMax + 1)
        .map(y => `${this.x1},${y}`);
    }

    const range = this.xMax - this.xMin + 1;

    const [yStart, yMult] =
      (this.x1 === this.xMin && this.y1 === this.yMin)
      || (this.x2 === this.xMin && this.y2 === this.yMin)
      ? [this.yMin, 1]
      : [this.yMax, -1]

    return _.range(0, range)
      .map(offset => `${this.xMin + offset},${yStart + (offset * yMult)}`);
  }
}

function parseInput(input: string): Line[] {
  return _.chain(input.split(/\r?\n/))
    .map(x => new Line(x))
    .value();
}

function findIntersections(lines: Line[]): string[] {
  return _.chain(lines)
    .flatMap(x => x.coords)
    .groupBy(x => x)
    .pickBy((xs) => xs.length > 1)
    .keys()
    .value();
}

export function part1(input: string): number {
  const lines = parseInput(input)
    .filter(x => x.orientation !== null);

  const intersectingPoints = findIntersections(lines);

  return intersectingPoints.length;
}

export function part2(input: string): number {
  const lines = parseInput(input);

  const intersectingPoints = findIntersections(lines);

  return intersectingPoints.length;
}
