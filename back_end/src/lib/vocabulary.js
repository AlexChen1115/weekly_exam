const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const { shuffle } = require("./algorithm");

function produceData(day) {
  const file = fs.readFileSync(
    path.resolve(process.cwd(), 'src', 'data', 'vocabulary.yml'),
    'utf8',
  );

  let vocabulary = YAML.parse(file);
  return shuffle(vocabulary[`day${day}`]);
}

function hideAnswer(vocabulary) {
  return vocabulary.map((eachValue) => ({
    n: eachValue.n,
    name: eachValue.name,
  }));
}

module.exports = {
  produceData,
  hideAnswer,
}
