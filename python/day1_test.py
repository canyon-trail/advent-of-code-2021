import unittest
from day1 import part1, part2

example_input = ['199', '200', '208', '210', '200', '207', '240', '269', '260', '263']

class ExampleTests(unittest.TestCase):
    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 7)

    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 5)
