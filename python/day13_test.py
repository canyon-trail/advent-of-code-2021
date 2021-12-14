import unittest
from day13 import part1, part2, Transform, apply_transforms

example_input = '''6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5'''

class Day13Tests(unittest.TestCase):
    def test_part1example(self):
        result = part1(example_input)

        self.assertEqual(result, 17)

    def test_part2example(self):
        result = part2(example_input)

        self.assertEqual(result, 0)

    def test_tranform_x(self):
        c = (7, 4)

        testee = Transform("fold along x=6")

        self.assertEqual(testee.apply(c), (5, 4))

    def test_tranform_y(self):
        c = (2, 18)

        testee = Transform("fold along y=10")

        self.assertEqual(testee.apply(c), (2, 2))

    def test_apply_transforms(self):
        t1 = Transform("fold along y=10")
        t2 = Transform("fold along x=10")

        result = apply_transforms([t1, t2], (19, 19))

        self.assertEqual(result, (1, 1))
