<template>

  <el-col :span="8">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <!-- <span class="username">{{ configStore.userInfo }} </span> -->
        <span class="username">admin </span><el-icon><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Plus" @click="account">账户</el-dropdown-item>
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

function account() {
  console.log('prepare redict')
  router
    .push('/manager')
    .then(() => console.log('跳转成功'))
    .catch((err) => console.error('跳转失败', err))

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
  width: 100px;
}

.el-dropdown-menu .el-dropdown-item {
  font-size: 160px;
  background-color: brown;
  /* 根据需要调整大小，比如16px、18px等 */
}
</style>
