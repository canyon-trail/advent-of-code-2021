def part1(input):
    depths = [int(d) for d in input]

    return count_of_increases(depths)

def part2(input):
    depths = [int(d) for d in input]
    sums = [a + b + c for (a, b, c) in zip(depths[2:], depths[1:], depths)]

    return count_of_increases(sums)

def count_of_increases(measurements):
    pairs = zip(measurements[1:], measurements)
    depth_increases = [True for (cur, prev) in pairs if cur > prev]

    return len(depth_increases)


if __name__ == "__main__":
    with open('day1.txt') as f:
        input = f.readlines()

    print(f'Day 1, part 1: {part1(input)}')
    print(f'Day 1, part 2: {part2(input)}')