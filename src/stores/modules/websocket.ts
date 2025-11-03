// stores/websocket.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export interface WSOptions {
  url: string
  user?: string
  token?: string
  heartbeatInterval?: number
  reconnectInterval?: number
  headers?: Record<string, string>
}

export interface WSMessage {
  type?: string
  [key: string]: any
}

export const useWebSocketStore = defineStore('websocket', () => {
  const ws: Ref<WebSocket | null> = ref(null)
  const messages: Ref<WSMessage[]> = ref([])
  const isConnected: Ref<boolean> = ref(false)

  const reconnectTimer: Ref<number | null> = ref(null)
  const heartbeatTimer: Ref<number | null> = ref(null)
  const sendQueue: Ref<WSMessage[]> = ref([]) // 断线消息缓存

  const defaultOptions: Partial<WSOptions> = {
    heartbeatInterval: 30000,
    reconnectInterval: 5000,
  }

  const connect = (options: WSOptions) => {
    const opts: WSOptions = { ...defaultOptions, ...options }

    if (!opts.url) throw new Error('WebSocket URL is required')

    // 构造带认证信息的 URL (query)
    let wsUrl = opts.url
    if (opts.user || opts.token) {
      const query = new URLSearchParams()
      if (opts.user) query.append('user', opts.user)
      if (opts.token) query.append('token', opts.token)
      wsUrl += `?${query.toString()}`
    }

    ws.value = new WebSocket(wsUrl)

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

      // 清理心跳
      if (heartbeatTimer.value) clearInterval(heartbeatTimer.value)
      heartbeatTimer.value = null

      // 自动重连
      reconnectTimer.value = setTimeout(() => {
        connect(opts)
      }, opts.reconnectInterval)
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
      // 缓存消息，等待重连
      sendQueue.value.push(typeof msg === 'string' ? { data: msg } : msg)
      console.warn('[WebSocket] socket not open, message queued')
    }
  }

  return { ws, messages, isConnected, connect, disconnect, sendMessage }
})
