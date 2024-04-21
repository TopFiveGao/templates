import { type ApiResponseData } from '@/types/api.d'

export type LoginResponseData = ApiResponseData<{
  token: string
  exp: number
  headerName: string
}>
