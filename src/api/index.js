// axios-默认配置选项
import axios from 'axios'
import store from '@/store'
import router from '@/router'

import JSONBig from 'json-bigint'

// 进行配置  👇只会执行一次
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [
  (data) => {
    // data 此时是后端的原始数据
    // data 后台如果没有返回数据  值null
    // JSONBig.parse(null) 报错  阻止程序运行
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]

// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 在每次请求之前，获取token信息，追加在header中
// 用到技术 请求拦截器在请求前 做某一些事
// 添加拦截器
axios.interceptors.request.use((config) => {
  // config配置项  修改config
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (errorr) => {
  // Promise构造器 reject 错误的 返回错误处理
  // eslint-disable-next-line no-undef
  return Promise.reject(error)
})

// 响应拦截器 在每次响应后，做的事情
axios.interceptors.response.use((res) => {
  // 响应成功时
  return res
}, (err) => {
  // 响应失败时
  // 获取响应状态码 err对象包括响应对象/状态码  errr.response
  if (err.response.status === 401) {
    // 跳转到登录页 this.$router.push('/login')
    // 方式1：this.$router.push('/login') 把地址栏改成 #/login
    // location.hash = '#/login'
    // 2.如果没有vue实例，没法获取￥router，通过router实例直接使用 导入router
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
