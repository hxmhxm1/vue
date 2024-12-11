import { reactive } from 'vue';
<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-lg-8 col-lg-offset-2">
          <h2>记账本</h2>
          <hr />
          <div class="accounts" v-for="(item, index) in accounts" :key="index">
            <div :class="['panel', item.type === '-1' ? 'panel-danger' : 'panel-success']">
                <div class="panel-heading">{{item.time}}</div>
                <div class="panel-body">
                    <div class="col-xs-6">{{item.title}}</div>
                    <div class="col-xs-2 text-center">
                        <span :class="['label', item.type === '-1' ? 'label-warning' : 'label-success']">
                            {{item.type === '-1' ? '支出' : '收入'}}
                        </span>
                    </div>
                    <div class="col-xs-2 text-right">{{item.account}}</div>
                    <div class="col-xs-2 text-right" style="cursor: pointer">
                        <a @click="deleteList(item.id)">
                            <span class="delete">删除</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-lg-8 col-lg-offset-2">
          <h2>添加记录</h2>
          <hr />
          <form>
            <div class="form-group">
              <label for="item">事项</label>
              <input
                name="title"
                type="text"
                class="form-control"
                id="item"
                v-model="form.title"
              />
            </div>
            <div class="form-group">
              <label for="time">时间</label>
              <input
                name="time"
                type="text"
                class="form-control"
                id="time"
                v-model="form.time"
              />
            </div>
            <div class="form-group">
              <label for="type">类型</label>
              <select name="type" class="form-control" id="type" v-model="form.type">
                <option value="-1">支出</option>
                <option value="1">收入</option>
              </select>
            </div>
            <div class="form-group">
              <label for="account">金额</label>
              <input
                name="account"
                type="text"
                class="form-control"
                id="account"
                v-model="form.account"
              />
            </div>
            
            <div class="form-group">
              <label for="remarks">备注</label>
              <textarea v-model="form.remarks" name="remarks" class="form-control" id="remarks"></textarea>
            </div>
            <hr>
            <button @click="addNewList" class="btn btn-primary btn-block">添加</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import axios from 'axios'
import { ECode } from '../../config/const';
import { getListApi, addListApi, deleteListItemApi } from '@/services/node'
const accounts = ref([])
const form = reactive({
  title: '',
  time: '',
  type: '',
  account: '',
  remarks: ''
})
onMounted(() => {
  getList()
})
const getList = async() => {
  const res = await getListApi()
  if(res.code === ECode.SUCCESS){
    accounts.value = res.data
  }
}
const addNewList = async (event) => {
  event.preventDefault(); // 阻止表单默认提交行为
  console.log('formdata', form)
  const res = await addListApi(form)
  if(res.code === ECode.SUCCESS){
    ElMessage({
        message: '新增成功',
        type: 'success',
      })
      getList()
  }
}
const deleteList = async(id) => {
  const res = await deleteListItemApi(id)
  if(res.code === ECode.SUCCESS){
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    getList()
  }
}
</script>

<style scoped>
@import url('../../../public/stylesheets/bootstrap-datepicker.css');
@import url('../../../public/stylesheets/bootstrap.css');
@import url('../../../public/stylesheets/style.css');
.main{
  display: flex;
  width: 100%;
}
 label {
    font-weight: normal;
  }
  .delete{
    color: red
  }
</style>