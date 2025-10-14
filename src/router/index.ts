import { createRouter, createWebHashHistory } from 'vue-router'

// import { isLogin } from '@/utils/auth'

import { constantroutes } from '@/router/route'

const Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantroutes,
})

// // 全局前置守卫
// Router.beforeEach((to, from, next) => {
//   // 设置页面标题
//   if (to.meta.title) {
//     document.title = `${to.meta.title}`
//   }
//   console.log('全局守卫')

//   // // 权限验证
//   // if (to.meta.requiresAuth && !isLogin()) {
//   //   next({ name: 'login', query: { redirect: to.fullPath } })
//   // } else if (to.name === 'login' && isLogin()) {
//   //   next({ name: 'home' })
//   // } else {
//   //   next()
//   // }
// })

export default Router
