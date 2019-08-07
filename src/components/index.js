// 封装一个插件
// 注册所有组件为全局组件

import Mybread from '@/components/my-bread'
import Mytest from '@/components/my-test'

// vue插件  暴露一个对象 对象中有一个选项  install 安装
export default {
  install (Vue) {
    // 安装函数 当vue.user(使用插件) install就会被调用
    // eslint-disable-next-line no-undef
    Vue.component(Mybread.name, Mybread)
    // eslint-disable-next-line no-undef
    Vue.component(Mytest.name, Mytest)
  }
}
