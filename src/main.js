import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import 'bootstrap/dist/css/bootsrap.min.css'
import './assets/all.scss' //無法吃到變數，好像沒什麼用，目前寫在vite.config，先註解
import 'bootstrap'

const app = createApp(App)

app.use(router)

app.mount('#app')
