import { readFileSync } from "node:fs";

//=============================================================//
//                        FIRST PART
//=============================================================//

function isBigger(numArr: number[], index: number): boolean {
	if (numArr[index - 1] > numArr[index]) {
		return true;
	}
	return false;
}

function swap(numArr: number[], i: number, j: number) {
	if (isBigger(numArr, i)) {
		let temp = numArr[i];
		numArr[i] = numArr[j];
		numArr[j] = temp;
	}
}

function adjecentCompareSwap(numArr: number[], index: number) {
	if (isBigger(numArr, index)) {
		swap(numArr, index, index - 1);
	}
}

function sort(numArr: number[], index: number) {
	for (let i = index; i > 0; i--) {
		adjecentCompareSwap(numArr, i);
	}
}

// Sort an array of numbers using Sort Insertion algorithm
function sortInsertion(numArr: number[]): number[] {
	for (let i of numArr) {
		sort(numArr, i);
	}
	return numArr;
}

const absolutOfSubstraction = (num1: number, num2: number) => {
	return Math.abs(num1 - num2);
};

function sum(arr1: number[], arr2: number[]): number {
	const sortedArr1 = sortInsertion(arr1);
	const sortedArr2 = sortInsertion(arr2);
	const arrlength = arr1.length;
	let sum = 0;
	for (let i = 0; i < arrlength; i++) {
		sum = sum + absolutOfSubstraction(sortedArr1[i], sortedArr2[i]);
	}
	return sum;
}

// Turn string into string[]
const strIntoNumArr = (s: string): number[] => {
	return s
		.trim() // Removes the leading and trailing white space and line terminator characters from a string
		.split(/\s+/g)
		.map((num) => +num);
	// instead of trim(), I could use filter
};

function splitNumArrIntoTwoNumArr(numArr: number[]): [number[], number[]] {
	let numArr1: number[] = [];
	let numArr2: number[] = [];
	const arrLength = numArr.length;

	for (let i = 0; i < arrLength; i++) {
		if (i % 2) {
			numArr1.push(numArr[i]);
		} else {
			numArr2.push(numArr[i]);
		}
	}
	return [numArr1, numArr2];
}

const finalResult = (string: string): number => {
	const numbers = strIntoNumArr(string);
	// console.log(numbers);

	const numArrays = splitNumArrIntoTwoNumArr(numbers);
	const res = sum(numArrays[0], numArrays[1]);
	return res;
};

//! result of the first part
let fileContent = readFileSync("./day01.txt", "utf-8");
let resultFormFile = finalResult(fileContent);
console.log(`Part One: ${resultFormFile}`);

//=============================================================//
//                        SECOND PART
//=============================================================//

const isNumExists = (number: number, elementOfAnArr: number): boolean =>
	number === elementOfAnArr ? true : false;

const counter = (number: number, numArr: number[]): number => {
	let count: number = 0;
	for (const element of numArr) {
		if (isNumExists(number, element)) {
			count++;
		}
	}
	return count;
};

const additionOfRepeatedElements = (
	numArrOne: number[],
	numArrTwo: number[]
): number => {
	let addSum: number = 0;
	let count: number = 0;
	let multRes: number = 0;

	for (const element of numArrOne) {
		count += counter(element, numArrTwo);
		multRes = count * element;
		addSum += multRes;
		multRes = 0;
		count = 0;
	}
	return addSum;
};

const strToTwoNumArr = (string: string): [number[], number[]] =>
	splitNumArrIntoTwoNumArr(strIntoNumArr(string));

let partTow = additionOfRepeatedElements(
	strToTwoNumArr(fileContent)[0],
	strToTwoNumArr(fileContent)[1]
);
console.log(`Part Two: ${partTow}`);
