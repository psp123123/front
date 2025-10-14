// // src/utils/auth.js —— 模拟登录认证

// const TOKEN_KEY = 'admin-token'

// // 模拟合法用户
// const VALID_USER = {
//   username: 'admin',
//   password: '123456',
// }

// // 生成随机6位验证码（数字+字母）
// export const generateCaptcha = () => {
//   const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 排除易混淆字符
//   let result = ''
//   for (let i = 0; i < 6; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length))
//   }
//   return result
// }

// // 登录验证
// export const login = ({ username, password, captcha }, realCaptcha) => {
//   // 验证验证码（不区分大小写）
//   if (captcha.toUpperCase() !== realCaptcha.toUpperCase()) {
//     return { success: false, message: '验证码错误' }
//   }

//   // 验证用户名密码
//   if (username === VALID_USER.username && password === VALID_USER.password) {
//     const token = 'fake-token-' + Date.now()
//     localStorage.setItem(TOKEN_KEY, token)
//     return { success: true, token }
//   } else {
//     return { success: false, message: '用户名或密码错误' }
//   }
// }

// // 获取 Token
// export const getToken = () => {
//   return localStorage.getItem(TOKEN_KEY)
// }

// // 移除 Token（退出登录）
// export const removeToken = () => {
//   localStorage.removeItem(TOKEN_KEY)
// }

// // 判断是否已登录
// export const isLogin = () => {
//   return !!getToken()
// }
