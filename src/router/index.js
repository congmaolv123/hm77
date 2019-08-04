// 定义router对象 导出给卖.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  routes: [
    {
      path: '/login',
      // name的作用给当前路由器规则取名 $router.push('/Login) 或则 $router.push(name: '/Login)
      name: 'login',
      component: Login
    }
  ]
})

export default router
