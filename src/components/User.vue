<template>
  <el-dropdown placement="bottom-end">
    <!-- 用户信息按钮 -->
    <div class="user-info">
      <span class="username">{{ username }}</span>
      <el-avatar class="avatar" size="small" type="text"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </div>

    <!-- 下拉菜单 -->
    <template #dropdown>
      <el-dropdown-menu class="dark-dropdown">
        <el-dropdown-item @click="goAccount">账号密码</el-dropdown-item>
        <el-dropdown-item divided @click="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>

import { useRouter } from 'vue-router'
// 引入pinia存储
import useConfigStore from '@/stores/modules/config'
import { onMounted, ref } from 'vue'
// 引入request拦截器
import { getUserInfo } from '@/api/user'





const router = useRouter()
// 使用存储在pinia中的数据
const config = useConfigStore()
const username = ref('')





// 组件初始化即获取用户信息
onMounted(async () => {
  try {
    // 如果可以获取到pinia中的信息，则使用pinia
    if (config.userInfo?.username) {
      username.value = config.userInfo?.username
      console.warn('user get error:', username)

    } else {
      // 否则从后端获取数据
      const userinfo = await getUserInfo()
      console.log('get from server userinfo:', userinfo)
      username = userinfo.data?.username
    }


  } catch (error) {
    console.error('get username error:', error)
    username.value = 'guest'
  }
})

// const goAccount = () => {
//   const managerMenu = config.generateManagerMenu()
//   console.log('跳转时获取路由信息,并设置set MenuList', managerMenu)
//   config.setMenuList([managerMenu])
//   console.log('default routes are:', config.menuList)
//   // 跳转
//   router.push('/manager')
// }

const goAccount = () => {
  router.push('/manager')
}
// 监视路由 变化

const logout = () => {
  localStorage.removeItem('accessToken')
  router.push('/login')
}
</script>

<style scoped>
/* 顶部栏背景假设是深色，比如 #2c3e50 */
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  cursor: pointer;
  padding: 6px 10px;
  border: 0;
  outline: none;
}

.username {
  font-weight: bold;
  font-size: 14px;
  color: #fff;
}

.avatar {
  border: 1px solid #fff;
}

/* --- 下拉菜单样式 --- */
.dark-dropdown {
  /* background-color: #2c3e50 !important; */
  /* border: none !important; */
  width: 100px;
  min-width: 100px;
  padding: 4px 0;
  text-align: center;
  border-radius: 6px;
}

/* 菜单项样式 */
.dark-dropdown .el-dropdown-menu__item {
  color: #fff !important;
  font-weight: 600;
  justify-content: center;
}

.dark-dropdown .el-dropdown-menu__item:hover {
  /* background-color: #3d566e !important; */
  color: #fff;
}
</style>
