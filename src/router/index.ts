import { createRouter, createWebHashHistory } from 'vue-router'

// import { isLogin } from '@/utils/auth'

import { constantroutes } from '@/router/route'

// 引入pinia的信息
import useConfigStore from '@/stores/modules/config'

const Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantroutes,
})
export default Router

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
export const beforeEachRouter = Router.beforeEach((to, from, next) => {
  const configStore = useConfigStore()

  console.log('跳转前的路由信息：', from.path)
  //如果进入/manager路由时
  if (to.path.startsWith('/manager')) {
    const managerMenu = configStore.generateManagerMenu()
    configStore.setMenuList([managerMenu])
  } else {
    const x = configStore.setMenuList(configStore.rowRoutes)
    console.log('-------------------记录路由 ', x)
    console.log('------------------此时的pinia的信息', configStore.menuList)
  }
  next()
})
