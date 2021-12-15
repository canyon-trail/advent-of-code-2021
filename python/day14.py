import itertools

def parse_input(input):
    [start, raw_rules] = input.strip().split('\n\n')

    rules = {}
    for r in raw_rules.split('\n'):
        [k,v] = r.split(' -> ')
        rules[k] = v

    return (start, rules)

def run_step(polymer, rules, last):
    pairs = itertools.pairwise(polymer)

    inserted = (a + rules.get(a + b, '') for a,b in itertools.pairwise(polymer))

    flattened = itertools.chain.from_iterable(inserted)

    return itertools.chain(flattened, [last])

def merge_counts(a, b):
    res = {}

    for (k,v) in itertools.chain(a.items(), b.items()):
        res[k] = res.get(k, 0) + v

    return res

def insert_polymer(polymer, rules, count, memo = {}):
    last = polymer[-1:]

    counts = { last: 1 }
    if count == 0:
        for l in polymer[:-1]:
            counts[l] = counts.get(l, 0) + 1
        return counts

    memo_key = (polymer, count)

    memoized = memo.get(memo_key, None)

    if memoized is not None:
        return memoized

    for (left, right) in itertools.pairwise(polymer):
        mid = rules.get(left + right, '')
        if mid == '':
            counts = merge_counts({ left: 1, right: 1 }, counts)
            continue

        sub_polymer_left = left + mid
        sub_polymer_right = mid + right

        sub_counts_left = insert_polymer(sub_polymer_left, rules, count - 1, memo)
        sub_counts_right = insert_polymer(sub_polymer_right, rules, count - 1, memo)

        counts = merge_counts(counts, merge_counts(sub_counts_left, { mid: -1 }))
        counts = merge_counts(counts, merge_counts(sub_counts_right, { right: -1 }))


    memo[memo_key] = counts
    return counts

def part1(input):
    (start, rules) = parse_input(input)

    counts = insert_polymer(start, rules, 10)

    max_count = max(*counts.values())
    min_count = min(*counts.values())

    return max_count - min_count

def part2(input):
    (start, rules) = parse_input(input)

    counts = insert_polymer(start, rules, 40)

    max_count = max(*counts.values())
    min_count = min(*counts.values())

    return max_count - min_count


if __name__ == "__main__":
    with open('day14.txt') as f:
        input = f.read()

    print(f'Day 1, part 1: {part1(input)}')
    print(f'Day 1, part 2: {part2(input)}')