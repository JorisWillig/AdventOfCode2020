const fileReader = require("fs");
let input = {};

function findContent(rule, bagDescription) {
  if (rule) {
    const keys = Object.keys(rule)
    for(let i = 0; i < keys.length; i++) {
      if (keys[i] === bagDescription) return true;
      if(findContent(input[keys[i]], bagDescription)) return true;
    }
  }
  
  return false;
}

function day7a() {
  let ruleCount = 0;
  Object.values(input).forEach((r) => {
    if (findContent(r, "shiny gold")) ruleCount++;
  });
  console.log("You can put your 'shiny gold' bag in " + ruleCount + " different bags");
}

function countBagsInRule(rule) {
  let total = 0;
  if (rule) {
    Object.entries(rule).forEach(([name, count]) => {
      total += (count + count*countBagsInRule(input[name]));
    });
  }

  return total;
}

function day7b() {
  let total = countBagsInRule(input["shiny gold"]);
  console.log("Your 'shiny gold' bag needs to contain " + total + " other bags.");
}

fileReader.readFile("./Day7.txt", "utf8", (err, data) => {
  if (err) throw err;
  const inputString = data
  const rules = inputString.split("\r\n");
  rules.forEach(r => {
    const tempRule = r.split(" bags contain ");
    const ruleName = tempRule[0];
    tempRuleContents = tempRule[1].replace(".", "").split(", ");
    const rule = {};
    tempRuleContents.forEach((r) => {
      contentsName = r.substring(2, r.length).replace(/ bag[s]?$/, "");
      contentsCountString = r[0];
      contentsCount = parseInt(contentsCountString);
      if (!Number.isNaN(contentsCount)) rule[contentsName] = contentsCount
    });
    input[ruleName] = rule;
  });

  day7a();
  day7b();
});