import unittest
from day2 import part1, part2

example_input = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2'
]

class ExampleTests(unittest.TestCase):
    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 150)

    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 900)
