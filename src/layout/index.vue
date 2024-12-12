<template>
  <div class="header">
    <Header/>
  </div>
  <div class="content">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue"
</script>

<style scoped>
.header{
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100vw;
  /* background: yellow; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
  padding: 10px 50px;
}
.content{
  margin-top: 70px;
}
</style>