/* eslint-disable no-undef */
// 存储信息
// 1.约定信息KEY是啥  常量hm-77-user
// 2.存储信息的值是什么 用户信息对象（字符串json格式）
const kEY = 'hm-touitiao-77-user'

export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    window.sessionStorage.setItem(kEY, JSON.stringify(user))
  },
  getUser () {
    //   获取用户信息 如果拿不到是一个空字符串
    return JSON.parse(window.sessionStorage.getItem(kEY) || '{}')
  }
}
