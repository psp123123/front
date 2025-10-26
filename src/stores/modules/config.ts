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

export function filterMenuManager(routes: RouteItem[] = []): RouteItem[] {
  return (
    routes
      // .filter((route) => !route.meta?.hidden) // 过滤隐藏项
      .filter((route) => {
        // 特殊处理：manager 路由即使 hidden 也要保留
        if (route.meta?.manager) {
          return true
        }
        return !route.meta?.hidden
      })
      .map((route) => {
        const temp = { ...route }
        if (route.children) {
          temp.children = filterMenuManager(route.children)
        }
        return temp
      })
  )
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
      this.menuList = filterMenuManager(menu)
    },

    // 从静态路由中提取manager菜单
    generateManagerMenu() {
      const managerRoute = constantroutes.find((r) => r.path === '/manager')
      if (!managerRoute || !managerRoute.children) return []
      console.log('获取到的路由信息', managerRoute)
      return managerRoute
    },
  },
  getters: {},
})

export default useConfigStore
