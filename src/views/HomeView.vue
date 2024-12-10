<template>
  <div class="content">
    <div v-for="(item, index) in data" :key="index" 
      @click="goDetail(item)" class="card" 
      :style="{background: randomColor()}"
    >
      <div class="title">{{item.title}}</div>
      <div class="grey">{{item.desc}}</div>
    </div>
  </div>
  <RouterView/>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { reactive } from 'vue';
const router = useRouter()
const data = reactive([
  {
    title: 'provide、inject', 
    url: '/about',
    desc: '等同于react中的context'
  },
  {
    title: 'node.js学习',
    url: '/node-test',
    desc: '需要认证'
  }
])
const goDetail = (params: {title: string, url: string, desc: string}) => {
  router.push(params.url)
}
// 生成随机颜色 
const randomColor = () => {
  function isLightColor(color: string) {
    // 判断颜色是否为浅色
    const rgb = parseInt(color.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 170; // 调整阈值以适应你定义的浅色范围
  }
  // 生成浅色系随机颜色
  let color = '#';
  while(!isLightColor(color)){
    color = '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  return color;
}
</script>

<style scoped>
.content{
  display: flex;
  justify-content: center;
  align-items: center;
}
.title{
  font-size: 20px;
  font-weight: 700;
}
.desc{
  font-size: 16px;
  color: grey;
}
.card{
  width: 200px;
  height: 200px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px double #333; /* 实线边框，颜色为 #333 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 阴影 */
  transition: border-color 0.3s ease; /* 边框颜色变化动画 */
  border-radius: 5px;
}
.card:hover {
  border-color: yellow; /* 鼠标悬停时的边框颜色 */
}
</style>