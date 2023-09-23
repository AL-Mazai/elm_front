import {createApp} from 'vue'
import App from './App.vue'

//创建vue实例
const app = createApp(App)

//normalize.css组件
import 'normalize.css/normalize.css'

//font-awesome组件
import 'font-awesome/css/font-awesome.min.css'

//element-plus和icon图标组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)

//配置全局axios
import axios from 'axios'
app.config.globalProperties.axios = axios

//配置路由
import router from './router'
app.use(router)

//启动程序
app.mount('#app')

