<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="登录" :name="EType.login"></el-tab-pane>
      <el-tab-pane label="注册" :name="EType.register"></el-tab-pane>
    </el-tabs>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from "vue-router";
import axios from 'axios';
import { loginApi, registerApi } from '@/services/login'
import { ECode, TOKEN } from '../../config/const';

const router = useRouter()
enum EType {
  'login' = 1,
  'register' = 2
}
const activeName = ref(EType.login)

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: validatePass2, trigger: 'blur' }],
})

const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if(activeName.value === EType.login){
        try {
          const res = await loginApi(ruleForm)
          if(res.code === ECode.SUCCESS){
            localStorage.setItem(TOKEN, res.data)
            router.push('/')
          }
        } catch (error) {
          console.log('登录错误', error);
        }
      }else{
        const res = await registerApi(ruleForm)
        if(res.code === ECode.SUCCESS){
          ElMessage({
            message: '注册成功',
            type: 'success',
          })
          activeName.value = EType.login
        }
      }
    } else {
      console.log('信息出错----!')
    }
  })
}
</script>

<style scoped>
.demo-ruleForm{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>