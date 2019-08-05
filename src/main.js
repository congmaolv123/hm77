import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入login 首页
import router from './router/index'
// 引入公共样式
import '@/style/index.less'

import axios from '@/api'
Vue.prototype.$http = axios

// @路径的别名 src路径别名 在vue-cli创建的项目下才使用
// 目录下是有默认索引文件 index.js 就是索引文件 js vue json

// 控制台提示信息 开发环境来提示 详细一些 （上线时可以改成ture）
Vue.config.productionTip = false
Vue.use(ElementUI)
// main职责
// 1.导入项目需要依赖的资源就js css文件等其他资源
// 2.创建一个跟实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
