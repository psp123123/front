<template>
    <div class="websocket-container">
        <el-row class="websocket-row">
            <el-col class="websocket-col">
                <el-card class="websocket-card">
                    <template #header>
                        <div class="card-header">
                            <span>console out</span>
                        </div>
                    </template>
                    <div class="card-content">
                        <li v-for="(msg, idx) in messages" :key="idx">{{ msg }}</li>
                    </div>
                    <!-- <template #footer>Footer content</template> -->
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWebSocketStore } from '@/stores/modules/websocket'

const wsStore = useWebSocketStore()
const messages = computed(() => wsStore.messages)
</script>

<style scoped>
.card-header {
    padding: 4px 8px;
    /* 缩小 padding */
    font-size: 14px;
    /* 可以适当调小字体 */
    font-weight: 500;
    line-height: 1.2;
}

.websocket-panel {
    padding: 16px;
    background: #f5f5f5;
    border-radius: 6px;
    max-height: 500px;
    overflow-y: auto;
}

.websocket-panel ul {
    padding-left: 20px;
}

.websocket-container {
    position: relative;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    /* 移除 padding-bottom 或根据需要调整 */
    /* padding-bottom: 80px; */
    background-color: blueviolet;
    display: flex;
    /* 添加flex布局 */
}

.websocket-row {
    flex: 1;
    /* 占据所有可用空间 */
    display: flex;
    /* 确保row也是flex容器 */
}

.websocket-col {
    flex: 1;
    /* col占据所有空间 */
    display: flex;
    /* 确保col也是flex容器 */
}

.websocket-card {
    flex: 1;
    /* 卡片占据所有空间 */
    display: flex;
    flex-direction: column;
}

/* 确保卡片内部使用flex布局 */
:deep(.el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8px;
}

:deep(.el-card__header) {
    min-height: 0 !important;
    /* 消除 Element Plus 的最小高度限制 */
    height: auto !important;
    /* 根据内容自适应高度 */
    padding: 4px 8px !important;
}

.card-content {
    flex: 1;
    overflow-y: auto;
    /* 添加滚动以防内容过多 */
    overflow: hidden;
}
</style>