/**
 * 獲題
 *
 * 獲取第幾天到第幾天的題目，若 id = 0 代表隨機生成，若 id > 0 代表指定歷史題
 * 會返回 id。
 *
 * 這有點難做喔。資料庫結構得想一下
 */
export async function fetchVocabularyQuestion(fromDay, toDay, id) {
  try {
    return await getData(`http://localhost:3000/question?id=${id}&fromDay=${fromDay}&toDay=${toDay}`);
  } catch (e) {
    return {
      id: 1,
      questions: [{
        n: 1,
        day: 1,
        name: 'meet'
      }]
    }
  }
}

/**
 * 獲對方答案
 */
export async function fetchVocabularyAnswer(id, username) {
  try {
    return await getData(`http://localhost:3000/answer?id=${id}&username=${username}`);
  } catch (e) {
    return [{
      n: 1,
      day: 1,
      name: 'meet',
      explanation: '滿足',
      ans: '見面'
    }] || new Error('4XX 錯誤，資料不存在');
  }
}

/**
 * 獲自己分數
 */
export async function fetchVocabularyPoint(id, username) {
  try {
    return await getData(`http://localhost:3000/point?id=${id}&username=${username}`);
  } catch (e) {
    return [{
      n: 1,
      day: 1,
      name: 'meet',
      explanation: '滿足',
      ans: '見面',
      point: 1,
    }] || new Error('4XX 錯誤，資料不存在');
  }
}

/**
 * 交題
 *
 * @param id
 * @param answer ['', '', '', ...]
 * @returns {Promise<boolean|*>}
 */
export async function sendVocabularyAnswer(id, answer) {
  try {
    return await postData(`http://localhost:3000/answer/${id}`, answer);
  } catch (e) {
    return true;
  }
}

/**
 * 打分
 *
 * @param id
 * @param points [1, 2, 0, -1, ...]
 * @returns {Promise<boolean|*>}
 */
export async function sendVocabularyPoints(id, points) {
  try {
    return await postData(`http://localhost:3000/point/${id}`, points);
  } catch (e) {
    return true;
  }
}


/**
 * fetch API | POST
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
function postData(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'no-cors',
  })
    .then(response => response.json()) // 輸出成 json
}

/**
 * fetch API | GET
 *
 * @param url
 * @returns {Promise<any>}
 */
function getData(url) {
  return fetch(url, {
    headers: {
      'content-type': 'application/json'
    },
    mode: 'no-cors',
  })
    .then(response => response.json()) // 輸出成 json
}
