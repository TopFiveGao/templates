import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'
import type { ApiResponseData } from '@/types/api'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_PREFIX,
  timeout: 20000,
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
  // 该函数返回值类型自动推导为 ApiResponseData<any>, 但返回值要求是 AxiosResponse 类型, 否则报错, 所以改成 any
  (response: AxiosResponse<ApiResponseData<any>>): any => {
    const { result_state } = response.data
    if (result_state === '0') {
      return response.data
    } else {
      return response.data
    }
  },
  (error: any) => {
    return Promise.reject(error.message)
  }
)

export default service
