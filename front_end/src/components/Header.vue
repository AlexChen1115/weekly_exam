<template>
  <header class="flex flex-col justify-items-center items-center">
    <h1 class="text-3xl font-bold underline">
      週三請吃飯
    </h1>
    <div class="flex flex-row">
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        自己 username
        <input class="border border-gray-500 rounded-md  px-2 text-center" type="text">
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        對手 username
        <input class="border border-gray-500 rounded-md  px-2 text-center" type="text">
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        from day
        <input class="border border-gray-500 rounded-md  px-2 text-center" type="text">
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        to day
        <input class="border border-gray-500 rounded-md  px-2 text-center" type="text">
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        歷史題 id
        <input class="border border-gray-500 rounded-md px-2 text-center" type="text" value="0">
      </div>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        <button class="bg-blue-500 border-transparent py-1 px-1 rounded-md text-white">
          新題目
        </button>
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        <button class="bg-blue-500 border-transparent py-1 px-1 rounded-md text-white">
          幫對手對題
        </button>
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        <button class="bg-blue-500 border-transparent py-1 px-1 rounded-md text-white">
          成績
        </button>
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        <button class="bg-blue-500 border-transparent py-1 px-1 rounded-md text-white">
          拿題目
        </button>
      </div>
      <div class="flex flex-col mx-1 my-1 px-1 py-1 justify-items-center items-center">
        <button class="bg-blue-500 border-transparent py-1 px-1 rounded-md text-white">
          拿題目
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
}
</script>
