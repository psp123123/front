// 向后端交互
// axios全局默认值
import axios from 'axios'

// 定义表单类型
interface LoginParams {
  username: string
  password: string
}

// 定义接口返回数据类型
interface LoginResponse {
  code: number
  data: {
    accessToken: string
    username: string
    userID: string
    nickname: string
  }
  message: string
}

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

console.log('拼接的请求url:', import.meta.env.VITE_API_URL)
// 发送POST请求
export async function identifyUser(params: LoginParams): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/login', {
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
