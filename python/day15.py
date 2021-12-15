import heapq

class CaveMap:
    def __init__(self, rows, repeat):
        self.rows = rows
        self.repeat = repeat
        self.height = len(rows * repeat)
        self.width = len(rows[0] * repeat)
        self.tile_width = len(rows[0])
        self.tile_height = len(rows)

    def value_at(self, coord):
        x,y = coord
        tile_x = x // self.tile_width
        tile_y = y // self.tile_height
        increment = tile_x + tile_y
        base_x = x % self.tile_width
        base_y = y % self.tile_height
        v = self.rows[base_y][base_x]
        return ((v - 1 + increment) % 9) + 1

    def get_neighbor_coords(self, pos):
        x,y = pos

        candidates = [
            (x + 1, y),
            (x - 1, y),
            (x, y + 1),
            (x, y - 1),
        ]

        return [(cx, cy) for cx,cy in candidates if 0 <= cx < self.width and 0 <= cy < self.height]

    def worst_case_distance(self):
        return 9 * ((self.width - 1) + (self.height - 1))

class MappingState:
    def __init__(self):
        self.distances = {}
        self.dist_heap = []

        self.set_distance((0,0), 0)

    def get_distance(self, pos, default):
        return self.distances.get(pos, default)

    def set_distance(self, pos, distance):
        if self.distances.get(pos, None) == distance:
            return

        self.distances[pos] = distance
        heapq.heappush(self.dist_heap, (distance, pos))

    def get_min_pos(self):
        return self.dist_heap[0][1]

    def pop(self):
        item = heapq.heappop(self.dist_heap)
        del self.distances[item[1]]

def dijkstra(cave_map):
    height = cave_map.height
    width = cave_map.width
    infinity = height * 10 + width * 10
    visited = set()
    destination = (width - 1, height - 1)
    pos = (0, 0)
    state = MappingState()

    while pos != destination:
        visited.add(pos)
        distance = state.get_distance(pos, 0)
        neighbor_coords = [c for c in cave_map.get_neighbor_coords(pos) if c not in visited]

        for coord in neighbor_coords:
            existing_distance = state.get_distance(coord, infinity)
            candidate_distance = distance + cave_map.value_at(coord)

            state.set_distance(coord, min(existing_distance, candidate_distance))

        state.pop()
        pos = state.get_min_pos()

    return state.get_distance(destination, None)

def parse_input(input):
    return [
        [
            int(x) for x in row.strip()
        ] for row in input if len(row) > 0
    ]

def part1(input):
    rows = parse_input(input)

    cave_map = CaveMap(rows, 1)

    return dijkstra(cave_map)

def part2(input):
    rows = parse_input(input)

    cave_map = CaveMap(rows, 5)

    return dijkstra(cave_map)

if __name__ == "__main__":
    with open('day15.txt') as f:
        input = f.readlines()

    print(f'Day 15, part 1: {part1(input)}')
    print(f'Day 15, part 2: {part2(input)}')