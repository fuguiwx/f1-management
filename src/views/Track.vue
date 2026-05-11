<template>
  <!-- 🔥 仅使用common.css的公共容器类 -->
  <div class="page-wrapper">
    <!-- 🔥 公共标题样式 -->
    <h2 class="page-title">F1 赛道管理</h2>
    <!-- 🔥 公共按钮样式 -->
    <el-button class="btn-add" @click="openAdd">新增赛道</el-button>

    <!-- 表格结构与车手页完全一致，使用公共样式 -->
    <el-table :data="list" border width="100%">
      <el-table-column prop="id" label="ID" width="80" align="center" />
     <el-table-column prop="image" label="赛道图片" width="120" align="center">
    <template #default="scope">
      <el-image :src="scope.row.image" class="table-img" style="width: 80px; height: 60px" />
      </template>
      </el-table-column>
      <el-table-column prop="name" label="赛道名称" />
      <el-table-column prop="location" label="地理位置" />
      <el-table-column prop="length" label="赛道长度" />
      <el-table-column prop="lap" label="比赛圈数" />
      <el-table-column label="操作">
        <template #default="scope">
          <!-- 🔥 公共操作按钮样式 -->
          <el-button class="btn-edit" size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button class="btn-delete" size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗沿用全局样式 -->
    <el-dialog v-model="visible" title="赛道信息">
      <el-form v-model="form" label-width="100px">
        <el-form-item label="赛道名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="地理位置"><el-input v-model="form.location" /></el-form-item>
        <el-form-item label="赛道长度"><el-input v-model="form.length" /></el-form-item>
        <el-form-item label="比赛圈数"><el-input v-model="form.lap" /></el-form-item>
        <el-form-item label="图片名称"><el-input v-model="form.image" /></el-form-item>
        <el-form-item label="赛道介绍">
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <div style="text-align:right; margin-top:20px">
        <el-button class="btn-add" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { trackApi } from '../api'

const list = ref([])
const form = ref({})
const visible = ref(false)

onMounted(() => getList())

// 获取列表
async function getList() {
  const res = await trackApi.list()
  list.value = res.data.data
}

// 新增
function openAdd() {
  form.value = {}
  visible.value = true
}

// 编辑
function openEdit(row) {
  form.value = { ...row }
  visible.value = true
}

// 保存
async function save() {
  if (form.value.id) {
    await trackApi.update(form.value)
  } else {
    await trackApi.add(form.value)
  }
  visible.value = false
  getList()
}

// 删除
async function del(id) {
  await trackApi.delete(id)
  getList()
}
</script>
