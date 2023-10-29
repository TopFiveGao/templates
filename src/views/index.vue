<script setup lang="ts">
import {useAppStore} from "@/stores";

const  appStore = useAppStore()
</script>

<template>
  <div>
    首页: {{ appStore.appName}}
  </div>
</template>

<style scoped>

</style>