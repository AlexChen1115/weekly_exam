const Knex = require('./knex');

function insertTopic(row) {
  return  Knex('topic').insert(row);
}

function getTopic(lesson) {
  return Knex('topic')
    .count('id', { as: 'count' })
    .min('id', { as: 'min' })
    .max('id', { as: 'max' })
    .where('lesson', lesson);
}

function getTopicList(lesson) {
  const sql = Knex('topic').select('id', 'name');

  if (lesson) {
    sql.whereIn('lesson', lesson);
  }

  return sql;
}

function getAnswer(lesson) {
  const sql = Knex('topic').select('explanation');

  if (lesson) {
    sql.whereIn('lesson', Array.isArray(lesson) ? lesson : [lesson]);
  }

  return sql;
}

module.exports = {
  getTopic,
  getTopicList,
  getAnswer,
  insertTopic,
}