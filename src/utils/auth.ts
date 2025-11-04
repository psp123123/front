// 拦截器实现
import axios from 'axios'

// 创建拦截器实例
const request = axios.create({
  baseURL: 'tt-api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ---------请求拦截器
request.interceptors.request.use(
  (config) => {
    // 1. 添加token到请求头
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 其他动作

    // 返回配置对象
    return config
  },
  (error) => {
    console.error('请求拦截器错误;', error)
    return Promise.reject(error) // 传递错误给调用者
  },
)

// -------------响应拦截器
request.interceptors.response.use(
  (response) => {
    // 1. 只返回data部分
    const res = response.data

    // 2. 根据后端状态码处理
    if (response.status !== 200) {
      console.error('接口错误', response.statusText || '请求失败')

      // 3. 登陆信息失效
      if (response.status === 400) {
        // 清除无效token
        localStorage.removeItem('accessToken')
        // 跳转登陆页
        window.location.href = '/login'
      }
      return Promise.reject(response)
    }
    return response
  },
  (error) => {
    console.error('响应拦截器错误', error.message)

    if (error.code === 'ECONNABORTED') {
      console.error('请求超时，请重试')
    } else if (!window.navigator.onLine) {
      console.error('网络已断开，请检查网络')
    }

    return Promise.reject(error)
  },
)

export default request
