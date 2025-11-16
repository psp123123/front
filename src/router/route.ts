import MainLayout from '@/layout/Menu/index.vue'
import { Chicken } from '@element-plus/icons-vue'
import { component } from 'vxe-pc-ui'

export const constantroutes = [
  // 根路径，默认重定向到 /home
  {
    path: '/',
    redirect: '/home',
    component: MainLayout, // 可选，如果你希望布局保持一致
    meta: { title: '概览', hidden: false, manager: false, isWebsocket: false },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/components/Home.vue'),
        meta: { title: '概览', hidden: false, manager: false },
      },
    ],
  },

  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { title: 'Login', hidden: true, hideLayout: true, manager: false, isWebsocket: false },
  },

  // 信息收集菜单
  {
    path: '/collect',
    component: MainLayout, // 父布局，显示左侧菜单 + 内容区域
    name: '信息收集',
    meta: { title: '信息收集', hidden: false, manager: false },
    //redirect: '/collect/nmap', // 默认访问子菜单 nmap
    children: [
      {
        path: 'nmap',
        name: 'nmap',
        component: () => import('@/views/nmap/nmap.vue'),
        meta: { title: 'nmap', hidden: false, manager: false, isWebsocket: true },
      },
      {
        path: 'dirsearch',
        name: 'dirsearch',
        component: () => import('@/views/dirsearch/dirsearch.vue'),
        meta: { title: 'dirsearch', hidden: false, manager: false, isWebsocket: true },
      },
    ],
  },

  // 漏洞指纹
  {
    path: '/nuclei',
    name: 'nuclei',
    component: MainLayout,
    meta: { title: 'nuclei', hidden: false, manager: false },
    children: [
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/nuclei/nucleiCreate.vue'),
        meta: { title: '生成', hidden: false, manager: false, isWebsocket: false },
      },
      {
        path: 'execute',
        name: 'execute',
        component: () => import('@/views/nuclei/nuclei.vue'),
        meta: { title: '执行', hidden: false, manager: false, isWebsocket: false },
      },
    ],
  },

  // Manager 子菜单
  {
    path: '/manager',
    redirect: '/manager/edituser',
    component: MainLayout,
    name: 'user',
    meta: { title: 'manager', hidden: true, manager: true, isWebsocket: false },
    children: [
      {
        path: 'edituser',
        name: 'edituser',
        component: () => import('@/components/EditProfile.vue'),
        meta: { title: 'Edit User', hidden: false, manager: true, isWebsocket: false },
      },
      {
        path: 'editpass',
        name: 'editpass',
        component: () => import('@/components/EditPasswd.vue'),
        meta: { title: 'Edit Password', hidden: false, manager: true, isWebsocket: false },
      },
    ],
  },

  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Not Found', hidden: true, manager: false, isWebsocket: false },
  },
]
