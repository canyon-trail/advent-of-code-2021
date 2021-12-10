import _ from 'lodash';

export function parseInput(input: string) {
	const lines = input.split(/\r?\n/).filter((x) => x !== '');
	const bitLines: string[][] = lines.map((x) => x.split(''));
	const bits = bitLines.map((row) => row.map((x) => parseInt(x)));

	return bits;
}

export function calculateGammaFromBits(bits: number[][]) {
	const gamma = _.unzipWith(bits, function (...bits) {
		var newValue = _.round(_.sum(bits) / bits.length);
		return newValue;
	});

	return gamma;
}

export function calculateEpsilonFromGamma(gamma: number[]) {
	const epsilon = gamma.map((x) => 1 - x);

	return epsilon;
}

export function parseDecimal(bits: number[]) {
	const bitsToDecimalValue = bits.reduce((previous, current, index) => {
		const exponent = bits.length - index - 1;
		const numberToAdd = current * Math.pow(2, exponent);
		return previous + numberToAdd;
	}, 0);
	return bitsToDecimalValue;
}

export function part1(input: string) {
	const bits = parseInput(input);
	const gamma = calculateGammaFromBits(bits);
	const epsilon = calculateEpsilonFromGamma(gamma);

	return parseDecimal(gamma) * parseDecimal(epsilon);
}

export function calculateOxygenGeneratorRating(bits: number[][]) {
	let gammaArray = calculateGammaFromBits(bits);
	let reducedArray: number[][] = bits;
	let pointer = 0;

	while (pointer < gammaArray.length) {
		reducedArray = reducedArray.filter(
			(x) => x[pointer] === gammaArray[pointer]
		);
		gammaArray = calculateGammaFromBits(reducedArray);
		if (reducedArray.length === 1) return reducedArray[0];
		pointer++;
	}

	return gammaArray;
}

export function calculateCO2ScrubberRating(bits: number[][]) {
	let gammaArray = calculateGammaFromBits(bits);
	let epsilonArray = calculateEpsilonFromGamma(gammaArray);
	let reducedArray: number[][] = bits;
	let pointer = 0;

	while (pointer < gammaArray.length) {
		reducedArray = reducedArray.filter(
			(x) => x[pointer] === epsilonArray[pointer]
		);
		gammaArray = calculateGammaFromBits(reducedArray);
		epsilonArray = calculateEpsilonFromGamma(gammaArray);
		if (reducedArray.length === 1) return reducedArray[0];
		pointer++;
	}

	return epsilonArray;
}

export function part2(input: string) {
	const bits = parseInput(input);
	const oxygenGeneratorRating = calculateOxygenGeneratorRating(bits);
	const CO2ScrubberRating = calculateCO2ScrubberRating(bits);

	return (
		parseDecimal(oxygenGeneratorRating) * parseDecimal(CO2ScrubberRating)
	);
}
