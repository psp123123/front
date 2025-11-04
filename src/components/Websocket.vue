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
                        <ul class="message-list">
                            <li v-for="(msg, idx) in messages" :key="idx" class="message-item">{{ msg }}</li>
                        </ul>
                    </div>
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
.websocket-container {
    position: relative;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    background-color: blueviolet;
    display: flex;
}

.websocket-row {
    flex: 1;
    display: flex;
}

.websocket-col {
    flex: 1;
    display: flex;
}

.websocket-card {
    flex: 1;
    display: flex;
    flex-direction: column;
}

/* 卡片头部样式 */
.card-header {
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
}

/* 卡片内容区域 - 关键样式 */
.card-content {
    flex: 1;
    overflow: hidden;
    /* 隐藏内部元素的溢出 */
    display: flex;
    flex-direction: column;
}

/* 消息列表容器 */
.message-list {
    flex: 1;
    overflow-y: auto;
    /* 启用垂直滚动 */
    margin: 0;
    padding: 8px;
    list-style: none;
    max-height: 100%;
    /* 确保不会超出父容器 */
}

/* 单个消息项 */
.message-item {
    padding: 4px 8px;
    margin-bottom: 4px;
    background: #f8f9fa;
    border-radius: 4px;
    border-left: 3px solid #409eff;
    word-break: break-all;
    /* 长文本自动换行 */
}

/* 自定义滚动条样式 */
.message-list::-webkit-scrollbar {
    width: 6px;
}

.message-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.message-list::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.message-list::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

/* Element Plus 样式覆盖 */
:deep(.el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 !important;
    /* 移除内边距，在 message-list 中控制 */
}

:deep(.el-card__header) {
    min-height: 0 !important;
    height: auto !important;
    padding: 4px 8px !important;
    border-bottom: 1px solid #ebeef5;
}
</style>