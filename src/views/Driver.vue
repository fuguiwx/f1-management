<!-- Driver.vue -->
<template>
  <div class="page-wrapper">
    <h2 class="page-title">F1车手管理</h2>
    <el-button class="btn-add" @click="openAdd">新增车手</el-button>

    <el-table :data="list" border width="100%" :cell-style="{padding:'10px'}" :header-cell-style="{padding:'10px'}">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="avatar" label="头像" width="80" align="center">
        <template #default="scope">
          <el-image 
            style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" 
            :src="scope.row.avatar"
            fit="cover"
          >
            <template #error>
              <div style="width:40px;height:40px;background:#ccc;border-radius:50%"></div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="100" align="center" />
      <el-table-column prop="team" label="车队" min-width="120" align="center" />
      <el-table-column prop="number" label="号码" width="80" align="center" />
      <el-table-column prop="country" label="国籍" min-width="100" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button class="btn-edit" @click="openEdit(scope.row)" size="small">编辑</el-button>
          <el-button class="btn-delete" @click="del(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" title="车手信息">
      <el-form v-model="form" label-width="80px">
        <el-form-item label="姓名"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="车队"><el-input v-model="form.team" /></el-form-item>
        <el-form-item label="号码"><el-input v-model="form.number" /></el-form-item>
        <el-form-item label="国籍"><el-input v-model="form.country" /></el-form-item>
        <el-form-item label="头像链接">
          <el-input v-model="form.avatar" placeholder="粘贴COS完整链接，如 https://.../zhouguanyu.jpg" />
        </el-form-item>
        <el-form-item label="介绍">
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
import { driverApi } from '../api'

const list = ref([])
const form = ref({})
const visible = ref(false)

onMounted(() => getList())

const getList = async () => {
  const res = await driverApi.list()
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
    await driverApi.update(form.value)
  } else {
    await driverApi.add(form.value)
  }
  visible.value = false
  getList()
}

const del = async (id) => {
  await driverApi.delete(id)
  getList()
}
</script>