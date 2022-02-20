<template>
  <div class="flex flex-col items-center">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="divide-y divide-gray-200 table-fixed">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  題號
                </th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  題目
                </th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  答案
                </th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  解答
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="question in vocabulary" :key="question.n">
                <td class="px-6 py-4 whitespace-nowrap text-left">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      {{ question.n }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-left">
                  <div class="text-sm text-gray-900">
                    {{ question.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                  <input
                      type="text"
                      name="price"
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-2 border-gray-500 rounded-md"
                      placeholder="寫你答案啊"
                  />
                </td>
                <td class="px-6 py-4 text-right" v-if="question.explanation">
                    <p
                        v-for="(explain, type) in question.explanation"
                        :key="type"
                        class="px-2 text-xs leading-5 font-semibold rounded-full"
                        :class="{ 'text-green-900': false,  'text-red-400': true}"
                    >
                      {{ type }}:{{ explain }}
                    </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
async function fetchVocabulary() {
  const response = await fetch('http://localhost:3000/q/day/1');
  return response.json();
}


export default {
  name: "ExamTable",
  data() {
    return {
      vocabulary: {},
    }
  },
  async beforeMount() {
    this.vocabulary = await fetchVocabulary();
  },
}
</script>

<style scoped>

</style>
