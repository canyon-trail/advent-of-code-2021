import unittest
from example import example

class ExampleTests(unittest.TestCase):
    def test_example(self):
        result = example(2, 2)

        self.assertEqual(result, 4)
