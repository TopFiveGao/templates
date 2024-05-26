<script lang="ts" setup>
const BaseDialog = defineAsyncComponent(() => import('@/components/dialogs/BaseDialog.vue'))
const dialogRef = ref<InstanceType<typeof BaseDialog> | null>(null)
const disabled = ref(false)

function open() {
  // dialogRef.value!.open(true, {
  //   title: '新增表',
  //   height: '600px'
  // })
  disabled.value = !disabled.value
}
</script>

<template>
  <el-button @click="open">打开对话</el-button>
  <div class="flex relative btn_container">
    <el-button link plain class="btnColor" :disabled="disabled"> 图标按钮 </el-button>
    <div class="btn_overlay" v-show="disabled"></div>
  </div>
  <BaseDialog :ref="(el: any) => (dialogRef = el)"></BaseDialog>
</template>

<style scoped lang="scss">
.btn_container {
  .btnColor {
    color: #0b0;
  }

  .btnColor:hover {
    color: rgb(0 187 0 / 50%);
  }

  .btnColor:focus {
    color: rgb(0 187 0 / 50%);
  }

  .btnColor:active {
    color: #0b1;
  }

  .btnColor[disabled] {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .btn_overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
  }
}
</style>
