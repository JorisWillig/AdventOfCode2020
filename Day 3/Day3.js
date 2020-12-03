const fileReader = require("fs");
let input = [];

function navigate(right, down) {
  const mapWidth = input[0].length;
  console.log("mapWidth: " + mapWidth);
  console.log("Map height: " + input.length);
  let xPos = 0;
  let treeCount = 0;
  for(let i = 0; i < input.length; i += down) {
    if (meetsTree(input[i], xPos)) treeCount++;
    xPos = (xPos + right) % mapWidth;
  }
  console.log("Trees: " + treeCount)
  return treeCount;
}

function meetsTree(row, xPos) {
  const isTree = row[xPos] === "#";
  logRow = `${row.substring(0,xPos) + (isTree ? "X" : "O") + row.substring(xPos+1)}`;
  console.log(logRow + " | " + isTree);
  return isTree;
}

fileReader.readFile("./Day3.txt", "utf8", (err, data) => {
  if (err) throw err;
  const inputString = data
  const rows = inputString.split("\r\n");

  input = rows;
  const a = navigate(1,1);
  const b = navigate(3,1);
  const c = navigate(5,1);
  const d = navigate(7,1);
  const e = navigate(1,2);

  console.log("multiplied: " + (a*b*c*d*e));
});