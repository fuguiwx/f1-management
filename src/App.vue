<template>
  <div>
    <el-menu mode="horizontal" router>
      <el-menu-item index="/user">用户管理</el-menu-item>
      <el-menu-item index="/discuss">论坛管理</el-menu-item>
      <el-menu-item index="/driver">车手管理</el-menu-item>
      <el-menu-item index="/track">赛道管理</el-menu-item>
      <el-menu-item index="/team">车队管理</el-menu-item>
    </el-menu>
    <div style="padding: 20px">
      <router-view />
    </div>
  </div>
</template>

<script setup>

</script>