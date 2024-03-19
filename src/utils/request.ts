import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_PREFIX,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.p_token = userStore.token
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === '00000') {
      return response.data
    }

    if (response.data instanceof ArrayBuffer) {
      return response
    }

    ElMessage.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: any) => {
    return Promise.reject(error.message)
  }
)

export default service
