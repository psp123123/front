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
