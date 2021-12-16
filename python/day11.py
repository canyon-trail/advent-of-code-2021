coords = [(x, y) for x in range(0, 10) for y in range(0, 10)]

def valid_coord(coord):
    (x, y) = coord

    return 0 <= x <= 9 and 0 <= y <= 9

def try_flash(coord, grid, flash_locs):
    (x, y) = coord

    val = grid[y][x]

    if(val <= 9):
        return

    if(coord in flash_locs):
        return

    flash_locs.add(coord)
    candidate_neighbors = [
        (x + 1, y), # e
        (x + 1, y + 1), # ne
        (x, y + 1), # n
        (x - 1, y + 1), # nw
        (x - 1, y), # w
        (x - 1, y - 1), # sw
        (x, y - 1), # s
        (x + 1, y - 1), # se
    ]
    neighbors = [(cx, cy) for (cx, cy) in candidate_neighbors if valid_coord((cx, cy))]

    for coord in neighbors:
        (fx, fy) = coord
        neighbor_val = grid[fy][fx]
        grid[fy][fx] = neighbor_val + 1

        try_flash(coord, grid, flash_locs)

def increment_grid(grid):

    for (x, y) in coords:
        val = grid[y][x]

        grid[y][x] = val + 1

def cycle_grid(grid):
    flash_locs = set()

    increment_grid(grid)

    for coord in coords:
        try_flash(coord, grid, flash_locs)

    for (x, y) in flash_locs:
        grid[y][x] = 0

    return len(flash_locs)

def cycle_grid_many(grid, days):
    total_flashes = 0
    for count in range(0, days):
        total_flashes = total_flashes + cycle_grid(grid)

    return total_flashes

def part1(input):
    grid = [
        [int(x) for x in row.strip()] for row in input if len(row.strip()) > 0
    ]

    return cycle_grid_many(grid, 100)

def all_flashed(grid):
    for v in (v for row in grid for v in row):
        if v > 0:
            return False

    return True

def try_synchronize(grid):
    cycle_grid(grid)

    return all_flashed(grid)

def part2(input):
    grid = [
        [int(x) for x in row.strip()] for row in input if len(row.strip()) > 0
    ]

    day = 1
    while not try_synchronize(grid):
        day = day + 1

    return day


if __name__ == "__main__":
    with open('day11.txt') as f:
        input = f.readlines()

    print(f'Day 11, part 1: {part1(input)}')
    print(f'Day 11, part 2: {part2(input)}')