import unittest
from day15 import part1, part2, parse_input, CaveMap

example_input = [
    '1163751742',
    '1381373672',
    '2136511328',
    '3694931569',
    '7463417111',
    '1319128137',
    '1359912421',
    '3125421639',
    '1293138521',
    '2311944581',
]

class Day15Test(unittest.TestCase):
    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 40)

    def test_map_value_at(self):
        cave_map = CaveMap(parse_input(example_input), 1)

        actual = [cave_map.value_at((x, 9)) for x in [8, 18, 28, 38, 48]]

        self.assertEqual(actual, [8, 9, 1, 2, 3])

    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 315)
