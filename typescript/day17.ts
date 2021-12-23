type TargetArea = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
}

type SimulationStep = TargetArea & {
  xVelocity: number;
  yVelocity: number;
  x: number;
  y: number;
}

function parseInput(input: string): TargetArea {
  const match = input.trim().match(/^target area: x=(-?[0-9]+)\.\.(-?[0-9]+), y=(-?[0-9]+)\.\.(-?[0-9]+)$/);

  return {
    xMin: parseInt(match![1]!),
    xMax: parseInt(match![2]!),
    yMin: parseInt(match![3]!),
    yMax: parseInt(match![4]!),
  }
}

function isDoomed({ x, y, xMax, yMin, yVelocity }: SimulationStep) : boolean {
  if(x > xMax) {
    return true;
  }

  if(y < yMin && yVelocity <= 0) {
    return true;
  }

  return false;
}

function nextSimulationStep(sim: SimulationStep): SimulationStep {
  return {
    ...sim,
    x: sim.x + sim.xVelocity,
    y: sim.y + sim.yVelocity,
    xVelocity: Math.max(0, sim.xVelocity - 1),
    yVelocity: sim.yVelocity - 1,
  }
}

export function simulate(sim: SimulationStep) : number | null {
  let yMax = sim.y;
  let hitTarget = false;

  let currentSim = sim;

  while(!isDoomed(currentSim)) {
    currentSim = nextSimulationStep(currentSim);

    yMax = Math.max(yMax, currentSim.y);
    hitTarget = hitTarget ||
      (currentSim.x >= currentSim.xMin) && (currentSim.x <= currentSim.xMax) &&
      (currentSim.y >= currentSim.yMin) && (currentSim.y <= currentSim.yMax);
  }

  const result = hitTarget ? yMax : null;

  return result;
}

export function part1(input: string): number {
  const range = parseInput(input);
  const { xMin, xMax, yMin } = range;
  const baseSimulation: SimulationStep = { ...range, x: 0, y: 0, xVelocity: 0, yVelocity: 0 };

  const minXVelocity = Math.floor(Math.sqrt(xMin / 2));
  const maxXVelocity = xMax;

  let currentMaxY = yMin;
  for(let xVelocity = minXVelocity; xVelocity <= maxXVelocity; xVelocity++) {
    const maxYVelocity = maxXVelocity * 4;
    for(let yVelocity = minXVelocity; yVelocity <= maxYVelocity; yVelocity++) {
      const result = simulate({ ...baseSimulation, xVelocity, yVelocity });
      currentMaxY = Math.max(currentMaxY, result || currentMaxY);
    }
  }

  return currentMaxY;
}

export function part2(input: string): number {
  const range = parseInput(input);
  const { xMin, xMax, yMin } = range;
  const baseSimulation: SimulationStep = { ...range, x: 0, y: 0, xVelocity: 0, yVelocity: 0 };

  const minXVelocity = Math.floor(Math.sqrt(xMin / 2));
  const maxXVelocity = xMax;
    const maxYVelocity = maxXVelocity * 4;

  let velocities: [number, number][] = [];
  for(let xVelocity = minXVelocity; xVelocity <= maxXVelocity; xVelocity++) {

    for(let yVelocity = yMin; yVelocity <= maxYVelocity; yVelocity++) {
      const result = simulate({ ...baseSimulation, xVelocity, yVelocity });
      if(result !== null) {
        velocities.push([xVelocity, yVelocity]);
      }
    }
  }

  return velocities.length;
}