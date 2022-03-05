const Knex = require('./knex');

function getUser(user_id, lesson) {
  return Knex('user').select('id');
}

module.exports = {
  getUser,
}