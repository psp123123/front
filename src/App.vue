<template>
  <div v-show="routerReady">
    <!-- 登录页或隐藏布局 -->
    <router-view v-if="shouldHideLayout" />

    <!-- 主布局通过 MainLayout 渲染 -->
    <router-view v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const routerReady = ref(false)

// 隐藏布局的页面，如登录页
const shouldHideLayout = computed(() => route.meta.hideLayout === true)

onMounted(async () => {
  await router.isReady()
  routerReady.value = true
})
</script>
