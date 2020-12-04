const fileReader = require("fs");
let input;

const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid"
];

const dataValidators = {
  ["byr"]: (value) => { return (value >= 1920 && value <= 2002) },
  ["iyr"]: (value) => { return (value >= 2010 && value <= 2020) },
  ["eyr"]: (value) => { return (value >= 2020 && value <= 2030) },
  ["hgt"]: (value) => { 
    isValid = /^[0-9]{2,3}(cm)|(in)$/.test(value);
    if (isValid) {
      const valueType = value.replace(/[0-9]/g, "");
      const numericValue = parseInt(value.replace(/[a-zA-Z]/g, ""));
      if (valueType === "cm") {
        isValid = (numericValue >= 150 && numericValue <= 193);
      }
      if (valueType === "in") {
        isValid = (numericValue >= 59 && numericValue <= 76);
      }
    }
    return isValid;
  },
  ["hcl"]: (value) => { return /^#([0-9a-f]){6}$/.test(value); },
  ["ecl"]: (value) => { return /^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/.test(value); },
  ["pid"]: (value) => { return /^[0-9]{9}$/.test(value); },
  ["cid"]: (value) => { return true; }
}

function fixPassport(passport) {
  const fixedPassport = passport.replace(/[\r\n]+/g, " ");
  return fixedPassport;
}

function getFields(passport) {
  const passportFields = [];

  passport.split(" ").forEach((f) => {
    const field = f.split(":")
    passportFields.push({name: field[0], value: field[1]});
  });
  return passportFields;
}

function getFieldNames(fields) {
  const fieldNames = [];

  fields.forEach(f => {
    fieldNames.push(f.name);
  });

  return fieldNames;
}

function validatePassport(passport) {
  const fixed = fixPassport(passport);

  const fields = getFields(fixed);

  const fieldNames = getFieldNames(fields);

  isValid = true;

  for(let i = 0; i < requiredFields.length; i++) {
    if (!(fieldNames.includes(requiredFields[i]))) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    for(let i = 0; i < fields.length; i++) {
      if (!(dataValidators[fields[i].name](fields[i].value))) {
        isValid = false;
        break;
      }
    }
  }

  return isValid;
}

function day4a() {
  let validCount = 0;

  input.forEach((p) => {
    if (validatePassport(p)) validCount++
  });

  console.log("Valid passports: " + validCount);
}

fileReader.readFile("./Day4.txt", "utf8", (err, data) => {
  if (err) throw err;
  const inputString = data
  const passports = inputString.split("\r\n\r\n");

  input = passports;

  day4a();
});