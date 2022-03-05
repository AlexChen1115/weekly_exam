const Knex = require('./knex');

function insertTopic(row) {
  return Knex('topic').insert(row);
}

function getTopicId(day) {
  return Knex('topic')
    .select('id')
    .whereIn('day', day);
}

function getTopicList(day) {
  return Knex('topic')
    .select('*')
    .whereIn('day', day);

}

function getTopic(day) {
  return Knex('topic')
    .select('id', 'name')
    .whereIn('day', day);
}

function getTopicAnswer(day) {
  return Knex('topic')
  .select('id', 'explanation')
  .whereIn('day', day);
}

module.exports = {
  getTopicId,
  getTopicList,
  getTopicAnswer,
  getTopic,
  insertTopic,
}