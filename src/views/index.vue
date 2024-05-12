<script lang="ts" setup>
const BaseDialog = defineAsyncComponent(() => import('@/components/dialogs/BaseDialog.vue'))
const dialogRef = ref<InstanceType<typeof BaseDialog> | null>(null)

function open() {
  dialogRef!.value?.open(true, '')
}
</script>

<template>
  <el-button @click="open">打开对话</el-button>
  <el-button>关闭对话</el-button>

  <BaseDialog :ref="(el: any) => (dialogRef = el)"></BaseDialog>
</template>

<style lang="scss">
.box {
  color: #1233ea;
}
</style>
