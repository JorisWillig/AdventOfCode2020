const fileReader = require("fs");
const input = [];
let sortedInput;

const nodes = {};

function findMax() {
  let max = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] > max) max = input[i];
  }
  return max;
}

function findMin() {
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < input.length; i++) {
    if (input[i] < min) min = input[i];
  }
  return min;
}

function findNextAdapter(current) {
  let lowest = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < input.length; i++) {
    let diff = input[i] - current
    if (diff <= 3 && diff > 0 && input[i] < lowest) {
      lowest = input[i];
    }
  }
  return lowest;
}

function day10a() {
  let highest = findMax();
  let current = findMin();
  let previous = 0;

  let diffs = [0, 0, 0];
  do {
    diffs[(current-previous)-1]++;
    previous = current;
    current = findNextAdapter(current);
  } while (current <= highest);

  diffs[2]++;

  console.log(`1-jolt diffs * 3-jolt diffs = ${diffs[0] * diffs[2]}` );
}

function doStep(index) {
  if (index === (sortedInput.length-1)){
    return 1;
  }

  if (nodes[index]) return nodes[index];

  let total = 0;
  for (let i = 1; i <= 3; i++) {
    const newIndex = index+i;
    if (newIndex <= sortedInput.length-1 && ((sortedInput[newIndex]-sortedInput[index]) <= 3)) {
      total += doStep(newIndex);
    }
  }

  nodes[index] = total;

  return total;
}

function day10b() {
  sortedInput = input.sort((a, b) => a - b);
  sortedInput.unshift(0);
  let totalPerms = doStep(0);
  console.log(`total arrangements: ${totalPerms}`);
}

fileReader.readFile("./Day10.txt", "utf8", (err, data) => {
  if (err) throw err;

  const numberStrings = data.split("\r\n");
  numberStrings.forEach(n => {
    input.push(parseInt(n));
  })

  day10a();
  day10b();
});