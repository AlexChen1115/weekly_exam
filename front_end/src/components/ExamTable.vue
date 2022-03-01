<template>
  <div class="flex flex-col items-center">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg flex flex-col items-center justify-items-center">

          <table class="divide-y divide-gray-200 table-fixed">

            <thead class="bg-gray-50">
              <tr>
                <th scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  題號
                </th>
                <th scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  題目
                </th>
                <th scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  答案
                </th>
                <th v-if="!isAnswering"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                >
                  解答
                </th>
                <th v-if="isJudge"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                >
                  評分
                </th>
                <th v-if="isJudge"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                >
                  分數
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(inject, index) in vocabulary" :key="inject.n">
                <td class="px-6 py-4 whitespace-nowrap text-left">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      {{ inject.n }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-left">
                  <div class="text-sm text-gray-900">
                    {{ inject.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                  <input
                      v-model="vocabularyAnswer[index]"
                      :disabled="isJudge"
                      type="text"
                      name="price"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-2 border-gray-500 rounded-md"
                      placeholder="寫你答案啊"
                  />
                </td>
                <td v-if="!isAnswering" class="px-6 py-4 text-right">
                  <template v-if="inject.explanation">
                    <p
                        v-for="(explain, type) in inject.explanation"
                        :key="type"
                        :class="{ 'text-green-900': inject.points > 0,  'text-red-400': inject.points < 0}"
                        class="px-2 text-xs leading-5 font-semibold rounded-full text-stone-800"
                    >
                      {{ type }}:{{ explain }}
                    </p>
                  </template>
                </td>
                <td v-if="isJudge" class="px-6 py-4 text-right">
                  <button
                      class="bg-emerald-500 border border-transparent rounded-md mr-2 py-1 px-2 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      type="button"
                      @click="addPoint(index, 1)"
                  >
                    加分
                  </button>
                  <button
                      class="bg-red-400 border border-transparent rounded-md ml-2 py-1 px-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      type="button"
                      @click="minusPoint(index, 1)"
                  >
                    扣分
                  </button>
                </td>
                <td v-if="isJudge" class="px-6 py-4 text-center">
                  <p>{{ vocabularyPoint[index] }}</p>
                </td>
              </tr>
            </tbody>

          </table>

          <div class="py-1 my-1">
            <button class="text-center border border-transparent bg-sky-400 text-white rounded-md px-3 py-1"
                type="submit"
                @click="onSubmit"
            >送出</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, ref, toRaw } from "vue";
import { sendVocabularyAnswer, sendVocabularyPoints } from '@/api';

export default {
  name: "ExamTable",
  props: {
    isJudge: Boolean, // 評分狀態
    isAnswering: Boolean, // 答題狀態
    isViewing: Boolean, // 看分狀態
    questionId: Number,
    vocabulary: {
      type: Array,
      required: true,
      default: () => [{
        n: Number,
        day: Number,
        name: String,
        explanation: String,
        ans: String,
        point: Number,
      }],
    },
  },
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let { isJudge, isAnswering, questionId, vocabulary } = props;

    const isLoading = ref(false);

    const vocabularyAnswer = reactive([]);
    const vocabularyPoint = reactive([]);

    onBeforeMount(async () => {
      vocabularyAnswer.length = vocabulary.length;
      vocabulary.forEach((value, index) => {
        vocabularyAnswer[index] = value?.ans ?? '';
      });

      vocabularyPoint.length = vocabulary.length;
      vocabulary.forEach((value, index) => {
        vocabularyPoint[index] = value?.point ?? 0;
      });
    });

    function addPoint(index, point) {
      vocabularyAnswer[index].point += point;
    }

    function minusPoint(index, point) {
      vocabularyAnswer[index].point -= point;
    }

    async function onSubmit() {
      isLoading.value = true;

      isAnswering && await sendVocabularyAnswer(questionId, toRaw(vocabularyAnswer));
      isJudge && await sendVocabularyPoints(questionId, toRaw(vocabularyPoint));

      isLoading.value = false;
    }

    return {
      vocabularyAnswer,
      vocabularyPoint,
      addPoint,
      minusPoint,
      onSubmit,
    }
  },
}
</script>

<style scoped>

</style>
