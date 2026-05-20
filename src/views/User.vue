<template>
  <div class="page-wrapper">
    <h2 class="page-title">用户管理</h2>
    <el-button class="btn-add" @click="openAdd">新增用户</el-button>

    <el-table :data="list" border width="100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button class="btn-edit" @click="openEdit(scope.row)" size="small">编辑</el-button>
          <el-button class="btn-delete" @click="del(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" title="用户信息">
      <el-form v-model="form" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" />
        </el-form-item>
      </el-form>
      <el-button class="btn-add" @click="save">保存</el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { userApi } from '../api'

const list = ref([])
const form = ref({})
const visible = ref(false)

onMounted(() => getList())

const getList = async () => {
  try {
    const res = await userApi.list()
    list.value = res.data || []
  } catch (e) {
    list.value = []
  }
}

const openAdd = () => {
  form.value = {}
  visible.value = true
}

const openEdit = row => {
  form.value = { ...row }
  visible.value = true
}

const save = async () => {
  try {
    if (form.value.id) {
      await userApi.update(form.value)
    } else {
      await userApi.add(form.value)
    }
    visible.value = false
    ElMessage.success('操作成功')
    getList()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

const del = async id => {
  try {
    await userApi.delete(id)
    ElMessage.success('删除成功')
    getList()
  } catch (e) {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped>
</style>