// 向后端交互
// axios全局默认值
import axios from 'axios'
import type { UserInfo } from '@/stores/modules/config'

// 引入请求拦截器
import request from '@/utils/auth'
// 定义表单类型
interface LoginParams {
  username: string
  password: string
}

// 定义接口返回数据类型
interface LoginResponse {
  code: number
  data: UserInfo
  message: string
}

// 定义服务端返回userinfo接口数据类型
interface UserInfoResponse {
  user: string
}

// 创建axios实例
export const serverApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 发送POST请求,请求登陆
export async function identifyUser(params: LoginParams): Promise<LoginResponse> {
  try {
    const response = await serverApi.post<LoginResponse>('/login', {
      user: params.username,
      passwd: params.password,
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 发送GET请求，请求/userinfo信息
export async function getUserInfo() {
  // 使用request拦截器携带token信息请求/userinfo接口
  try {
    const res = await request.get('/api/userinfo')
    return res
  } catch (error) {
    console.error('getUserInfo run error', error)
    throw error
  }

  //return {username:""}
}
