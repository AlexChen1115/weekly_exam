const Knex = require('./knex');

function getSort(day, lesson) {
  return Knex('examination').select('sort', 'lesson')
    .where('day', day)
    .andWhere('lesson', lesson);
}

function insertSort(sort, lesson, day) {
  return Knex('examination').insert({
    sort,
    lesson,
    day
  });
}

function insertAllExamination(row) {
  return Knex.transaction((sql) => {
    return Knex.batchInsert('examination', row, 1000)
      .transacting(sql)
    })
    .then(() => { return 'ok' })
    .catch(() => { return 'err' });
}

function putExamScore(row) {
  row.forEach(async (ans) => {
    await Knex('examination')
      .where({
        id: ans.id,
        user_id: ans.user_id,
      })
      .update({
        score: ans.score,
      });
  });

  return 'ok';
}

function getChampion(userId, lesson) {
  return Knex('examination').sum('score as score').where({
    user_id: userId,
    lesson: lesson,
  });
}

function getAnswer(userId, lesson) {
  return Knex('examination').select('answer').where({
    user_id: userId,
    lesson: lesson,
  });
}

module.exports = {
  insertAllExamination,
  putExamScore,
  getChampion,
  getAnswer,
  getSort,
  insertSort,
}