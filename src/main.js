import Vue from 'vue'
import App from './App.vue'
// 控制台提示信息 开发环境来提示 详细一些 （上线时可以改成ture）
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
