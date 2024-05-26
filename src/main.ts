import './assets/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'virtual:svg-icons-register'
import patchRoute from './plugins/patchRoute'

const app = createApp(App)

app.use(store)
app.use(patchRoute)
app.mount('#app')
