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
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useWebSocketStore } from '@/stores/modules/websocket'
import useConfigStore from '@/stores/modules/config'

// stores
const wsStore = useWebSocketStore()
const useConfig = useConfigStore()

// reactive refs
const consoleRef = ref<HTMLElement | null>(null)
const isCollapsed = computed(() => useConfig.isCollapsed)
const messages = computed(() => wsStore.messages) // 假定 store 中 messages 是一个可变数组

// ------- 消息解析 / 格式化工具 ------- //
const tryParseJSON = (maybeJson: any) => {
    if (typeof maybeJson !== 'string') return { ok: false, data: maybeJson }
    try {
        return { ok: true, data: JSON.parse(maybeJson) }
    } catch (e) {
        return { ok: false, data: maybeJson }
    }
}

/**
 * formatMessage：把后端可能的三种形式（string | JSON-string | object）统一格式化为展示文本
 * 支持类型：
 * - plain text: "Starting Nmap ..."
 * - JSON object: { type: 'stream', stream:'stdout', line:'...' }
 * - JSON wrapper where payload is a stringified JSON: { type:'hacktool', payload: "{\"host\":\"...\"}" }
 */
const formatMessage = (msg: any) => {
    if (msg === null || msg === undefined) return ''

    // 如果是字符串，尝试把它解析为 JSON，如果能解析递归处理，否则当普通行处理
    if (typeof msg === 'string') {
        const parsed = tryParseJSON(msg)
        if (parsed.ok) return formatMessage(parsed.data)
        return msg
    }

    // 如果是对象
    if (typeof msg === 'object') {
        // 常见流式输出
        if (msg.type === 'stream' && (msg.line !== undefined || msg.data !== undefined)) {
            const line = msg.line ?? msg.data ?? ''
            const stream = msg.stream ?? 'stdout'
            return `[${stream}] ${line}`
        }

        // 你的 hacktool 请求那种形式：payload 可能是 string，也可能是 object
        if (msg.type === 'hacktool' || msg.type === 'exec' || msg.type === 'task') {
            const p = msg.payload
            if (typeof p === 'string') {
                const parsedPayload = tryParseJSON(p)
                if (parsedPayload.ok && typeof parsedPayload.data === 'object') {
                    const pd = parsedPayload.data
                    // 根据字段显示更友好
                    return `Task ${msg.type}: host=${pd.host ?? '-'} scanType=${pd.scanType ?? '-'}`
                }
                return `Task ${msg.type}: ${p}`
            } else if (typeof p === 'object' && p !== null) {
                return `Task ${msg.type}: host=${p.host ?? '-'} scanType=${p.scanType ?? '-'}`
            } else {
                return `Task ${msg.type}: ${JSON.stringify(msg)}`
            }
        }

        // 最终结果类型
        if (msg.type === 'result' || msg.status) {
            try {
                return `Result: ${JSON.stringify(msg)}`
            } catch {
                return String(msg)
            }
        }

        // 如果对象里有 line 字段（后端可能直接发 {line:"..."}）
        if (msg.line) {
            return msg.line
        }

        // 兜底：把对象序列化为较短 JSON
        try {
            return JSON.stringify(msg)
        } catch (e) {
            return String(msg)
        }
    }

    // 兜底返回
    return String(msg)
}

// ------- 滚动逻辑 ------- //
const scrollToBottom = () => {
    if (!consoleRef.value || isCollapsed.value) return
    requestAnimationFrame(() => {
        const container = consoleRef.value
        if (!container) return
        // 平滑滚动到底部
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        })
    })
}

// 在消息变更时滚动到底部（deep: true）
watch(
    messages,
    async () => {
        // 等 DOM 更新完成
        await nextTick()
        if (!isCollapsed.value) {
            // 小延迟，保证行内高度稳定后再滚
            setTimeout(() => scrollToBottom(), 40)
        }
    },
    { deep: true, immediate: true }
)

// 当折叠状态切换为展开时也滚到底
watch(
    () => isCollapsed.value,
    (collapsed) => {
        if (!collapsed) {
            nextTick(() => setTimeout(scrollToBottom, 30))
        }
    }
)

// onMounted 初次滚动
onMounted(() => {
    nextTick(() => setTimeout(scrollToBottom, 50))
})
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