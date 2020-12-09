const fileReader = require("fs");
const input = [];
let visited;
let tried;
let shouldTry;

let currentIndex;
let accumulator;

function executeCommand(command) {
  switch (command.cmnd) {
    case "jmp":
      currentIndex += command.value;
      return;
    case "acc":
      accumulator += command.value;
      currentIndex++;
      return;
    default:
      currentIndex++;
      return;
  }
}

function day8a() {
  visited = [];
  currentIndex = 0;
  accumulator = 0;

  let shouldLoop = true;
  while (shouldLoop) {
    currentCommand = input[currentIndex];
    visited.push(currentIndex);
    executeCommand(currentCommand);
    shouldLoop = !(visited.includes(currentIndex));
  }

  console.log("accumulator: " + accumulator);
}

function day8b() {
  
}

fileReader.readFile("./Day8-test.txt", "utf8", (err, data) => {
  if (err) throw err;

  const instructions = data.split("\r\n");
  instructions.forEach(i => {
    const split = i.split(" ");
    input.push({
      cmnd: split[0],
      value: parseInt(split[1]),
    });
  });

  console.log(input)

  day8a();
  //day8b();
});