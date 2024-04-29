// 此处不能使用 @ 路径别名，mockjs 找路径会报错
import API_URL from '../src/api/consts'
import { type MockMethod } from 'vite-plugin-mock'

enum MOCK_CONFIG {
  GET = 'get',
  POST = 'post',
  DEV_BASE_URL = '/v1/api'
}

export default [
  {
    url: MOCK_CONFIG.DEV_BASE_URL + API_URL.login,
    method: MOCK_CONFIG.POST,
    response: (opt: Record<string, any>) => {
      if (opt.body.username === 'admin' && opt.body.password === '11111111') {
        return {
          result_state: '0',
          result_message: 'success',
          result: {
            token: 'mock123'
          }
        }
      } else {
        return {
          result_state: '400',
          result_message: 'exception',
          result: null
        }
      }
    }
  }
] as MockMethod[]
