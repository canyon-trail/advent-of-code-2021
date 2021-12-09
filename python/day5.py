import re

class Line:
    def __init__(self, spec):
        match = re.match("^([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)$", spec)
        self.x1 = int(match.group(1))
        self.y1 = int(match.group(2))
        self.x2 = int(match.group(3))
        self.y2 = int(match.group(4))

    @property
    def is_horizontal(self):
        return self.y1 == self.y2

    @property
    def is_vertical(self):
        return self.x1 == self.x2

    @property
    def xmin(self):
        return min(self.x1, self.x2)

    @property
    def xmax(self):
        return max(self.x1, self.x2)

    @property
    def ymin(self):
        return min(self.y1, self.y2)

    @property
    def ymax(self):
        return max(self.y1, self.y2)

    @property
    def xrange(self):
        return abs(self.x1 - self.x2) + 1

    @property
    def yrange(self):
        return abs(self.y1 - self.y2) + 1

    @property
    def p1(self):
        return (self.x1, self.y1)

    @property
    def p2(self):
        return (self.x2, self.y2)

    @property
    def coords(self):
        if self.is_horizontal:
            return [(self.xmin + c, self.y1) for c in range(0, self.xrange)]
        if self.is_vertical:
            return [(self.xmin, self.ymin + c) for c in range(0, self.yrange)]

        min_point = (self.xmin, self.ymin)
        positive_slope = self.p1 == min_point or self.p2 == min_point

        (y_start, y_mult) = (self.ymin, 1) if positive_slope else (self.ymax, -1)

        return [(self.xmin + c, y_start + (c * y_mult)) for c in range(0, self.xrange)]

def get_intersection_count(lines):
    all_coords = (c for l in lines for c in l.coords)
    counts = {}
    for c in all_coords:
        counts[c] = counts.get(c, 0) + 1
    intersections = [k for k, count in counts.items() if count > 1]

    return len(intersections)

def part1(input):
    lines = [Line(spec) for spec in input]
    ortho_lines = [l for l in lines if l.is_horizontal or l.is_vertical]

    return get_intersection_count(ortho_lines)

def part2(input):
    lines = [Line(spec) for spec in input]

    return get_intersection_count(lines)

if __name__ == "__main__":
    with open('day5.txt') as f:
        input = f.readlines()

    print(f'Day 5, part 1: {part1(input)}')
    print(f'Day 5, part 2: {part2(input)}')