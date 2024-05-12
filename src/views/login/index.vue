<template>
  <div class="w-screen h-screen login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          class="login-form p-[40px]"
        >
          <div class="flex flex-col gap-[8px] pb-[12px]">
            <span class="text-[40px] text-white">Hello</span>
            <span class="text-[20px] text-white">欢迎使用后台管理系统</span>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              type="text"
              autocomplete="off"
              @input="validate('username')"
              placeholder="用户名"
              clearable
              class="h-[46px]"
              style="font-size: 18px"
            >
              <template #prefix>
                <el-icon :size="20">
                  <i-ep-user></i-ep-user>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" class="mt-[40px]">
            <el-input
              v-model="ruleForm.password"
              :type="passwordInputType"
              autocomplete="off"
              @input="validate('password')"
              placeholder="密码"
              class="h-[46px]"
              style="font-size: 18px"
              clearable
            >
              <template #prefix>
                <el-icon :size="20">
                  <i-ep-unlock v-if="canViewPassword"></i-ep-unlock>
                  <i-ep-lock v-else></i-ep-lock>
                </el-icon>
              </template>
              <template #suffix>
                <el-icon
                  :size="20"
                  class="cursor-pointer"
                  @click.stop="canViewPassword = !canViewPassword"
                >
                  <i-ep-view v-if="canViewPassword"></i-ep-view>
                  <i-ep-hide v-else></i-ep-hide>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item class="mt-[40px]">
            <div class="w-full flex gap-[60px]">
              <el-button
                class="w-[30%]"
                :size="'large'"
                type="primary"
                @click="submitForm(ruleFormRef)"
                :loading="loading"
                style="font-size: 20px"
              >
                {{ loadingTitle }}
              </el-button>
              <el-button
                class="w-[30%]"
                :size="'large'"
                @click="resetForm(ruleFormRef)"
                style="font-size: 20px"
              >
                重置
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { getUserInfo, loginApi } from '@/api/login'
import { useUserStore } from '@/store'
import { parseMenu } from '@/utils/parseMenu'

const userStore = useUserStore()

const canViewPassword = ref(false)
const passwordInputType = computed(() => {
  return !canViewPassword.value ? 'password' : 'text'
})

const loading = ref(false)
const loadingTitle = computed(() => (!loading.value ? '登录' : '登录中 ...'))

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
      loading.value = true
      try {
        const data = await loginApi(ruleForm.username, ruleForm.password)
        const token = data.result?.token
        if (token) {
          userStore.setToken(token)
          const user = await getUserInfo()
          if (user.length > 0) {
            userStore.setInfo(user[0])
            const asyncRoutes = parseMenu(user[0].menu)
            console.log(asyncRoutes)
          }
        } else {
          ElMessage({
            message: data.result_msg || '登录失败',
            type: 'warning',
            duration: 2000,
            showClose: true
          })
        }
      } finally {
        loading.value = false
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

<style scoped>
.login-container {
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login-form {
  position: relative;
  top: 35vh;
  width: 500px;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
}

:deep(.el-form-item__error) {
  padding-top: 4px;
  font-size: 18px;
}
</style>
