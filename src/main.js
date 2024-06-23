import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAdminStore } from '@/store/adminState.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

const store = useAdminStore()
store.loadCurrentUser()
app.use(store)
app.mount('#app')
