const Knex = require('./knex');

function getUserAnswer(user_id, lesson) {
  return Knex('user_answer')
    .select('id as answer_id', 'answer', 'topic_id')
    .where('lesson', lesson)
    .andWhere('user_id', user_id);
}

function insertAnaswer(row) {
  const insertData = row.ans.map((ans) => ({
    user_id: row.user_id,
    lesson: row.lesson_id,
    answer: ans.ans,
    topic_id: ans.topic_id,
  }));

  return Knex.batchInsert('user_answer', insertData, 1000)
    .catch((err) => { return err; });
}

module.exports = {
  getUserAnswer,
  insertAnaswer,
}