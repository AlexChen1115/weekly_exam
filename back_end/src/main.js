const express = require('express');
const cors = require('cors');

const Vocabulary = require("./lib/vocabulary");

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.get('/q/day/:day', function(req, res) {
  console.log('in');
  const { day } = req.params;
  const { id } = req.query;
  // selectFromDB(id)
  // if no data
  let vocabulary = Vocabulary.produceData(day);
  // storeInDB(vocabulary);
  return res.json(Vocabulary.hideAnswer(vocabulary));
});

app.listen(port, () => {
  console.log(`Exam App listening on port ${port}`)
})
