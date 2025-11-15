import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export interface WSOptions {
  url: string
  user?: string
  token?: string
  tool: string
  heartbeatInterval?: number
  reconnectInterval?: number
}

export interface WSMessage {
  type?: string
  [key: string]: any
}

export const useWebSocketStore = defineStore('websocket', () => {
  // 定义ws变量，为WebSocket类型
  const ws = ref<WebSocket | null>(null)
  const messages: Ref<WSMessage[]> = ref([])
  const isConnected: Ref<boolean> = ref(false)

  const reconnectTimer: Ref<number | null> = ref(null)
  const heartbeatTimer: Ref<number | null> = ref(null)
  const sendQueue: Ref<WSMessage[]> = ref([])

  const defaultOptions: Partial<WSOptions> = {
    heartbeatInterval: 30000,
    reconnectInterval: 5000,
  }

  const connect = (options: WSOptions) => {
    const opts: WSOptions = { ...defaultOptions, ...options }
    if (!opts.url) throw new Error('WebSocket URL is required')

    // 使用 URL 对象安全拼接 query 参数
    const url = new URL(opts.url, window.location.origin)
    if (opts.tool) url.searchParams.set('tool', opts.tool)
    if (opts.user) url.searchParams.set('user', opts.user)
    if (opts.token) url.searchParams.set('token', opts.token)

    console.log('[WebSocket] connecting to', url.toString())

    ws.value = new WebSocket(url.toString())

    ws.value.onopen = () => {
      console.log('[WebSocket] connected')
      isConnected.value = true

      // 发送缓存消息
      while (sendQueue.value.length > 0) {
        const msg = sendQueue.value.shift()
        if (msg) sendMessage(msg)
      }

      // 启动心跳
      heartbeatTimer.value = setInterval(() => {
        if (ws.value && ws.value.readyState === WebSocket.OPEN) {
          ws.value.send(JSON.stringify({ type: 'ping' }))
        }
      }, opts.heartbeatInterval)
    }

    ws.value.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        messages.value.push(data)
      } catch {
        messages.value.push({ data: event.data })
      }
    }

    ws.value.onerror = (err) => {
      console.error('[WebSocket] error', err)
    }

    ws.value.onclose = () => {
      console.log('[WebSocket] disconnected')
      isConnected.value = false

      if (heartbeatTimer.value) clearInterval(heartbeatTimer.value)
      heartbeatTimer.value = null

      // 自动重连
      // reconnectTimer.value = window.setTimeout(() => {
      //   connect(opts)
      // }, opts.reconnectInterval)
    }
  }

  const disconnect = () => {
    if (heartbeatTimer.value) clearInterval(heartbeatTimer.value)
    if (reconnectTimer.value) clearTimeout(reconnectTimer.value)
    if (ws.value) ws.value.close()
    ws.value = null
    isConnected.value = false
    sendQueue.value = []
  }

  const sendMessage = (msg: WSMessage | string) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } else {
      sendQueue.value.push(typeof msg === 'string' ? { data: msg } : msg)
      console.warn('[WebSocket] socket not open, message queued')
    }
  }

  return { ws, messages, isConnected, connect, disconnect, sendMessage }
})
