const isBigger = (num1: number, num2: number): boolean =>
	num1 < num2 ? true : false;

const isSmaller = (num1: number, num2: number): boolean =>
	num1 > num2 ? true : false;

const isDistanceValid = (num1: number, num2: number): boolean =>
	Math.abs(num1 - num2) <= 2 ? true : false;

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
