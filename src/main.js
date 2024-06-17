import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import 'bootstrap/dist/css/bootsrap.min.css'
// import './assets/all.scss'
import 'bootstrap'

const app = createApp(App)

app.use(router)

app.mount('#app')
