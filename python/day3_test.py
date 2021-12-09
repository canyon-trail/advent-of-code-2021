import unittest
from day3 import part1, part2

example_input = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010'
]

class ExampleTests(unittest.TestCase):
    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 198)

    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 230)
