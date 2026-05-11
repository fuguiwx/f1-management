<template>
  <div class="page-wrapper">
    <h2 class="page-title">F1 车队管理</h2>
    <el-button class="btn-add" @click="openAdd">新增车队</el-button>

    <el-table :data="list" border width="100%">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="image" label="车队Logo" width="100" align="center">
        <template #default="scope">
          <el-image 
            style="width: 60px; height: 60px; object-fit: contain;" 
            :src="scope.row.image"
            fit="contain"
          >
            <template #error>
              <div style="width:60px;height:60px;background:#ccc"></div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="车队名称" min-width="100" align="center" />
      <el-table-column prop="country" label="所属国家" min-width="100" align="center" />
      <el-table-column prop="championships" label="总冠军次数" width="100" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button class="btn-edit" @click="openEdit(scope.row)" size="small">编辑</el-button>
          <el-button class="btn-delete" @click="del(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" title="车队信息">
      <el-form v-model="form" label-width="100px">
        <el-form-item label="车队名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="全称"><el-input v-model="form.full_name" /></el-form-item>
        <el-form-item label="所属国家"><el-input v-model="form.country" /></el-form-item>
        <el-form-item label="成立年份"><el-input v-model="form.founded_year" /></el-form-item>
        <el-form-item label="总冠军次数"><el-input v-model="form.championships" /></el-form-item>
        <el-form-item label="Logo链接">
          <el-input v-model="form.image" placeholder="粘贴COS完整链接" />
        </el-form-item>
        <el-form-item label="车队介绍">
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin-top:20px">
        <el-button class="btn-add" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { teamApi } from '../api'

const list = ref([])
const form = ref({})
const visible = ref(false)

onMounted(() => getList())

const getList = async () => {
  const res = await teamApi.list()
  list.value = res.data.data
}

const openAdd = () => {
  form.value = {}
  visible.value = true
}

const openEdit = (row) => {
  form.value = { ...row }
  visible.value = true
}

const save = async () => {
  if (form.value.id) {
    await teamApi.update(form.value)
  } else {
    await teamApi.add(form.value)
  }
  visible.value = false
  getList()
}

const del = async (id) => {
  await teamApi.delete(id)
  getList()
}
</script>