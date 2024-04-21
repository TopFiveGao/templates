import request from '@/utils/request'
import API from '@/api/consts'
import type { LoginResponseData } from '@/api/login/types/login'

/**
 * 一定要显示声明函数返回值类型 Promise<LoginResponseData> , 否则返回值类型不会被识别
 * @param username
 * @param password
 */
export const loginApi = (username: string, password: string): Promise<LoginResponseData> => {
  return request.post(API.login, { username, password })
}
