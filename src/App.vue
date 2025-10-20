<template>
  <div class="app-container" v-show="routerReady">
    <!-- 登录页或隐藏布局 -->
    <router-view v-if="shouldHideLayout" />

    <!-- 主布局 -->
    <div v-else class="main-layout">
      <HeadBar class="head-bar" />
      <div class="layout-content">
        <el-menu class="menu-bar">
          <MenuBar :menuList="useConfig.menuList" :key="route.path" />
        </el-menu>

        <div class="content-area">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeadBar from './components/HeadBar.vue'
import MenuBar from './components/MenuBar.vue'
import useConfigStore from './stores/modules/config'

const useConfig = useConfigStore()
const route = useRoute()
const router = useRouter()

const routerReady = ref(false)

// 判断是否隐藏布局（登录页或特殊页面）
const shouldHideLayout = computed(() => route.meta.hideLayout === true || route.path === '/login')



onMounted(async () => {
  await router.isReady()
  routerReady.value = true
})
</script>

<style scoped>
:root {
  --primary-bg: #797be2;
  --menu-bg: #b2b2d6;
  --content-bg: #f5f5f5;
}

.app-container {
  height: 100vh;
  overflow: hidden;
}

.main-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.head-bar {
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.layout-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: var(--primary-bg);
}

.menu-bar {
  width: 170px;
  flex-shrink: 0;
  background-color: var(--menu-bg);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  padding-top: 32px;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: var(--content-bg);
}
</style>
