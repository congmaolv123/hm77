// 定义router对象 导出给卖.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Aticle from '@/views/article'
import Notfound from '@/views/404'
Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  routes: [
    {
      path: '/login',
      // name的作用给当前路由器规则取名 $router.push('/Login) 或则 $router.push(name: '/Login)
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/welcome', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Aticle }
      ]
    },
    // 处理404
    { path: '*', name: '404', component: Notfound }
  ]
})

export default router
