const Knex = require('./knex');

function getSort(day) {
  return Knex('score').select('sort').where('day', day);
}

function insertScore(row) {
  return Knex.batchInsert('score', row, 1000)
    .catch((err) => { return err; });
}

module.exports = {
  getSort,
  insertScore,
}