import axios, {type AxiosResponse, type InternalAxiosRequestConfig} from 'axios'

console.log(import.meta.env.VITE_API_BASE)

const axiosInstance = axios.create({
    timeout: 10000,
    baseURL: import.meta.env.VITE_API_BASE
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {

    return config
}, (error: any) => {
    return Promise.reject(error)
})


axiosInstance.interceptors.response.use((response: AxiosResponse<any, any>) => {

    return response
}, (error: any) => {
    return Promise.reject(error)
})


export default axiosInstance