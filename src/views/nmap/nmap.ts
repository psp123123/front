import { serverApi } from '@/api/user'
import { defineStore } from 'pinia'

// 定义pinia存储库
export const useNmapStore = defineStore('nmapStatus', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },
    // 切换加载状态
    toggleLoading() {
      this.isLoading = !this.isLoading
    },
  },

  // 添加持久化配置
  persist: {
    key: 'nmap-store',
    storage: localStorage,
  },
})
// 定义发送nmap数据的类型
interface NmapParams {
  host: string
  scanParams: string
}
// 使用路由守卫的request，发送post请求，请求地址：/tt-api/api/nmap
export async function postNmapData(params: NmapParams) {
  //向后端发送数据
}
