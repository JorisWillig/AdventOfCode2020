const fileReader = require("fs");
const input = [];
let visited;
let tried;
let shouldTry;

let currentIndex;
let accumulator;

let commandTree = [];

function executeCommand(command, acc) {
  switch (command.cmnd) {
    case "jmp":
      currentIndex += command.value;
      return acc;
    case "acc":
      accumulator += command.value;
      acc += command.value;
      currentIndex++;
      return acc;
    default:
      currentIndex++;
      return acc;
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

function followCommandChain(index, acc, visited, shouldSplit) {
  if (index === commandTree.length) return {success: true, acc};
  if (visited.includes(index) || index < 0) return false;

  visited.push(index);

  const treeNode = commandTree[index];

  let newAcc = executeCommand(treeNode.command, acc)
  let result = followCommandChain(treeNode.child, newAcc, visited.slice(0), shouldSplit);
  if (!result.success && shouldSplit && treeNode.canSplit) {
    result = followCommandChain(treeNode.splitChild, newAcc, visited.slice(0), false);
  }

  return {success: result.success, acc: result.acc}
}

function day8b() {
  for(let i = 0; i < input.length; i++) {
    currentCommand = input[i];
    let canSplit = currentCommand.cmnd === "jmp" || currentCommand.cmnd === "nop";
    const treeValue = {
      command: currentCommand,
      canSplit,
      child: currentCommand.cmnd === "jmp" ? i + currentCommand.value : i + 1,
      splitChild: canSplit && currentCommand === "nop" ? i + value : i + 1,
    }
    commandTree.push(treeValue);
  }

  const result = followCommandChain(0, 0, [], true);

  if(result.success) {
    console.log("Finished with accumulator: " + result.acc);
  } else {
    console.log("No correct path found.");
  }
}

fileReader.readFile("./Day8.txt", "utf8", (err, data) => {
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
  day8b();
});