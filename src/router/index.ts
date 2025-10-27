import { createRouter, createWebHashHistory } from 'vue-router'

// import { isLogin } from '@/utils/auth'

import { constantroutes } from '@/router/route'

const Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantroutes,
})
export default Router
