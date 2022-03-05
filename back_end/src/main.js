const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer()

const { shuffle } = require("./lib/algorithm");
const User = require("./db/user");
const Topic = require("./db/topic");
const Score = require("./db/score");
const Examination = require("./db/examination");

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 拿取題號排序
app.get('/q/:lesson/topic', async function(req, res) {
  const { lesson, day } = req.params;
  const day = dayjs().format('YYYY-MM-DD');

  let scoreSort = await Score.getSort(day);

  if (scoreSort.length === 0) {
    const topicCount = await Topic.getTopic(lesson);

    const arr = [];

    for (let i = topicCount[0].min; i <= topicCount[0].count; i++) {
      arr.push(i);
    }

    scoreSort = shuffle(arr);

    await Score.insertScore(scoreSort, day);

    return res.json(scoreSort.join());
  }

  return res.json(scoreSort[0].sort);
});

// 取得單一使用者
app.get('/q/user/:id', async function(req, res) {
  const { id } = req.params;
  const users = await User.getUser(id);

  return res.json(users);
});

// 取得所有題目
app.get('/q/topic/list', async function(req, res) {
  const { lesson } = req.query;
  const list = await Topic.getTopicList(lesson);

  return res.json(list);
});

// 取得所有答案
app.get('/q/answer', async function(req, res) {
  const { lesson } = req.query;

  const list = await Topic.getAnswer(lesson);

  return res.json(list);
});

// 取得使用者所有答案
app.get('/q/user/:user_id/answer', async function(req, res) {
  const { user_id: userId } = req.params;
  const { lesson } = req.query;

  const list = await Examination.getAnswer(userId, lesson);

  return res.json(list);
});

// 提交答案
app.post('/q/user/answer', async function(req, res) {
  return res.json(await Examination.insertAllExamination(req.body));
});

// 新增題目
app.post('/q/insertTopic', upload.array(), async function(req, res) {
  return res.json(await Topic.insertTopic(req.body));
});

// 對答案
app.put('/q/user/answer', async function(req, res) {
  return res.json(await Examination.putExamScore(req.body));
});

// 結果
app.get('/q/getChampion', async function(req, res) {
  const { user_id: userId, lesson } = req.query;

  const result = await Examination.getChampion(userId, lesson);

  return res.json(result[0].score);
});

app.get('/q/getChampion', async function(req, res) {
  const { user_id: userId, lesson } = req.query;

  const result = await Examination.getChampion(userId, lesson);

  return res.json(result[0].score);
});

app.listen(port, () => {
  console.log(`Exam App listening on port ${port}`)
})
