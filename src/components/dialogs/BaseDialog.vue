<script setup lang="ts">
import type { IDialogConfig } from '@/components/dialogs/types'
//#region dialog 基本配置及打开、关闭事件处理
const config = reactive<IDialogConfig>({
  title: '',
  width: '800px',
  height: '',
  draggable: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  isShowing: true
})

function onClose() {}

function open(toggle: boolean, data: any) {
  config.isShowing = toggle
}

defineExpose({
  open
})
//#endregion
</script>

<template>
  <el-dialog
    :title="config.title"
    :width="config.width"
    :style="{ height: config.height }"
    :draggable="config.draggable"
    :close-on-press-escape="config.closeOnPressEscape"
    :close-on-click-modal="config.closeOnClickModal"
    align-center
    @close="onClose"
    v-model="config.isShowing"
  >
  </el-dialog>
</template>

<style scoped></style>
