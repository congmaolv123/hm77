import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
// @路径的别名 src路径别名 在vue-cli创建的项目下才使用
// 目录下是有默认索引文件 index.js 就是索引文件 js vue json

// 控制台提示信息 开发环境来提示 详细一些 （上线时可以改成ture）
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
