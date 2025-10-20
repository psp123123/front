// 引入pinia
import { defineStore } from 'pinia'
import { constantroutes } from '@/router/route'

export interface RouteItem {
  path: string
  name?: string
  meta?: {
    title?: string
    hidden?: boolean
  }
  children?: RouteItem[]
}

interface UserInfo {
  accessToken: string
  username: string
  userID: string | number
  nickname: string
  avatar: string
}
export function filterMenu(routes: RouteItem[]): RouteItem[] {
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
