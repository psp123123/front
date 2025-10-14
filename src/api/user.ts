// src/api/user.js —— 模拟 API
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '启用' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '普通用户', status: '启用' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '审核员', status: '禁用' },
]

let nextId = 4

export const getUserList = (page = 1, pageSize = 10, keyword = '') => {
  let filtered = users
  if (keyword) {
    filtered = users.filter((u) => u.name.includes(keyword) || u.email.includes(keyword))
  }
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    list: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize,
  }
}

export const addUser = (user: any) => {
  user.id = nextId++
  users.push(user)
}

export const updateUser = (updatedUser: any) => {
  const index = users.findIndex((u) => u.id === updatedUser.id)
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser }
  }
}

export const deleteUser = (id: number) => {
  users = users.filter((u) => u.id !== id)
}

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
    token: string
  }
  message: string
}

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 发送POST请求
export async function identifyUser(params: LoginParams): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/login', {
      user: params.username,
      passwd: params.password,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
