import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import 'element-plus/dist/index.css'
import pinia from '@/stores/index'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
