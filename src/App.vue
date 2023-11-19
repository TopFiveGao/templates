<script setup lang="ts">
const placeHolder = ref('请输入')

</script>

<template>
  <el-input  :placeholder="placeHolder" />
  <RouterView/>
</template>

<style scoped>

</style>
