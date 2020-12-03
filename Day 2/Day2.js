const fileReader = require("fs");
let input = [];

function letterInCorrectAmount(passwordObj) {
  const password = passwordObj.password;
  if (!password) console.log("No password!");
  let regex = new RegExp(`${passwordObj.letter}`, "g");
  const count = (password.match(regex) || []).length;
  const isCorrect = (count >= passwordObj.min && count <= passwordObj.max);
  return isCorrect;
}

function letterInCorrectPosition(passwordObj) {
  const password = passwordObj.password;
  if (!password) console.log("No password!");
  // console.log("password: " + passwordObj.password);
  // console.log("positions: " + passwordObj.min + " - " + passwordObj.max);
  const isValid = (
          (password[passwordObj.min-1] === passwordObj.letter || 
          password[passwordObj.max-1] === passwordObj.letter) &&
          !(password[passwordObj.min-1] === passwordObj.letter && password[passwordObj.max-1] === passwordObj.letter)
        );
  // console.log("is valid: " + isValid);
  return isValid
}

function isCorrectPassword(passwordObj) {
  return letterInCorrectPosition(passwordObj);
}

function countWrongPasswords() {
  let count = 0;
  for(let i = 0; i < input.length; i++) {
    const isCorrect = isCorrectPassword(input[i]);
    if (isCorrect) count++;
  }

  console.log("Correct password count: " + count);
}

fileReader.readFile("./Day2.txt", "utf8", (err, data) => {
  if (err) throw err;
  var inputString = data
  var splitInput = inputString.split("\r\n");
  for(let i = 0; i < splitInput.length; i++) {
    const row = splitInput[i].split(" ");
    var min = row[0].split("-")[0];
    var max = row[0].split("-")[1];
    var letter = row[1][0];
    var password = row[2];

    input.push({
      min,
      max,
      letter,
      password,
    })
  }

  console.log("input count: " + input.length);

  countWrongPasswords();
});
