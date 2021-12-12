import unittest
from day11 import part1, part2, cycle_grid, try_flash, increment_grid, cycle_grid_many

example_input = [
    '5483143223',
    '2745854711',
    '5264556173',
    '6141336146',
    '6357385478',
    '4167524645',
    '2176841721',
    '6882881134',
    '4846848554',
    '5283751526',
]

class ExampleTests(unittest.TestCase):
    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 1656)

    def test_cycle_grid(self):
        grid_spec = [
            '0008880000',
            '0008980000',
            '0008880000',
            '0000000000',
            '0000000000',
            '0000000000',
            '0000000000',
            '0000000000',
            '0000000000',
            '0000000000',
        ]
        expected_grid = "\n".join([
            '1.1.3.0.0.0.3.1.1.1',
            '1.1.4.0.0.0.4.1.1.1',
            '1.1.3.0.0.0.3.1.1.1',
            '1.1.2.3.4.3.2.1.1.1',
            '1.1.1.1.1.1.1.1.1.1',
            '1.1.1.1.1.1.1.1.1.1',
            '1.1.1.1.1.1.1.1.1.1',
            '1.1.1.1.1.1.1.1.1.1',
            '1.1.1.1.1.1.1.1.1.1',
            '1.1.1.1.1.1.1.1.1.1',
        ])

        grid = [
            [int(x) for x in row] for row in grid_spec
        ]

        self.assertEqual(cycle_grid(grid), 9)
        actual_grid = "\n".join([".".join(str(x) for x in row) for row in grid])
        self.assertEqual(actual_grid, expected_grid)

    def test_cycle_grid_many_sampledata_10(self):
        grid = [
            [int(x) for x in row] for row in example_input
        ]

        self.assertEqual(cycle_grid_many(grid, 10), 204)


    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 195)
