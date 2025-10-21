// 引入pinia
import { defineStore } from 'pinia'
import { constantroutes } from '@/router/route'
// 引入路由组件
import { useRoute } from 'vue-router'

// 使用路由组件
const route = useRoute()

export interface RouteItem {
  path: string
  name?: string
  meta?: {
    title?: string
    hidden?: boolean
    manager?: boolean
  }
  children?: RouteItem[]
}

export interface UserInfo {
  accessToken: string
  username: string
  userID: string | number
  nickname: string
  avatar: string
}
export function filterMenu(routes: RouteItem[] = []): RouteItem[] {
  return routes
    .filter((route) => !route.meta?.hidden) // 过滤隐藏项
    .map((route) => {
      const temp = { ...route }
      if (route.children) {
        temp.children = filterMenu(route.children)
      }

      return temp
    })
}

let useConfigStore = defineStore('config', {
  state: () => {
    return {
      //Token: 'Token Admin', // 后续需要处理
      menuList: filterMenu(constantroutes),
      userInfo: null as UserInfo | null,
      rowRoutes: constantroutes,
    }
  },

  // actions
  actions: {
    setUser(userinfo: UserInfo) {
      this.userInfo = userinfo
    },

    // 设置菜单，在触发器使用
    setMenuList(menu: any[]) {
      this.menuList = menu
    },

    // 从静态路由中提取manager菜单
    generateManagerMenu() {
      const managerRoute = constantroutes.find((r) => r.path === '/manager')
      if (!managerRoute || !managerRoute.children) return []

      return managerRoute
    },
  },
  getters: {},
})

export default useConfigStore
