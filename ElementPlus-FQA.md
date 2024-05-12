## 1. el-button 按钮打开方式

```vue
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
/**
 *  整体分为两种, 即 【文字按钮】 和 【常规按钮】, 【文字按钮】的情况下, 样式的设置是需要处理的.
 *  1. link属性:
 *     用来替代废弃的 type="text" 按钮属性, 代表链接按钮(仅显示文本).
 *  2. type属性:
 *     常用的几个 primary warning success 风格.
 *     对于【常规按钮】, 你想使用其他颜色这时候, 就可以设置 color 属性了.
 *  3. plain 属性:
 *     相当于把按钮变得更朴素一些, 和没有设置任何属性的按钮的样式一样.【 <el-button>按钮</el-button> 】
 *     常常配合 type 属性一起使用时, plain 属性才会使按钮和只设置了 type 属性的按钮有明显的风格区别.
 *  4. color属性:
 *     对于【常规按钮】, 设置了 color 属性后, type 属性即被覆盖.
 *     对于【文字按钮】, 单独设置 color 属性会被忽略不生效( type 属性的颜色会在悬浮、点击时有效),
 *     往往需要同时设置 plain 属性, 这时按钮的初始颜色就是 color 属性的值, 悬浮、点击按钮后的颜色
 *     就是 type 属性的值, 但一般没人会去适配 type 属性默认那几个风格按钮的颜色, 一般都是自己重写.
 *     查看下面的例子, 就是对【文字按钮】自定义任何颜色的最佳实践.
 *     (步骤：1. 同时设置 link 和 plain 属性; 2. 自己写个类模仿按钮的悬浮、点击、聚焦、失焦的颜色).
 *  5. 带 icon 图标的按钮的实现方式:
 *     一是用 icon 属性, 但实践发现不好用(自动导入图标的配置情况下), 文字和图标间距有些大的怪异;
 *     二是用具名插槽 #icon, 效果和第一种一样;
 *     三是直接在 el-button 内部写图标, 间距差不多, 因为少了前两种方式渲染出的 span 标签.
 */
</script>

<template>
  <el-button link plain class="btnColor">自定义任何颜色的文字按钮</el-button>
  <el-button link plain class="btnColor">
    <el-icon>
      <Search />
    </el-icon>
    图标按钮
  </el-button>
</template>

<style scoped>
/** :focus 和 :active 有权重优先级, 一定要最后定义 :active , 否则他会被 :focus 覆盖 */
.btnColor {
  color: #00bb00;
}

.btnColor:hover {
  color: rgb(0 187 0 / 0.5);
}

.btnColor:focus {
  color: rgb(0 187 0 / 0.5);
}

.btnColor:active {
  color: #00bb11;
}
</style>
```

## 2. ElMessage、 ElMessageBox、 ElDialog 使用场景总结

### 1. ElMessage

```vue
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

function toast() {
  ElMessage({
    type: 'success', // 状态风格
    message: '你好，我是消息吐司!', // 消息吐司
    showClose: true, // 关闭按钮
    duration: 3000, // 显示时间（单位毫秒），默认 3000 毫秒, 0 表示永不关闭
    appendTo: document.body // message 根元素, 默认为 document.body , 前四个常用
  })
}
</script>
```

### 2. ElMessageBox

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'

function open() {
  // 1. 消息提示 alert
  ElMessageBox.alert('消息内容', '消息标题', {
    confirmButtonText: '确认'
  }).then(() => {
    console.log('确认点击')
  })

  // 2. 确认消息
  ElMessageBox.confirm('消息内容', '消息标题', {
    confirmButtonText: 'sure',
    cancelButtonText: 'cancel',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '确认成功！'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '取消了！'
      })
    })

  // 3. 自己研究的带开关的弹窗
  // 弹框内部 ElSwitch 的控制变量
  const toggleVal = ref(false)
  ElMessageBox({
    title: '选择',
    message: () =>
      h('div', [
        h(ElSwitch, {
          modelValue: toggleVal.value,
          'onUpdate:modelValue': (val) => {
            toggleVal.value = val as boolean
          },
          inlinePrompt: true,
          activeText: '新增表',
          inactiveText: '新增目录',
          style: {
            '--el-switch-on-color': 'green',
            '--el-switch-off-color': 'gray'
          }
        })
      ]),
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    closeOnClickModal: false
  })
    .then(() => {})
    .catch(() => {})
}
</script>
```

### 3. ElDialog

```vue
<!--  1. MyDialog.vue  -->
<script setup lang="ts">
/**
 *  网页和用户的交互中常见情形就是页面某个按钮被点击后， 用户得到一块新的区域进行表单等操作，
 *  而这块【新的区域】可以是【新页面】，也可以是【弹窗】，在 element-plus 中没有模态窗，
 *  所以可以使用 el-dialog 作为模态弹窗， 在使用的过程中， 我总结出以下用法。
 */

// 1. el-dialog 是基于 teleport 实现的，所以无论放在html的哪个地方，它都能展示到想要的位置。
// 2. 为了代码的整洁性，可以把需要的弹窗封装成单独的组件，然后在需要用到的组件中以异步组件导入的方式
//    去使用它。
// 3. el-dialog 属性
//    title: 弹窗标题
//    width: 弹窗宽度 默认是50%
//    v-model: 弹窗显示/关闭的变量
//    close-on-click-modal: 是否可以通过点击遮罩关闭对话框，默认是 true, 通常需要设置为 false
//    close-on-press-escape: 是否可以通过点击Esc关闭对话框，默认是 true, 通常需要设置为 false
//    弹窗高度一般由内容撑开，但如果要让高度可控， 需要在 el-dialog 元素上写height行内样式（其他地方写无效！）

import { defineExpose, reactive, ref } from 'vue'
import { ElDialog } from 'element-plus'

const title = ref('对话框')
const width = ref('60%')
const height = ref('')
const isShowing = ref(false)

//  后面可把上面这些属性封装成一个接口类型，便于统一管理，这里的接口配置属性并不完善，具体看代码吧，懒得写了
interface IDialogConfig {
  title: string
  width: string
  height: string
  isShowing: boolean
}

const initConfig: IDialogConfig = {
  title: '',
  width: '50%',
  height: '',
  isShowing: false
}
const config = reactive<IDialogConfig>(initConfig)

/**
 * 控制对话框显示和关闭
 * @param action
 * @param data 用于接收调用组件中传来的业务数据
 */
function openDialog(action: boolean, data: any) {
  isShowing.value = action
}

/**
 * 对话框关闭回调事件， 一般用于清除 dialog 中的表单组件数据等等， 记住这个的回调事件就算基本掌握了 dialog 的应用
 */
function onClose() {
  // do something when dialog is closed
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog
    :title="title"
    v-model="isShowing"
    :width="width"
    :style="{ height }"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
  </el-dialog>
</template>

<!-- 2. HelloMan.vue -->
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const MyDialog = defineAsyncComponent(() => import('/src/components/MyDialog.vue'))
// 这里要写好泛型类型，否则它的实例对象没有 openDialog 的类型提示, 记住这个泛型 InstanceType<typeof MyDialog>
const myDialogRef = ref<InstanceType<typeof MyDialog>>(null)

function open() {
  if (myDialogRef.value) {
    myDialogRef.value.openDialog(true, '一些数据')
  }
}
</script>

<template>
  <div>这是起始页面， 下面是弹窗页面</div>
  <el-button @click="open">弹窗</el-button>
  <MyDialog :ref="(el: any) => (myDialogRef.value = el)"></MyDialog>
</template>
```
