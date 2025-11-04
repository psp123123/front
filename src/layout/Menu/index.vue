<template>
    <div class="app-container" v-show="routerReady">
        <!-- 登录页或隐藏布局 -->
        <router-view v-if="shouldHideLayout" />

        <!-- 主布局 -->
        <div v-else class="main-layout">
            <HeadBar class="head-bar" />
            <div class="layout-content">
                <el-menu class="menu-bar" router :default-active="route.path">
                    <MenuBar :menuList="menuListNew" :key="route.path" />
                </el-menu>

                <div class="content-area">
                    <el-row class="content-row">
                        <el-col :span="isWebsocket ? 15 : 24">
                            <div class="main-content">
                                <router-view />
                            </div>
                        </el-col>

                        <el-col :span="9" v-show="isWebsocket">
                            <Websocket />
                        </el-col>
                    </el-row>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import HeadBar from '@/components/HeadBar.vue'
import MenuBar from '@/components/MenuBar.vue'
import useConfigStore from '@/stores/modules/config'
import { constantroutes } from '@/router/route'
import Websocket from '@/components/Websocket.vue'

interface RouteMeta {
    title?: string
    hidden?: boolean
    manager?: boolean
    [key: string]: any
}

interface AppRoute {
    path: string
    name?: string
    component?: any
    redirect?: any
    meta?: RouteMeta
    children?: AppRoute[]
}
const useConfig = useConfigStore()
const route = useRoute()
const router = useRouter()
const routerReady = ref(false)
// 判断是否隐藏布局（登录页或特殊页面）
const shouldHideLayout = computed(() => route.meta.hideLayout === true || route.path === '/login')
// 判断当前路径是否为/manager模式
const isManagerPage = computed(() => route.path.startsWith('/manager'))
// 动态过滤菜单
const menuListNew = computed(() => {
    if (isManagerPage.value) {
        const managerRoute = constantroutes.find(r => r.path === '/manager')
        const parentPath = managerRoute?.path ?? ''
        return (
            managerRoute?.children?.map(c => ({
                ...c,
                // ✅ 手动补上绝对路径
                path: `${parentPath.replace(/\/$/, '')}/${c.path}`
            })) ?? []
        )
    } else {
        return constantroutes
            .filter(r => !r.meta?.manager && !r.meta?.hidden)
            .map(r => {
                if (r.children) {
                    return { ...r, children: r.children.filter(c => !c.meta?.manager && !c.meta?.hidden) }
                }
                return r
            })
    }
})

// 判断websocket组件是否展示
const isWebsocket = computed(() => route.meta?.isWebsocket)

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
    display: flex;
    height: 97vh;
    overflow: hidden;
    flex-direction: column;
}

.main-layout {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
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
    height: 100%;
}

.main-content {
    flex: 1;
    overflow: hidden;
    min-height: 0;
    margin-right: 10px;
}

.content-area {
    flex: 1;
    overflow: hidden;
    padding: 20px;
    background-color: var(--content-bg);
    height: 100%;
    min-height: 0;
    box-sizing: border-box;
}
</style>
