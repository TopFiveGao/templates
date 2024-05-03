import type { UserInfo } from '@/api/login/types/login'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const info = reactive<UserInfo>(<UserInfo>{})

    function setToken(value: string) {
      token.value = value
    }

    function setInfo(value: UserInfo) {
      Object.assign(info, value)
    }

    return {
      token,
      setToken,
      info,
      setInfo
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['token', 'info'],
      key: 'gao_store_user'
    }
  }
)
