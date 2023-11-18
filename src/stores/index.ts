import {createPinia} from "pinia"
import persist from "pinia-plugin-persistedstate"


const stores = createPinia()
stores.use(persist)

export * from './modules/app'
export default stores