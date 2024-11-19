<template>
  <div>列表</div>
  <div v-for="(item, index) in task" :key="index">{{ item }}</div>
</template>

<script setup>
import { inject } from 'vue'
const task = inject('tasks')
console.log('task---', task)
</script>

<style></style>
