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
      Token: 'Token Admin',
      menuList: filterMenu(constantroutes),
    }
  },

  // actions
  actions: () => {},
  getters: {},
})

export default useConfigStore
