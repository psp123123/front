// 静态路由配置列表

export const constantroutes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/Home.vue'),
    meta: { title: '概览', hidden: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { title: 'Login', hidden: true, hideLayout: true },
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/components/Home.vue'), // 建议使用布局组件
    name: '信息收集',
    meta: { title: '信息收集', hidden: false },
    children: [
      {
        name: 'nmap',
        path: 'nmap',
        component: () => import('@/views/Login.vue'),
        meta: { title: 'nmap', hidden: false },
      },
      {
        name: '工具',
        path: 'tools',
        component: () => import('@/views/Login.vue'),
        meta: { title: '工具', hidden: false },
      },
    ],
  },

  {
    path: '/manager',
    component: () => import('@/components/UserManageBar.vue'), // 添加布局组件
    name: 'user',
    meta: { title: 'manager', hidden: true },
    children: [
      {
        path: '',
        redirect: { name: 'edituser', hidden: true }, // 默认重定向
        meta: {
          title: 'default',
          manager: true,
        },
      },
      {
        path: 'edituser',
        name: 'edituser',
        component: () => import('@/components/EditProfile.vue'),
        meta: {
          requiresAuth: true, // 修正拼写
          title: 'Edit User',
          hidden: true,
          manager: true,
        },
      },
      {
        path: 'editpass',
        name: 'editpass',
        component: () => import('@/components/EditPasswd.vue'),
        meta: {
          requiresAuth: true, // 建议也添加权限验证
          title: 'Edit Password',
          hidden: true,
          manager: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Not Found' },
  },
]
