<template>
  <div>
    新增
    <div>{{ JSON.stringify(task) }}</div>
    <!-- <input type="number"></input> -->
  </div>
</template>

<script setup>
import { inject } from 'vue'
const task = inject('tasks')
</script>

<style></style>
