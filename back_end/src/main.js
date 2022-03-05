const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');

const { shuffle } = require("./lib/algorithm");
const Topic = require("./db/topic");
const UserAnswer = require("./db/user_answer");
const Examination = require("./db/examination");
const UserScore = require("./db/user_score");
const User = require("./db/user");

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
// app.use(bodyParser.urlencoded({ extended: true/false }));
app.use(express.json());

// 拿取題號排序
app.get('/q/topicSort', async function(req, res) {
  const { lesson } = req.query;
  let { day } = req.query;
  const today = dayjs().format('YYYY-MM-DD');

  let examinationSort = await Examination.getSort(today, lesson);

  if (examinationSort.length === 0) {
    if (!day) {
      return res.json('不要亂帶啦');
    }

    if (!Array.isArray(day)) {
      day = [day];
    }

    let topicId = await Topic.getTopicId(day);
    const arr = topicId.map((topic) => topic.id.toString());

    scoreSort = shuffle(arr);

    await Examination.insertSort(scoreSort, lesson, today);

    return res.json({
        sort: scoreSort,
        lessom: lesson,
    });
  }

  return res.json({
    sort: examinationSort[0].sort.split(','),
    lessom: examinationSort[0].lesson,
  });
});

// 取得所有題目+答案
app.get('/q/topic/list', async function(req, res) {
  let { day } = req.query;

  if (!Array.isArray(day)) {
    day = [day];
  }

  return res.json(await Topic.getTopicList(day));
});

// 取得所有題目
app.get('/q/topic', async function(req, res) {
  let { day } = req.query;

  if (!Array.isArray(day)) {
    day = [day];
  }

  return res.json(await Topic.getTopic(day));
});

// 取得所有答案
app.get('/q/topic/answer', async function(req, res) {
  let { day } = req.query;

  if (!Array.isArray(day)) {
    day = [day];
  }

  return res.json(await Topic.getTopicAnswer(day));
});

// 取得使用者所有答案
app.get('/q/user/answer', async function(req, res) {
  const { user_id: userId, lesson } = req.query;

  const list = await UserAnswer.getUserAnswer(userId, lesson);

  return res.json(list);
});

// 提交答案
app.post('/q/user/answer', async function(req, res) {
  await UserAnswer.insertAnaswer(req.body);

  return res.json('ok');
});

// 新增題目
app.post('/q/insertTopic', async function(req, res) {
  return res.json(await Topic.insertTopic(req.body));
});

// 提交評分
app.post('/q/user/score', async function(req, res) {
  await UserScore.insertUserScore(req.body);

  return res.json('ok');
});

// 結果
app.get('/q/user/score', async function(req, res) {
  const { user_id: userId, lesson } = req.query;

  const list = await UserScore.getUserScore(userId, lesson);

  const scoreResult = list.map((score) => ({
    answer_id: score.answer_id,
    point: score.score,
  }));

  return res.json({
    user_id: list[0].user_id,
    lesson_id: list[0].lesson_id,
    day: list[0].day,
    score: scoreResult,
  });
});

app.get('/q/getChampion', async function(req, res) {
  const { lesson_id } = req.query;
  const userId = await User.getUser();

  const result = [];

  for (let i = 0; i < userId.length; ++i) {
    const res = await UserScore.getChampion(lesson_id, userId[i].id);

    result.push(res[0]);
  }

  return res.json({ret: result});
});

app.listen(port, () => {
  console.log(`Exam App listening on port ${port}`)
})
