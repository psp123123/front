<template>

  <el-col :span="8" class="user-menu">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img src="/avatar.png" class="avatar-image" alt="avatar" />
        <span class="username">{{ configStore.userInfo }}</span>
        <el-icon><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Plus">账户</el-dropdown-item>
          <el-dropdown-item :icon="CirclePlusFilled">
            登出
          </el-dropdown-item>

        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-col>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useConfigStore from '@/stores/modules/config'
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'

defineOptions({
  name: 'User',
})

// 引入pinia数据
const configStore = useConfigStore()
console.log('当前登陆用户:', configStore.userInfo)

// 正确的顺序：先导入，再使用
const router = useRouter()

// 使用Vue 3的script setup语法，自动将所有声明的变量和函数暴露给模板
const showDropdown = ref(false)

// 为函数添加明确的类型注解，这有助于TypeScript正确识别
const toggleDropdown = (): void => {
  showDropdown.value = !showDropdown.value
}

const hideDropdown = (): void => {
  // 延迟隐藏，确保点击菜单项有效
  setTimeout(() => {
    showDropdown.value = false
  }, 100)
}

// 添加鼠标悬停事件处理函数，并添加明确的类型注解
const showDropdownMenu = (): void => {
  showDropdown.value = true
}

const hideDropdownMenu = (): void => {
  setTimeout(() => {
    showDropdown.value = false
  }, 100)
}

// 其余函数保持不变
const selectUser = (user: string): void => {
  console.log('选择用户:', user)
  if (user === 'account') {
    // 确保router已正确初始化
    if (router) {
      console.log('prepare redict')
      router
        .push('/manager')
        .then(() => console.log('跳转成功'))
        .catch((err) => console.error('跳转失败', err))
    } else {
      console.error('Router is not initialized')
    }
  }

  // 执行账户操作
  showDropdown.value = false
}

const logout = (): void => {
  console.log('用户登出')
  // 执行登出逻辑
  showDropdown.value = false
  router.push('/logout')
}
</script>
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.user-name {
  cursor: pointer;
  padding: 8px 12px 0;
  border: 0;
  border-radius: 4px;
  background-color: rgba(45, 44, 13, 0);
  /* background-color: rgba(255, 255, 255, 0); */
  /* user-select: none; */
  width: 100px;
  border: 1px solid #ccc;
}

/* 下拉菜单样式 */
.user-select-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  /* padding: 8px 12px; */
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 1000;
  overflow: hidden;
}

.user-select-dropdown li {
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
}

.user-select-dropdown li:hover {
  background-color: #f0f0f0;
}

.user-select-dropdown li:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.avatar-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

:deep(.user-menu .el-dropdown-link) {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* 用户名与箭头的间距 */
  font-size: 18px;
  /* 调整整体字体大小 */
  font-weight: 500;
  line-height: 1;
  /* 避免换行 */
  cursor: pointer;
  color: var(--el-text-color-primary);
  vertical-align: middle;
  /* 保持整体垂直居中 */
}

:deep(.user-menu .el-dropdown-link .el-icon) {
  font-size: 16px;
  /* 图标大小略小一点 */
  line-height: 1;
  display: inline-flex;
  align-items: center;
}

:deep(.avatar-image) {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
