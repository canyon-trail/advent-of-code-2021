import {
	part1,
	part2,
	calculateCO2ScrubberRating,
	calculateOxygenGeneratorRating,
	parseDecimal,
	parseInput,
} from './day3';

const sampleInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

test('part 1 example input should return 198', () => {
	expect(part1(sampleInput)).toBe(198);
});

test('parseDecimal of 10110 should be 22', () => {
	expect(parseDecimal([1, 0, 1, 1, 0])).toBe(22);
});

test('part 2 example input should return 230', () => {
	expect(part2(sampleInput)).toBe(230);
});

test('calculatOxygenGeneratorRating with sample input should return 10111', () => {
	const sampleArray = parseInput(sampleInput);
	expect(calculateOxygenGeneratorRating(sampleArray)).toStrictEqual([
		1, 0, 1, 1, 1,
	]);
});

test('calculateCO2ScrubberRating with sample input should return 01010', () => {
	const sampleArray = parseInput(sampleInput);
	expect(calculateCO2ScrubberRating(sampleArray)).toStrictEqual([
		0, 1, 0, 1, 0,
	]);
});
