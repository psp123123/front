<template>
    <div class="console-container" :class="{ collapsed: isCollapsed }">
        <div class="console-layout">
            <div class="console-header" @click="useConfig.toggle">
                <span class="header-title">Console</span>
                <span class="collapse-icon">
                    {{ isCollapsed ? '▼' : '▲' }}
                </span>
            </div>
            <div class="console-content" :class="{ collapsed: isCollapsed }">
                <div class="console-context" ref="consoleRef">
                    <div v-for="(msg, idx) in messages" :key="idx" class="message-line">
                        <span class="message-content">{{ formatMessage(msg) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useWebSocketStore } from '@/stores/modules/websocket'
import useConfigStore from '@/stores/modules/config'

const wsStore = useWebSocketStore()
const messages = computed(() => wsStore.messages)
const useConfig = useConfigStore()
const consoleRef = ref<HTMLElement | null>(null)

// 使用 computed 确保响应式
const isCollapsed = computed(() => useConfig.isCollapsed)

// 格式化消息内容
const formatMessage = (msg: any) => {
    if (msg.type === 'chat' && msg.payload) {
        try {
            // 尝试解析 payload 中的 JSON
            const payload = JSON.parse(msg.payload)
            return `Host: ${payload.host}, Scan Type: ${payload.scanType}`
        } catch (e) {
            // 如果解析失败，返回原始 payload
            return msg.payload
        }
    } else if (msg.type === 'ping') {
        return 'Ping received'
    } else {
        // 对于其他类型的消息，返回类型信息
        return `Message type: ${msg.type}`
    }
}

// 修改 scrollToBottom 函数，使其更直接可靠
const scrollToBottom = () => {
    if (!consoleRef.value || isCollapsed.value) return;

    const container = consoleRef.value;
    // 直接设置滚动位置，使用 scrollHeight - clientHeight 确保滚动到底部
    container.scrollTop = container.scrollHeight - container.clientHeight;
};

// 修改监听器，增加更多确保DOM更新的机制
watch(
    messages,
    async (newMessages, oldMessages) => {
        if (newMessages.length > (oldMessages?.length || 0)) {
            // 如果用户在底部附近，自动滚动
            if (isUserNearBottom()) {
                // 使用双重nextTick确保DOM已完全更新
                await nextTick();
                await nextTick();
                scrollToBottom();
            }
        }
    },
    { deep: true }
);
const isUserNearBottom = () => {
    if (!consoleRef.value) return true;
    const { scrollTop, scrollHeight, clientHeight } = consoleRef.value;
    // 减小阈值，让判断更灵敏
    return scrollHeight - scrollTop - clientHeight < 10;
};

</script>

<style scoped>
.console-container {
    height: 86vh;
    position: relative;
    width: 100%;
    transition: all 0.3s ease;
}

/* 折叠状态下的容器样式 */
.console-container.collapsed {
    height: auto;
    position: absolute;
    top: 0;
    right: 16px;
    width: auto;
    z-index: 1000;
}

.console-layout {
    background-color: #c5ebab;
    height: 100%;
    border: 0px solid #cfe69a;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    color: #d4d4d4;
    transition: all 0.3s ease;
}

/* 折叠状态下的布局样式 */
.console-container.collapsed .console-layout {
    height: auto;
    width: 120px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
}

.console-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background-color: #2d2d30;
    border-bottom: 0px solid #3e3e42;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
}

.console-header:hover {
    background-color: #38383b;
}

/* 折叠状态下的头部样式 */
.console-container.collapsed .console-header {
    border-radius: 4px;
    padding: 8px;
    min-width: 120px;
}

.header-title {
    font-weight: 600;
    font-size: 14px;
    color: #cccccc;
}

.collapse-icon {
    color: #cccccc;
    font-size: 12px;
    margin-left: 8px;
    transition: transform 0.3s ease;
}

.console-container.collapsed .collapse-icon {
    transform: rotate(180deg);
}

.console-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
}

.console-content.collapsed {
    display: none;
}

.console-context {
    background-color: #e6e9e5;
    margin: 0;
    flex: 1;
    padding: 8px 0;
    overflow-y: auto;
    font-size: 13px;
    line-height: 1.4;
    scrollbar-width: thin;
    scrollbar-color: #c3c5c0 #a5aaa1;
    /* 确保滚动行为是即时的 */
    scroll-behavior: auto;
}

/* Webkit 浏览器滚动条样式 */
.console-context::-webkit-scrollbar {
    width: 8px;
}

.console-context::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.console-context::-webkit-scrollbar-thumb {
    background-color: #c3c5c0;
    border-radius: 4px;
}

.console-context::-webkit-scrollbar-thumb:hover {
    background-color: #a5aaa1;
}

.message-line {
    display: flex;
    padding: 2px 12px;
    word-break: break-all;
    white-space: pre-wrap;
    border-left: 2px solid transparent;
    transition: background-color 0.1s;
}

.message-line:hover {
    background-color: #d8dbd7;
}

.timestamp {
    color: #6a9955;
    font-size: 12px;
    margin-right: 8px;
    flex-shrink: 0;
    min-width: 70px;
}

.message-content {
    flex: 1;
    overflow-wrap: break-word;
    color: #333;
}

.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #6a737d;
    font-style: italic;
}
</style>