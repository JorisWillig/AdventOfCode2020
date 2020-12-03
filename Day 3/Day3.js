const fileReader = require("fs");
let input = [];

function navigate(right, down) {
  const mapWidth = input[0].length;
  let xPos = 0;
  let treeCount = 0;

  for(let i = 0; i < input.length; i += down) {
    if (input[i][xPos] === "#") treeCount++;
    xPos = (xPos + right) % mapWidth;
  }

  return treeCount;
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