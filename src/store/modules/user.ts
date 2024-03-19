export const useUserStore = defineStore('user', () => {
  const token = ref('')
  function setToken(value: string) {
    token.value = value
  }

  return {
    token,
    setToken
  }
})
