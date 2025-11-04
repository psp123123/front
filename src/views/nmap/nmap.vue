<template>
    <div class="nmap-container">
        <!-- logo图片 -->
        <div class="logo-container">
            <img src="@/assets/nmap.png" alt="nmap" />
        </div>

        <!-- 顶部装饰条 -->
        <div class="top-bar"></div>

        <!-- 主体内容 -->
        <div class="main-content">
            <el-card class="nmap-card">
                <!-- 卡片头部 -->
                <template #header>
                    <div class="card-header">
                        <span>Nmap 扫描</span>
                    </div>
                </template>

                <!-- 卡片内容 -->
                <div class="card-content">
                    <div class="form-group">
                        <!-- 输入框 -->
                        <el-input v-model="textarea2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入主机地址" class="nmap-input" />

                        <!-- 单选按钮组 -->
                        <el-radio-group v-model="radio1" class="radio-group">
                            <el-radio value="-sS">TCP SYN 扫描 (-sS)</el-radio>
                            <el-radio value="-sT">TCP Connect 扫描 (-sT)</el-radio>
                            <el-radio value="-sU">UDP 扫描 (-sU)</el-radio>
                            <el-radio value="-A">服务/系统检测 (-A)</el-radio>
                        </el-radio-group>
                    </div>

                    <!-- 底部按钮 -->
                    <div class="bottom-button">
                        <el-button v-if="!nmapPinia.isLoading" type="success" size="large" class="submit-btn"
                            @click="nmapVerify">
                            确定
                        </el-button>
                        <Loading v-else label="扫描中..." class="loading-container" />


                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, ElSubMenu } from 'element-plus'
import { onUnmounted, onMounted, ref } from 'vue'
import { useWebSocketStore } from '@/stores/modules/websocket'
import type { WSMessage } from '@/stores/modules/websocket'
// 引入user相关的pinia存储
import useConfigStore from '@/stores/modules/config'

const userConfig = useConfigStore()
const wsStore = useWebSocketStore()
// 引入pinia存储库
import { useNmapStore } from './nmap'

const nmapPinia = useNmapStore()

const textarea2 = ref('')
const radio1 = ref('-sS')


const protocol = import.meta.env.VITE_WS_PROTOCOL
const host = import.meta.env.VITE_WS_HOST
const port = import.meta.env.VITE_WS_PORT
const path = '/api/nmap'

// 构建 WebSocket 地址
const wsUrl = `${protocol}://${host}:${port}${path}`

// 页面加载时初始化 WebSocket
onMounted(() => {
    wsStore.connect({
        url: wsUrl,
        user: userConfig.userInfo?.username,
        token: userConfig.userInfo?.accessToken
    })
})

onUnmounted(() => {
    wsStore.disconnect()
})

const nmapVerify = () => {
    if (!textarea2.value.trim()) {
        ElMessage.error('主机数据为空')
        return
    }

    const payload = JSON.stringify({
        host: textarea2.value,
        scanType: radio1.value
    })

    const msg: WSMessage = { type: 'chat', payload }
    wsStore.sendMessage(msg)

}

</script>

<style scoped lang="scss">
/* ======================
   容器样式
====================== */
.nmap-container {
    display: flex;
    flex-direction: column;
    height: 87vh;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.logo-container {
    flex-shrink: 0;
    padding: 10px;

    img {
        width: 100px;
        height: 50px;
        object-fit: contain;
    }
}

.top-bar {
    flex-shrink: 0;
    height: 5px;
    background-color: rgb(176, 240, 219);
    margin-bottom: 10px;
}

.main-content {
    flex: 1;
    display: flex;
    overflow: hidden;
    padding: 0 16px;
}

/* ======================
   卡片样式
====================== */
.nmap-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    :deep(.el-card__header) {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
    }

    :deep(.el-card__body) {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0;
    }
}

.card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    overflow-y: auto;
}

/* ======================
   表单布局样式
====================== */
.form-group {
    display: flex;
    gap: 32px;
    align-items: flex-start;
    margin-bottom: 20px;
}

.nmap-input {
    width: 250px;
    flex-shrink: 0;

    :deep(.el-textarea__inner) {
        min-height: 80px;
        resize: vertical;
    }
}

/* 单选按钮组样式（合并重复定义） */
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 4px 0;
    flex: 1;
    align-items: flex-start;
    /* 单选组整体左对齐 */
}

/* 单选框穿透样式（合并重复定义） */
:deep(.el-radio) {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 2px 0;
    height: 24px;
    width: 100%;
    /* 单选项占满父容器宽度，确保对齐 */
}

:deep(.el-radio__input) {
    vertical-align: middle;
    margin-top: -1px;
    margin-right: 8px;
    /* 图标与文字的水平间距 */
}

:deep(.el-radio__label) {
    vertical-align: middle;
    margin-left: 0;
    /* 清除原有左边距 */
    line-height: 1;
}

/* ======================
   底部按钮样式
====================== */
.bottom-button {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.submit-btn {
    width: 250px;
    height: 44px;
}

.loading-container {
    width: 250px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>