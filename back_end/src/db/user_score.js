const Knex = require('./knex');

function insertUserScore(row) {
  const insertData = row.score.map((score) => ({
    answer_id: score.answer_id,
    score: score.point,
  }));

  return Knex.batchInsert('user_score', insertData, 1000)
    .catch((err) => { return err; });
}

function getUserScore(user_id, lesson) {
  return Knex('user_score')
    .select(
      'user_answer.user_id',
      'user_answer.lesson as lesson_id',
      'examination.day',
      'user_score.score',
      'user_answer.lesson as answer_id')
    .leftJoin('user_answer', 'user_score.answer_id', 'user_answer.id')
    .leftJoin('examination', 'user_answer.lesson', 'examination.lesson')
    .where('user_answer.user_id', user_id)
    .andWhere('examination.lesson', lesson);
}

function getChampion(lesson, user_id) {
  const sql = Knex('user_score')
    .select('user_answer.user_id')
    .sum('score as score')
    .leftJoin('user_answer', 'user_score.answer_id', 'user_answer.id')
    .leftJoin('examination', 'user_answer.lesson', 'examination.lesson')
    .where('user_answer.user_id', user_id.toString())
    .andWhere('examination.lesson', lesson);

  return sql;
}

module.exports = {
  getUserScore,
  insertUserScore,
  getChampion,
}