<template>
  <Header />
  <Table :isAnswering="isAnswering"
      :isJudge="isJudge"
      :isViewing="isViewing"
      :vocabulary="vocabulary"
  />
</template>

<script>
import { reactive, ref } from "vue";

import Header from './components/Header.vue';
import Table from './components/ExamTable.vue';

import './assets/css/output.css';

import { fetchVocabularyAnswer, fetchVocabularyPoint, fetchVocabularyQuestion } from "@/api";

export default {
  name: 'App',
  components: {
    Header,
    Table,
  },
  setup() {
    const vocabulary = reactive([]);
    const isJudge = ref(false);
    const isAnswering = ref(false);
    const isViewing = ref(false);
    const questionId = ref(0);

    // TODO
    async function on看題目(f, t, qid) {
      const { id, question } = await fetchVocabularyQuestion(f, t, qid);
      Object.assign(vocabulary, question);
      questionId.value = id;
    }

    // TODO
    async function on對答案(id, username) {
      const answer = await fetchVocabularyPoint(id, username);
      Object.assign(vocabulary, answer);
    }

    // TODO
    async function on取分數(id, username) {
      const point = await fetchVocabularyAnswer(id, username);
      Object.assign(vocabulary, point);
    }

    return {
      isJudge,
      isAnswering,
      isViewing,
      vocabulary,
      on看題目,
      on對答案,
      on取分數,
    }
  }
}
</script>
