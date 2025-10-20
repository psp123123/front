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
export function filterMenu(routes: RouteItem[]): RouteItem[] {
  // 递归单个路由项，返回bool表示是否保留该路由
  function shouldKeepRoute(route: RouteItem): boolean {
    const routeMeta = route.meta || {}

    // 判断如果是/manager路由时
    const isManagerRelated = route.path === '/manager' || route.path.startsWith('/manager/')

    if (isManagerRelated) {
      return routeMeta.manager === true
    } else {
      return routeMeta.hidden !== true
    }
  }
  return (
    routes
      // .filter((route) => !route.meta?.hidden) // 过滤隐藏项
      .filter((route) => shouldKeepRoute(route))
      .map((route) => {
        const temp = { ...route }
        if (route.children) {
          temp.children = filterMenu(route.children)
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
    }
  },

  // actions
  actions: {
    setUser(userinfo: UserInfo) {
      this.userInfo = userinfo
    },
  },
  getters: {},
})

export default useConfigStore
