import request from '@/utils/request'
import API from '@/api/consts'
import type { LoginResponseData } from '@/api/login/types/login'

export const loginApi = (username: string, password: string) => {
  return request.post<LoginResponseData>(API.login, { username, password })
}
