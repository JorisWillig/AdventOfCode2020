const fileReader = require("fs");
const input = [];
const preambleSize = 25;

function checkNumber(index) {
  const number = input[index];
  const rests = [];

  let result = false;

  for (let i = index-preambleSize; i < index; i++) {
    if (rests.includes(input[i])) {
      result = true;
      break;
    } else {
      rests.push(number - input[i]);
    }
  }

  return result;
}

function findInvalidNumber() {
  for (let i = preambleSize; i < input.length; i++) {
    let numberCorrect = checkNumber(i);
    if (!numberCorrect) {
      return input[i];
    }
  }
  return null;
}

function day9a() {
  const invalidNumber = findInvalidNumber();
  if (invalidNumber) {
    console.log(`Incorrect number found: ${invalidNumber}`);
  } else {
    console.log("No number found...")
  }
}

function checkRange(startIndex, endIndex, target) {
  let total = 0;

  input.slice(startIndex, endIndex + 1).forEach(n => {
    total += n;
  });

  return total === target;
}

function findSmallestInRange(startIndex, endIndex) {
  let smallest = Number.MAX_SAFE_INTEGER;
  for (let i = startIndex; i <= endIndex; i++) {
    if (input[i] < smallest) smallest = input[i];
  }
  return smallest;
}

function findLargestInRange(startIndex, endIndex) {
  let largest = 0;
  for (let i = startIndex; i <= endIndex; i++) {
    if (input[i] > largest) largest = input[i];
  }
  return largest;
}

function searchRangesOfSize(rangeSize, target) {
  for (let i = 0; i < input.length - rangeSize; i++) {
    let success = checkRange(i, i + (rangeSize-1), target);
    if (success) {
      console.log(`firstIndex: ${i}, lastIndex: ${i+(rangeSize-1)}, rangeSize: ${rangeSize}`);
      return {success: true, smallest: findSmallestInRange(i, i+(rangeSize-1)), largest: findLargestInRange(i, i+(rangeSize-1))};
    }
  }
  return {success: false, smallest: null, largest: null};
}

function day9b() {
  const invalidNumber = findInvalidNumber();

  for (let i = 2; i < input.length; i++) {
    let {success, smallest, largest} = searchRangesOfSize(i, invalidNumber);

    if (success) {
      console.log(`success, numbers added together: ${smallest} + ${largest} = ${smallest + largest}`);
      return;
    }
  }

  console.log("no range found...");
}

fileReader.readFile("./Day9.txt", "utf8", (err, data) => {
  if (err) throw err;

  const numberStrings = data.split("\r\n");
  numberStrings.forEach(n => {
    input.push(parseInt(n));
  })

  day9a();
  day9b();
});