<script setup lang="ts">
import type { IDialogConfig } from '@/components/dialogs/types'
//#region dialog 基本配置及打开、关闭事件处理
const config = reactive<IDialogConfig>({
  title: '',
  width: '',
  height: '',
  draggable: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  isShowing: false
})

const emits = defineEmits<{
  (e: 'refresh', data: any): void
}>()

function onClose() {
  emits('refresh', { status: 1 })
}

function open(toggle: boolean, initConfig: any) {
  config.isShowing = toggle
  if (toggle) {
    config.title = initConfig.title ? initConfig.title : ''
    config.width = initConfig.width ? initConfig.width : '800px'
    config.height = initConfig.height ? initConfig.height : ''
    config.draggable = initConfig.draggable ? initConfig.draggable : true
    config.closeOnClickModal = initConfig.closeOnClickModal ? initConfig.closeOnClickModal : false
    config.closeOnPressEscape = initConfig.closeOnPressEscape ? initConfig.closeOnPressEscape : true
  }
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
