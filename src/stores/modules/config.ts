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
export function filterMenu(routes: RouteItem[] = [], parentPath = ''): RouteItem[] {
  function shouldKeepRoute(route: RouteItem): boolean {
    const routeMeta = route.meta || {}
    // 生成当前路由的完整绝对路径（父路径 + 当前路径）
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path
    console.log('当前路由完整路径:', fullPath) // 调试：查看完整路径

    // 基于完整路径判断是否为manager相关
    const isManagerRelated = fullPath === '/manager' || fullPath.startsWith('/manager/')
    console.log('是否为manager相关路由:', isManagerRelated)

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

// 结合当前路由路径过滤
function filterMenuWithCurrentRoute(routes: RouteItem[], currentPath: string): RouteItem[] {
  const filteredByMeta = filterMenu(routes)

  // 根据当前路径判断是否需要只显示/manger的子菜单
  const isInManagerRoute = currentPath.startsWith('mangaer')
  if (isInManagerRoute) {
    const managerRoute = filteredByMeta.find((item) => item.path === '/manager')
    return managerRoute?.children || []
  } else {
    return filteredByMeta.filter((item) => item.path !== '/manager')
  }
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
  },
  getters: {
    dynamicMenuList(): RouteItem[] {
      const route = useRoute() // 获取当前路由
      return filterMenuWithCurrentRoute(this.rowRoutes, route.path)
    },
  },
})

export default useConfigStore
