import SvgIcon from '@/components/svg/index.vue'

const allGlobalComponents = { SvgIcon }
// 对外暴露插件对象
export default {
  install(app: any) {
    // 使用 keyof typeof 确保类型安全
    Object.keys(allGlobalComponents).forEach((key) => {
      const componentKey = key as keyof typeof allGlobalComponents // 明确类型
      app.component(componentKey, allGlobalComponents[componentKey])
    })
  },
}
