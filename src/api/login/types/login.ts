import { type ApiResponseData } from '@/types/api.d'

export type LoginResponseData = ApiResponseData<{
  token: string
  exp: number
  headerName: string
}>

export type UserInfos = Array<UserInfo>

export interface UserInfo {
  menu: Array<UserMenu>
  optid: Array<string>
  user: {
    IDCARDNO: string
    CRTIME: string
    SYSTEMID: string
    DELETEFLAG: string
    ALLOWABLE: string
    RYZHURL: string
    NAME: string
    PASSWORD: string
    DEPTNAME: string
    CREATOR: string
    QMDZ: string
    LASTUPDATEDTIME: string
    DEPT: string
    SJHM: string
    LOGINNAME: string
  }
}

export interface UserMenuItem {
  PID: string
  ID: string
  TYPE: string
  ORDERBY: string
  URL: string
  NAME: string
  IMG?: string
}

export interface UserMenu {
  PID: string
  ID: string
  TYPE: string
  ORDERBY: string
  URL: string
  NAME: string
  IMG?: string
  nodes?: Array<UserMenuItem>
}
