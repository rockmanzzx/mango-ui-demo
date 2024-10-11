
import ElementPlus from 'element-plus';
import { ElMessage } from 'element-plus';   
import 'element-plus/dist/index.css';

import 'font-awesome/css/font-awesome.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import api from './http'
import global from '@/utils/global'

import i18n from './locale/i18n';

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.use(api)

app.use(i18n)

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$global = global

app.mount('#app')
