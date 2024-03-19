export const useAppStore = defineStore('app', () => {
  const appName = ref('Mighty admin')
  function setAppName(name: string) {
    appName.value = name
  }
  return {
    appName,
    setAppName
  }
})
const store = createPinia()
export default store
