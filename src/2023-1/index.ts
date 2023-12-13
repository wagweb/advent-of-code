import * as fs from "fs";

// ===========================================================
// advent of code 2023-1 | https://adventofcode.com/2023/day/1
// ===========================================================

// dict
// prettier-ignore
const dict: {
    [key: string]: number;
} = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "zero": 0, 
    "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 0,
};

// read file
const buffer = fs.readFileSync("./data/2023-1/values.txt");

// create array of lines
const lines: string[] = buffer.toString().split("\n");

// values
const values: number[] = [];

// digits
const digits: {
	[key: number]: {
		first: { value: number; index: number };
		last: { value: number; index: number };
	};
} = {};

// find digits
lines.forEach((line: string, lineIndex: number) => {
	// create digits object
	digits[lineIndex] = {
		first: { value: -1, index: -1 },
		last: { value: -1, index: -1 },
	};
	// loop through dict
	for (const key in dict) {
		if (line.includes(key)) {
			// check if index is lower than first index or if first index is -1
			const indexFirst = line.indexOf(key);
			if (
				indexFirst <= digits[lineIndex].first.index ||
				digits[lineIndex].first.index === -1
			) {
				digits[lineIndex].first.index = indexFirst;
				digits[lineIndex].first.value = dict[key];
			}
			// check if index is higher than last index or if last index is -1
			const indexLast = line.lastIndexOf(key);
			if (
				indexLast >= digits[lineIndex].last.index ||
				digits[lineIndex].last.index === -1
			) {
				digits[lineIndex].last.index = indexLast;
				digits[lineIndex].last.value = dict[key];
			}
		}
	}
});

// combine digits
for (const key in digits) {
	values.push(
		parseInt(`${digits[key].first.value}${digits[key].last.value}`)
	);
}

// sum values
const sum = values.reduce((value, currentValue) => value + currentValue);

// log sum
console.log(`values sum: ${sum}`);
