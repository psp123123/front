// composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket(url: string) {
  const socket = ref<WebSocket | null>(null)
  const messages = ref<string[]>([]) // 接收到的消息列表
  const isConnected = ref(false)

  // 发送消息
  const sendMessage = (msg: string) => {
    if (socket.value && isConnected.value) {
      socket.value.send(msg)
    } else {
      console.warn('WebSocket 未连接，无法发送消息')
    }
  }

  const connect = () => {
    socket.value = new WebSocket(url)

    socket.value.onopen = () => {
      console.log('WebSocket 已连接')
      isConnected.value = true
    }

    socket.value.onmessage = (event) => {
      console.log('收到消息:', event.data)
      messages.value.push(event.data)
    }

    socket.value.onclose = (event) => {
      console.log('WebSocket 关闭', event)
      isConnected.value = false
      // 可以选择断线重连
      setTimeout(() => connect(), 3000)
    }

    socket.value.onerror = (err) => {
      console.error('WebSocket 出错', err)
      socket.value?.close()
    }
  }

  onUnmounted(() => {
    socket.value?.close()
  })

  return {
    socket,
    messages,
    sendMessage,
    isConnected,
  }
}
