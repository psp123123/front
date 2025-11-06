<template>
    <div class="console-layout" :class="{ collapsed: isCollapsed }">
        <div class="console-header" @click="toggleCollapse">
            <span class="header-title">Console</span>
            <!-- <button class="clear-btn" @click.stop="clearMessages">Clear</button> -->
            <span class="collapse-icon">
                {{ isCollapsed ? '▼' : '▲' }}
            </span>
        </div>
        <div class="console-context" ref="consoleRef" v-show="!isCollapsed">
            <div v-for="(msg, idx) in messages" :key="idx" class="message-line">
                <span class="timestamp" v-if="showTimestamp">{{ formatTimestamp(msg.timestamp) }}</span>
                <span class="message-content">{{ msg.content }}</span>
            </div>
            <div v-if="messages.length === 0" class="empty-state">
                No messages yet
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useWebSocketStore } from '@/stores/modules/websocket'

const wsStore = useWebSocketStore()
const messages = computed(() => wsStore.messages)

const consoleRef = ref<HTMLElement | null>(null)
const showTimestamp = ref(true)
const isCollapsed = ref(false)

// 当 messages 更新时，滚动到底部
watch(messages, async () => {
    await nextTick()
    scrollToBottom()
})

// 滚动到底部
const scrollToBottom = () => {
    if (consoleRef.value && !isCollapsed.value) {
        const container = consoleRef.value
        // 使用requestAnimationFrame确保在浏览器重绘前执行
        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight
        })
    }
}

// 格式化时间戳
const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
}

// 切换折叠状态
const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}

// // 清空消息
// const clearMessages = () => {
//     wsStore.clearMessages()
// }
</script>

<style scoped>
.console-layout {
    background-color: #1e1e1e;
    height: 86vh;
    border: 1px solid #333;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    color: #d4d4d4;
    transition: all 0.3s ease;
    position: relative;
    width: 100%;
}

.console-layout.collapsed {
    height: auto;
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transform-origin: top right;
    transform: scale(0.9);
}

.console-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background-color: #2d2d30;
    border-bottom: 1px solid #3e3e42;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s;
}

.console-header:hover {
    background-color: #38383b;
}

.console-layout.collapsed .console-header {
    border-radius: 4px;
    border-bottom: none;
}

.header-title {
    font-weight: 600;
    font-size: 14px;
    color: #cccccc;
}

.clear-btn {
    background-color: #0e639c;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.clear-btn:hover {
    background-color: #1177bb;
}

.collapse-icon {
    color: #cccccc;
    font-size: 12px;
    margin-left: 8px;
    transition: transform 0.3s ease;
}

.console-layout.collapsed .collapse-icon {
    transform: rotate(180deg);
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
    transition: opacity 0.2s ease;
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