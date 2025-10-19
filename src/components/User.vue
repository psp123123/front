<template>

  <el-col :span="8">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
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
.block-col-2 .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.block-col-2 .el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
