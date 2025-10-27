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
