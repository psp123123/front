import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vxe-pc-ui/es/style.css' // 导入PC UI样式
import 'vxe-table/es/style.css' // 导入表格样式
import VXEUI from 'vxe-pc-ui' // 导入PC UI组件
import VXETable from 'vxe-table' // 导入表格组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import globalCostomComponents from '@/components/'

const app = createApp(App)

const pinia = createPinia()
app.use(globalCostomComponents)

app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
app.use(VXEUI) // 注册PC UI组件
app.use(VXETable) // 注册表格组件
// svg插件
import 'virtual:svg-icons-register'

app.mount('#app')
