// 定义router对象 导出给卖.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Aticle from '@/views/article'
import Notfound from '@/views/404'
import store from '@/store'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
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
        { path: '/article', name: 'article', component: Aticle },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment }
      ]
    },
    // 处理404
    { path: '*', name: '404', component: Notfound }
  ]
})

router.beforeEach((to, from, next) => {
  // // 1. 判断是不是登录路由
  // if (to.path === '/login') return next()
  // // 2. 判断是否登录
  // if (!store.getUser().token) return next('/login')
  // // 3. 放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
