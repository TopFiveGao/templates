<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="username">
      <el-input
        v-model="ruleForm.username"
        type="text"
        autocomplete="off"
        @input="validate('username')"
      />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        @input="validate('password')"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
  <el-text>{{ txt }}</el-text>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi } from '@/api/login'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const txt = computed(() => userStore.token)
const ruleForm = reactive({
  username: '',
  password: ''
})
const ruleFormRef = ref<FormInstance>()

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户名为空！'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码为空！'))
  }
  callback()
}

const validate = (prop: string) => {
  ruleFormRef.value?.validateField(prop)
}

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const data = await loginApi(ruleForm.username, ruleForm.password)
      const token = data.result?.token
      if (token) {
        userStore.setToken(token)
      }
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
