export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    function setToken(value: string) {
      token.value = value
    }

    return {
      token,
      setToken
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['token'],
      key: 'gao_store_user'
    }
  }
)
