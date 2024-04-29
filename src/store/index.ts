import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedState)

export default store

export * from './modules/user'
