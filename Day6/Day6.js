const fileReader = require("fs");
let input = [];

function findUniqueAnswers(group) {
  const uniqueAnswers = [];
  group.forEach((p) => {
    for(let i = 0; i < p.length; i++) {
      if (!uniqueAnswers.includes(p[i])) { uniqueAnswers.push(p[i]); }
    }
  });
  return uniqueAnswers;
}

function findOverlappingAnswerCount(group) {
  const groupSize = group.length;

  const answerCounts = {};

  group.forEach((p) => {
    for(let i = 0; i < p.length; i++) {
      if (answerCounts[p[i]]) {
        answerCounts[p[i]]++;
      } else {
        answerCounts[p[i]] = 1;
      }
    }
  });

  let fullOverlapCount = 0;

  Object.values(answerCounts).forEach((ac) => {
    if (ac >= groupSize) fullOverlapCount++;
  });

  return fullOverlapCount;
}

function day6a() {
  let uniqueAnswerCount = 0;
  input.forEach((g) => {
    uniqueAnswerCount += findUniqueAnswers(g).length;
  })

  console.log("Unique answer sum: " + uniqueAnswerCount);
}

function day6b() {
  let total = 0;
  input.forEach((g) => {
    total += findOverlappingAnswerCount(g);
  });

  console.log("Overlapping answer count: " + total);
}

fileReader.readFile("./Day6.txt", "utf8", (err, data) => {
  if (err) throw err;
  const inputString = data
  const groups = inputString.split("\r\n\r\n");
  groups.forEach(g => {
    const group = g.split("\r\n");
    input.push(group);
  });

  day6a();
  day6b();
});