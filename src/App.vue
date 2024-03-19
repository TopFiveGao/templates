<script setup lang="tsx">
import { loginApi } from '@/api/login'

const App = () => (
  <div class="bg-pink-900 w-[400px] h-[400px]">
    <el-button onClick={click}>登录</el-button>
  </div>
)

function click() {
  console.log('click')
  loginApi('admin', '123456')
}
</script>

<template>
  <App></App>
</template>

<style scoped></style>
