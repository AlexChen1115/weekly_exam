const Knex = require('./knex');

function getUser(id) {
  return Knex('user').select('*').where({'id': id});
}

function getUserList() {
  return Knex('user').select('*');
}

module.exports = {
  getUserList,
  getUser,
}