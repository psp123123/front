<template>
  <div v-if="routerReady" class="app-container">
    <router-view v-if="shouldHideLayout" />

    <div v-else class="main-layout">
      <HeadBar class="head-bar" />

      <div class="layout-content">
        <el-menu class="menu-bar">
          <MenuBar :menuList="useConfig.menuList"></MenuBar>
        </el-menu>
        <div class="content-area">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeadBar from './components/HeadBar.vue'
import MenuBar from './components/MenuBar.vue'

// 引入路由的pinia数据
import useConfigStore from './stores/modules/config'
const useConfig = useConfigStore()

const route = useRoute()
const router = useRouter()

const routerReady = ref(false)
const shouldHideLayout = computed(() => route.meta.hideLayout === true || route.path === '/login')

// const currentMenuBar = computed(() => {
//   return route.path === '/manager' ? UserManageMenuBar : MenuBar
// })

onBeforeMount(async () => {
  await router.isReady()
  routerReady.value = true
})
</script>

<style scoped>
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
  height: 70px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.layout-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  /* width: 3000px; */
  background-color: #797be2;
}

.menu-bar {
  width: 170px;
  flex-shrink: 0;
  background-color: #b2b2d6;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  /* border-top-right-radius: 16px; */
  padding-top: 32px;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #f5f5f5;
}
</style>
