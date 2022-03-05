const sqlite3 = require('sqlite3').verbose();
const file = './exam.db';
const db = new sqlite3.Database(file);

function getData() {
  db.serialize(function () {
    // //新增資料
    // var sqlInsert = 'INSERT INTO user(id, name) VALUES (?, ?)';
    // db.run(sqlInsert, ['1', 'alex']);
    // console.log('insert success');

    //查詢資料
    var sqlSELEC = "SELECT * FROM user WHERE id = '1'";
    db.each(sqlSELEC, function (err, row) {
      return row;
    });

    // var sqlDel = 'delete from exam where id = 1';
    // db.run(sqlDel);

  });

  db.close();
}

module.exports = {
  getData,
}
