<template>
  <Header></Header>
  <Table></Table>
</template>

<script>
import Header from './components/Header.vue';
import Table from './components/ExamTable.vue';
import './assets/css/output.css'

export default {
  name: 'App',
  components: {
    Header,
    Table,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
