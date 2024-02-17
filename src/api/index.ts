import request from '@/utils/request'

export const login = (username: string, password: string, code: string, uuid: string) => request.post('/auth/login', {
    username,
    password,
    code,
    uuid
})