<template>
  <div>
    <AddTask />
    <TaskList />
  </div>
</template>

<script setup>
import AddTask from './components/AddTask.vue'
import TaskList from './components/TaskList.vue'
import { reactive, provide } from 'vue'
const tasks = reactive([
  {
    id: 0,
    text: '待完成一',
    done: false,
  },
  {
    id: 1,
    text: '待完成二',
    done: false,
  },
  {
    id: 2,
    text: '待完成三',
    done: false,
  },
])
provide('tasks', tasks)
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
