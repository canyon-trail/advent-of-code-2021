def compute_gamma_bits(bit_rows):
    bit_columns = zip(*bit_rows)

    bit_sums = map(lambda x: sum(int(v) for v in x), bit_columns)

    return list(map(lambda x: round(float(x) / len(bit_rows)), bit_sums))

def part1(input):
    bit_rows = [list(x) for x in input]

    gamma_bits = compute_gamma_bits(bit_rows)
    epsilon_bits = [1 - x for x in gamma_bits]

    gamma = int(''.join(str(x) for x in gamma_bits), 2)
    epsilon = int(''.join(str(x) for x in epsilon_bits), 2)
    return gamma * epsilon

def most_common_bit_at_pos(rows, pos):
    column = [x[pos] for x in rows]
    column_sum = sum(column)

    # python's round(...) function is... weird...
    return int(round(1 + float(column_sum) / len(rows))) - 1

def compute_oxygen_rating(bit_rows):
    remaining_rows = list(bit_rows)
    pos = 0

    while len(remaining_rows) > 1:
        most_common = most_common_bit_at_pos(remaining_rows, pos)

        remaining_rows = [x for x in remaining_rows if x[pos] == most_common]
        pos = pos + 1

    return int(''.join(str(x) for x in remaining_rows[0]), 2)

def compute_co2_rating(bit_rows):

    remaining_rows = list(bit_rows)
    pos = 0

    while len(remaining_rows) > 1:
        most_common = most_common_bit_at_pos(remaining_rows, pos)
        least_common = 1 - most_common

        remaining_rows = [x for x in remaining_rows if x[pos] == least_common]

        pos = pos + 1

    return int(''.join(str(x) for x in remaining_rows[0]), 2)


def part2(input):
    bit_rows = [list(int(c) for c in x) for x in input]

    o2rating = compute_oxygen_rating(bit_rows)
    co2rating = compute_co2_rating(bit_rows)
    return o2rating * co2rating

if __name__ == "__main__":
    with open('day3.txt') as f:
        input = f.readlines()

    print(f'Day 3, part 1: {part1(input)}')
    print(f'Day 3, part 2: {part2(input)}')