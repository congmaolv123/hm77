// axios-默认配置选项
import axios from 'axios'
import store from '@/store'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}

export default axios