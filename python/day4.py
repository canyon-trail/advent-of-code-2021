class Board:
    def __init__(self, input):
        raw_rows = input.splitlines()

        self.rows = [
            [int(v.strip()) for v in r.split(" ") if len(v) > 0]
            for r in raw_rows
        ]
        self.marks = set()

    def mark(self, num):
        self.marks.add(num)

    def is_winner(self):
        marked_rows = [
            [v for v in row if v in self.marks]
            for row in self.rows
        ]
        winning_rows = [row for row in marked_rows if len(row) == 5]

        columns = zip(*self.rows)
        marked_columns = [
            [v for v in col if v in self.marks]
            for col in columns
        ]
        winning_columns = [col for col in marked_columns if len(col) == 5]

        return len(winning_columns) + len(winning_rows) > 0

    def score(self):
        return sum(v for row in self.rows for v in row if v not in self.marks)

def part1(input):
    parts = input.split('\n\n')
    called_numbers = [int(n) for n in parts[0].split(",")]

    boards = [Board(b) for b in parts[1:]]

    for num in called_numbers:
        for board in boards:
            board.mark(num)

            if board.is_winner():
                return board.score() * num


def part2(input):
    parts = input.split('\n\n')
    called_numbers = [int(n) for n in parts[0].split(",")]

    boards = [Board(b) for b in parts[1:]]

    last_score = 0
    for num in called_numbers:
        new_boards = []
        for board in boards:
            board.mark(num)

            if board.is_winner():
                last_score = board.score() * num
            else:
                new_boards.append(board)
        boards = new_boards

    return last_score

if __name__ == "__main__":
    with open('day4.txt') as f:
        input = f.readlines()

    massaged_input = '\n'.join(input)

    print(f'Day 4, part 1: {part1(massaged_input)}')
    print(f'Day 4, part 2: {part2(massaged_input)}')