import unittest
from day14 import part1, part2, parse_input, run_step, insert_polymer

example_input = '''NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C'''

def compute_counts(polymer):
    ret = {}
    for l in polymer:
        ret[l] = ret.get(l, 0) + 1

    return ret

class Day14Test(unittest.TestCase):
    def test_parse_input(self):
        (start, rules) = parse_input(example_input)

        expected_rules = {
            'CH': 'B',
            'HH': 'N',
            'CB': 'H',
            'NH': 'C',
            'HB': 'C',
            'HC': 'B',
            'HN': 'C',
            'NN': 'C',
            'BH': 'H',
            'NC': 'B',
            'NB': 'B',
            'BN': 'B',
            'BB': 'N',
            'BC': 'B',
            'CC': 'N',
            'CN': 'C',
        }

        self.assertEqual(start, 'NNCB')
        self.assertEqual(rules, expected_rules)

    def test_run_step(self):
        (start, rules) = parse_input(example_input)

        result = run_step(start, rules, 'B')

        self.assertEqual(''.join(result), 'NCNBCHB')

    def test_insert_polymer_0(self):
        (start, rules) = parse_input(example_input)

        result = insert_polymer(start, rules, 0)

        expected = {
            'N': 2,
            'C': 1,
            'B': 1,
        }

        self.assertEqual(result, expected)

    def test_insert_polymer_1(self):
        (start, rules) = parse_input(example_input)

        expected = {
            'N': 2,
            'C': 2,
            'B': 2,
            'H': 1
        }

        self.assertEqual(insert_polymer('NB', rules, 1), compute_counts('NBB'))
        self.assertEqual(insert_polymer(start, rules, 1), expected)

    def test_insert_polymer_2a(self):
        (start, rules) = parse_input(example_input)

        result = insert_polymer('BB', rules, 2)

        expected = compute_counts('BBNBB')

        self.assertEqual(result, expected)


    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 1588)

    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 2188189693529)
