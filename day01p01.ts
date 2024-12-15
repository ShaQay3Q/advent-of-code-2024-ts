import { readFileSync } from "node:fs";

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

let arr1 = [3, 4, 2];
let arr2 = [4, 3, 5];

let res = sum(arr1, arr2);
// console.log(res);

arr1 = [...arr1, 1, 3, 3];
arr2 = [...arr2, 3, 9, 3];

res = sum(arr1, arr2);
// console.log(res);

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
	// console.log(`numArr1: ${numArr1}`);
	// console.log(`numArr2: ${numArr2}`);

	return [numArr1, numArr2];
}

let str = `
82728   61150
39850   94024
`;

const num = strIntoNumArr(str);
// console.log(typeof num);
// console.log(`number[]: ${num}`);

const result = splitNumArrIntoTwoNumArr(num);
// console.log(result);

// console.log(typeof ["82728", "61150"]);

// const s = strArr(str);
// console.log(s);

const finalResult = (string: string): number => {
	const numbers = strIntoNumArr(string);
	// console.log(numbers);

	const numArrays = splitNumArrIntoTwoNumArr(numbers);
	const res = sum(numArrays[0], numArrays[1]);
	return res;
};

let sumResult = finalResult(str);

// console.log(sumResult);

let input = `
82728   61150
39850   94024
24609   43406
24964   98661
16230   17299
`;

input = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

let nArr = strIntoNumArr(input);
console.log(nArr);

let resArrs = splitNumArrIntoTwoNumArr(nArr);
let arrOne = resArrs[0];
let arrTow = resArrs[1];

let sortedOne = sortInsertion(arrOne);
let sortedTwo = sortInsertion(arrTow);

console.log(sortedOne);
console.log(sortedTwo);

let sumRes = sum(resArrs[0], resArrs[1]);
console.log(sumRes);

let finalRes = finalResult(input);
console.log(finalRes);

// let output = finalResult(input);
// console.log(output);

// input = ``;
// output = finalResult(input);
// console.log(output);

const fileContent = readFileSync("./day01p01.txt", "utf-8");
console.log(fileContent);

let resultFormFile = finalResult(fileContent);
console.log(resultFormFile);
