import unittest
from day5 import part1, part2, get_intersection_count, Line
from itertools import groupby

example_input = [
    '0,9 -> 5,9',
    '8,0 -> 0,8',
    '9,4 -> 3,4',
    '2,2 -> 2,1',
    '7,0 -> 7,4',
    '6,4 -> 2,0',
    '0,9 -> 2,9',
    '3,4 -> 1,4',
    '0,0 -> 8,8',
    '5,5 -> 8,2'
]

class ExampleTests(unittest.TestCase):
    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 5)

    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 12)

    def test_intersection(self):
        lines = [
            Line('0,9 -> 5,9'),
            Line('0,9 -> 2,9'),
        ]

        self.assertEqual(get_intersection_count(lines), 3)
