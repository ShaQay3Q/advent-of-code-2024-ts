import { readFileSync } from "node:fs";
import { disconnect } from "node:process";

//=============================================================//
//                        FIRST PART
//=============================================================//

// Function to check if the first number is greater than the second number
const isSmaller = (num1: number, num2: number): boolean => num1 > num2;

// Function to validate if the distance between two numbers is valid
const isDistanceValid = (num1: number, num2: number): boolean => {
	const distance = Math.abs(num1 - num2);
	return distance < 4 && distance !== 0;
};

// Function to check if an array is increasing and distances are valid
const isIncreasingAndCorrect = (numArr: number[]): boolean => {
	const l = numArr.length;
	for (let i = 0; i < l - 1; i++) {
		if (
			isSmaller(numArr[i], numArr[i + 1]) ||
			!isDistanceValid(numArr[i], numArr[i + 1])
		) {
			return false;
		}
	}
	return true;
};

// Function to check if an array is decreasing and distances are valid
const isDecreasingAndCorrect = (numArr: number[]): boolean => {
	const l = numArr.length;
	for (let i = 0; i < l - 1; i++) {
		if (
			!isSmaller(numArr[i], numArr[i + 1]) ||
			!isDistanceValid(numArr[i], numArr[i + 1])
		) {
			return false;
		}
	}
	return true;
};

// Function to count the number of valid arrays based on increasing/decreasing rules
const numOfCorrects = (arrNumArr: number[][]): number => {
	let count = 0;

	for (const numArr of arrNumArr) {
		if (isSmaller(numArr[0], numArr[1]) && isDecreasingAndCorrect(numArr)) {
			count++;
		} else if (
			!isSmaller(numArr[0], numArr[1]) &&
			isIncreasingAndCorrect(numArr)
		) {
			count++;
		}
	}

	return count;
};

// let result = numOfCorrects(input);
// console.log(result);

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

// let arrOfArr = arrayOfNumberArrays(strInput);
// console.log(arrOfArr);

// result = numOfCorrects(arrOfArr);
// console.log(result);

//! result of the first part
let fileContent = readFileSync("./day02.txt", "utf-8");

let arrOfArr = arrayOfNumberArrays(fileContent);
// console.log(arrOfArr);

let result = numOfCorrects(arrOfArr);
// console.log(`Part One: ${result}`);

//=============================================================//
//                        SECOND PART
//=============================================================//

const isIncreasing = (numArr: number[]): boolean => {
	const l = numArr.length;
	for (let i = 0; i < numArr.length - 1; i++) {
		if (numArr[i] >= numArr[i + 1]) {
			return false;
		}
	}
	return true;
};

const isDecreasing = (numArr: number[]): boolean => {
	const l = numArr.length;
	for (let i = 0; i < numArr.length - 1; i++) {
		// if (numArr[i] <= numArr[i + 1])
		if (!isSmaller(numArr[i], numArr[i + 1])) {
			return false;
		}
	}
	return true;
};

const isSafeReport = (numArr: number[]): boolean => {
	const l = numArr.length;
	// Check if the numArr is strictly increasing or decreasing
	if (isIncreasing(numArr) || isDecreasing(numArr)) {
		// Ensure all adjacent differences are valid
		for (let i = 0; i < l - 1; i++) {
			if (!isDistanceValid(numArr[i], numArr[i + 1])) {
				return false;
			}
		}
		return true;
	}
	return false;
};

const canBeMadeSafe = (numArr: number[]): boolean => {
	const l = numArr.length;
	for (let i = 0; i < l; i++) {
		// Create a copy of the numArr excluding the current level
		const modifiedReport = [...numArr.slice(0, i), ...numArr.slice(i + 1)];
		if (isSafeReport(modifiedReport)) {
			return true;
		}
	}
	return false;
};

const countSafeReports = (reports: number[][]): number => {
	let safeCount = 0;

	for (const report of reports) {
		if (isSafeReport(report) || canBeMadeSafe(report)) {
			safeCount++;
		}
	}

	return safeCount;
};

// Example Usage
const reports = [
	[7, 6, 4, 2, 1],
	[1, 2, 7, 8, 9],
	[9, 7, 6, 2, 1],
	[1, 3, 2, 4, 5],
	[8, 6, 4, 4, 1],
	[1, 3, 6, 7, 9],
];

console.log(countSafeReports(reports)); // Output: 4
result = countSafeReports(arrOfArr);
console.log(result);
