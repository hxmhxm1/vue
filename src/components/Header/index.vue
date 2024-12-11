<template>
  <div class="header">
    <el-dropdown @command="handleCommand">
      <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="info">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { logoutApi } from '@/services/login';
import { useRouter } from 'vue-router'
const router = useRouter()

const handleCommand = (command) => {
  console.log('---', command)
  // ElMessage(`click on item ${command}`)
  if(command === 'logout'){
    // 退出登录逻辑
    logoutApi()
    router.push('/login')
  }
}
</script>

<style scoped>
.header{
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
}
</style>