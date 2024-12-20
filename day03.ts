import { readFileSync } from "node:fs";

const filecontent = readFileSync("./day03.txt", "utf-8");

const regex = /mul\(\d{1,3},\d{1,3}\)/g;

const code =
	"xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const matches = code.match(regex) as RegExpExecArray;

console.log(matches);

const numArr = (input: RegExpMatchArray): number[][] => {
	let output: number[][] = [];
	if (input) {
		const resultAsNumbers = input.map((match) => {
			const numbers = match.match(/\d{1,3}/g); // Extract numbers from the string
			return numbers ? numbers.map(Number) : []; // Convert to numbers
		});
		return resultAsNumbers;
		// Example output: [[1, 4], [123, 5], [34, 56]]
	}
	return output;
};

let res = numArr(matches);
console.log(res);

const calculate = (numbers: number[][]): number => {
	let total = 0;
	for (const i of numbers) {
		total += i[0] * i[1];
	}
	return total;
};

let result = calculate(res);
console.log(result);

const usableText = filecontent.match(regex) as RegExpExecArray;

result = calculate(numArr(usableText));
console.log(result);
