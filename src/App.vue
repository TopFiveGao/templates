<script setup lang="tsx">
const App = () => <div class="bg-pink-900 w-[400px] h-[400px]">Hello World</div>

function click(e: any) {
  ElMessage.success({
    message: 'Hello World',
    duration: 1000,
    showClose: true
  })
}
</script>

<template>
  <App></App>
  <i-ep-search></i-ep-search>
  <el-button @click="click"> 点击 </el-button>
</template>

<style scoped></style>
