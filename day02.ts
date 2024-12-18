import { readFileSync } from "node:fs";

//=============================================================//
//                        FIRST PART
//=============================================================//

const isSmaller = (num1: number, num2: number): boolean =>
	num1 > num2 ? true : false;

const isDistanceValid = (num1: number, num2: number): boolean => {
	let num = Math.abs(num1 - num2);
	if (num < 4 && num !== 0) {
		return true;
	}
	return false;
};

const isIncreasingAndCorrect = (numArr: number[]): boolean => {
	const length = numArr.length;
	for (let i = 0; i < length - 1; i++) {
		if (isSmaller(numArr[i], numArr[1 + i])) {
			return false;
		}
		if (!isDistanceValid(numArr[i], numArr[i + 1])) {
			return false;
		}
	}
	return true;
};

const isDecreasingAndCorrect = (numArr: number[]): boolean => {
	const length = numArr.length;
	for (let i = 0; i < length - 1; i++) {
		if (!isSmaller(numArr[i], numArr[1 + i])) {
			return false;
		}
		if (!isDistanceValid(numArr[i], numArr[i + 1])) {
			return false;
		}
	}
	return true;
};

console.log(`for isIncreasingAndCorrect`);

let res = isIncreasingAndCorrect([1, 3, 2, 4, 5]);
console.log(res);

res = isIncreasingAndCorrect([1, 3, 6, 7, 9]);
console.log(res);

res = isIncreasingAndCorrect([8, 6, 4, 4, 1]);
console.log(res);

res = isIncreasingAndCorrect([1, 3, 4, 4, 5]);
console.log(res);

console.log(`for isDecreaingAndCorrect`);
res = isDecreasingAndCorrect([1, 3, 2, 4, 5]);
console.log(res);

res = isDecreasingAndCorrect([8, 6, 4, 4, 1]);
console.log(res);

res = isDecreasingAndCorrect([7, 6, 4, 2, 1]);
console.log(res);

const input = [
	[7, 6, 4, 2, 1],
	[1, 2, 7, 8, 9],
	[9, 7, 6, 2, 1],
	[1, 3, 2, 4, 5],
	[8, 6, 4, 4, 1],
	[1, 3, 6, 7, 9],
];

const numOfCorrects = (arrNumArr: number[][]): number => {
	let result: number = 0;
	// const length = arrNumArr.length;
	for (const i of arrNumArr) {
		if (isSmaller(i[0], i[1])) {
			// console.log(`isSmaller: ${isSmaller(i[0], i[1])}`);

			if (isDecreasingAndCorrect(i)) {
				result++;
				// console.log(`result in isSmaller: ${result}`);
			}
		} else {
			// console.log(`isSmaller: ${isSmaller(i[0], i[1])}`);
			if (isIncreasingAndCorrect(i)) {
				result++;
				// console.log(`result in isSmaller: ${result}`);
			}
		}
	}
	return result;
};

let result = numOfCorrects(input);
console.log(result);

let strInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const arrayOfNumberArrays = (strInput: string): number[][] => {
	return strInput
		.trim() // Remove leading and trailing whitespace
		.split("\n") // Split into rows
		.map(
			(row) => row.trim().split(/\s+/g).map(Number) // Remove spaces and convert to numbers
		);
};

let arrOfArr = arrayOfNumberArrays(strInput);
console.log(arrOfArr);

result = numOfCorrects(arrOfArr);
console.log(result);

//! result of the first part
let fileContent = readFileSync("./day02.txt", "utf-8");

arrOfArr = arrayOfNumberArrays(fileContent);
console.log(arrOfArr);

result = numOfCorrects(arrOfArr);
console.log(`Part One: ${result}`);
