import Vue from 'vue'
import App from './App.vue'
import router from "./router";

//normalize.css组件
import 'normalize.css/normalize.css'

//font-awesome组件
import 'font-awesome/css/font-awesome.min.css';


//element-ui组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//配置全局axios
import axios from 'axios'
Vue.prototype.axios = axios

//关闭Vue.js启动时生成的生产提示
Vue.config.productionTip = false

/**
 * 使用Vue.js框架创建的JavaScript应用程序的入口点。这里通过创建一个新的Vue实例并将其挂载到HTML元素#app上来启动应用程序。
 * render选项定义了一个函数，该函数返回渲染App组件的虚拟DOM树，并且router选项是Vue.js路由的实例，可以通过它来定义和控制路由
 */
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
