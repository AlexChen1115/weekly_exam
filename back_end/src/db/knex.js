const Knex = require("knex");

const connectKnex = Knex({
  client: 'sqlite3',
  connection : {
    filename: 'exam.db',
  },
  useNullAsDefault: true,
});

module.exports = connectKnex;
