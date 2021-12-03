class ForwardInstruction:
    def __init__(self, arg):
        self.arg = int(arg)

    def reduce_part1(self, coord):
        (x, y) = coord

        return (x + self.arg, y)

    def reduce_part2(self, state):
        (x, y, aim) = state

        return (x + self.arg, y + aim * self.arg, aim)

class UpInstruction:
    def __init__(self, arg):
        self.arg = int(arg)

    def reduce_part1(self, coord):
        (x, y) = coord

        return (x, y - self.arg)

    def reduce_part2(self, state):
        (x, y, aim) = state

        return (x, y, aim - self.arg)

class DownInstruction:
    def __init__(self, arg):
        self.arg = int(arg)

    def reduce_part1(self, coord):
        (x, y) = coord

        return (x, y + self.arg)

    def reduce_part2(self, state):
        (x, y, aim) = state

        return (x, y, aim + self.arg)

def parse_instruction(instruction):
    parts = instruction.split(' ')

    match parts:
        case ["forward", x]:
            return ForwardInstruction(x)
        case ["up", x]:
            return UpInstruction(x)
        case ["down", x]:
            return DownInstruction(x)

def part1(input):
    instructions = map(parse_instruction, input)

    pos = (0, 0)

    for instr in instructions:
        pos = instr.reduce_part1(pos)

    (x, y) = pos
    return x * y

def part2(input):
    instructions = map(parse_instruction, input)

    state = (0, 0, 0)

    for instr in instructions:
        state = instr.reduce_part2(state)

    (x, y, _) = state
    return x * y

if __name__ == "__main__":
    with open('day2.txt') as f:
        input = f.readlines()

    print(f'Day 2, part 1: {part1(input)}')
    print(f'Day 2, part 2: {part2(input)}')