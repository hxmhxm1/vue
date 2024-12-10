import axios from 'axios'
import { TOKEN } from '@/config/const'
import { useRouter } from 'vue-router'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers[TOKEN] = localStorage.getItem(TOKEN)
    console.log('请求头---', config.headers, localStorage.getItem(TOKEN))
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.log('请求头---错误', error)
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    const { data } = response
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('axios拦截器成功返回---', response)
    return data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('axios拦截器失败返回---', error, error.status)
    if (error.status === 401) {
      handle401()
    }
    return Promise.reject(error)
  },
)

const handle401 = () => {
  window.location.href = '/login'
}

export default instance
