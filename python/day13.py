import re
from functools import reduce

class Transform:
    def __init__(self, spec):
        result = re.match(r'fold along (.)=([0-9]+)', spec)
        x = result.group(1) == 'x'
        if x:
            self.x_threshold = int(result.group(2))
            self.y_threshold = 10000
        else:
            self.y_threshold = int(result.group(2))
            self.x_threshold = 10000

    def apply(self, coord):
        (x, y) = coord
        new_x = x if x < self.x_threshold else (self.x_threshold - (x - self.x_threshold))
        new_y = y if y < self.y_threshold else (self.y_threshold - (y - self.y_threshold))
        return (new_x, new_y)

def apply_transforms(xforms, coord):
    return reduce(lambda c, xform: xform.apply(c), xforms, coord)

def parse_coord(spec):
    [x,y] = spec.split(',')

    return (int(x), int(y))

def part1(input):
    [raw_coords,raw_folds] = input.strip().split("\n\n")
    folds = [Transform(spec) for spec in raw_folds.split("\n")]
    coords = [parse_coord(coord) for coord in raw_coords.split("\n")]

    all_coords = set(folds[0].apply(c) for c in coords)
    return len(all_coords)

def part2(input):
    [raw_coords,raw_folds] = input.strip().split("\n\n")
    folds = [Transform(spec) for spec in raw_folds.split("\n")]
    coords = [parse_coord(coord) for coord in raw_coords.split("\n")]

    all_coords = set(apply_transforms(folds, c) for c in coords)

    max_x = 0
    max_y = 0

    for (x,y) in all_coords:
        max_x = max(x, max_x)
        max_y = max(y, max_y)

    output = '\n'
    for y in range(0, max_y + 1):
        for x in range(0, max_x + 1):
            output = output + ('X' if (x, y) in all_coords else ' ')
        output = output + '\n'

    return output


if __name__ == "__main__":
    with open('day13.txt') as f:
        input = f.read()

    print(f'Day 1, part 1: {part1(input)}')
    print(f'Day 1, part 2: {part2(input)}')