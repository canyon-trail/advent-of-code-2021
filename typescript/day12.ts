import _ from "lodash";

export class Cave {
  isSmall: boolean;
  isEnd: boolean;
  isStart: boolean;
  constructor(public name: string) {
    this.isSmall = name.toLowerCase() === name;
    this.isStart = name === "start";
    this.isEnd = name === "end";
  }
}

export class CaveMap {
  connections: Record<string, Set<string>>;
  caves: Record<string, Cave>;
  constructor() {
    this.connections = {};
    this.caves = {};
  }

  parseEntry(entry: string) {
    const [cave1name, cave2name] = entry.split("-");

    this.getOrAddCave(cave1name);
    this.getOrAddCave(cave2name);

    const c1Connections = this.connections[cave1name];
    const c2Connections = this.connections[cave2name];

    c1Connections.add(cave2name);
    c2Connections.add(cave1name);
  }

  private getOrAddCave(name: string) {
    let c = this.caves[name];

    if(!c) {
      c = new Cave(name);
      this.caves[name] = c;

      this.connections[name] = new Set<string>();
    }

    return c;
  }
}

class CandidatePath {
  visited: Set<string>;
  path: string[];
  revisitedCave: string | null;

  constructor(public map: CaveMap, public part2?: boolean) {
    this.visited = new Set<string>();
    this.path = ["start"]
    this.revisitedCave = null;
  }

  public findPaths(): string[][] {
    const current = _.last(this.path)!;
    if(current === "end") {
      return [this.path];
    }

    const visitableCaves = [...this.map.connections[current]]
      .map(x => this.map.caves[x])
      .filter(x => this.canVisit(x));

    const paths = visitableCaves.map(x => {
      const p = new CandidatePath(this.map, this.part2);
      p.path = [...this.path, x.name];
      p.visited = new Set<string>(p.path);
      p.revisitedCave = this.revisitedCave;
      if(this.part2 && p.revisitedCave === null && this.visited.has(x.name) && x.isSmall) {
        p.revisitedCave = x.name;
      }

      return p.findPaths();
    });

    return _.flatMap(paths, x => x);
  }

  private canVisit(cave: Cave): boolean {
    if(cave.name === "start") {
      return false;
    }

    if(!cave.isSmall) {
      return true;
    }

    if(!this.visited.has(cave.name)) {
      return true;
    }

    if(this.part2 && this.revisitedCave === null) {
      return true;
    }

    return false;
  }

}

export function findPaths(map: CaveMap, part2?: boolean): string[][] {
  return new CandidatePath(map, part2).findPaths();
}

export function parseInput(input: string): CaveMap {
  var map = new CaveMap();

  for(const entry of input.split(/\r?\n/).filter(x => x.length)) {
    map.parseEntry(entry);
  }

  return map;
}

export function part1(input: string): number {
  const map = parseInput(input);

  return findPaths(map).length;
}

export function part2(input: string): number {
  const map = parseInput(input);

  return findPaths(map, true).length;
}
