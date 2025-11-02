// store/websocket.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebsocketStore = defineStore('websocket', () => {
  const socket = ref<WebSocket | null>(null)
  const messages = ref<string[]>([])
  const isConnected = ref(false)
  const isLoading = ref(false) // 扫描状态

  // 初始化 WebSocket
  function init(url: string) {
    if (socket.value) return
    socket.value = new WebSocket(url)

    socket.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connected')
    }

    socket.value.onmessage = (event) => {
      messages.value.push(event.data)

      // 假设后端返回“扫描完成”标识
      if (event.data.includes('扫描完成')) {
        isLoading.value = false
      }
    }

    socket.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket closed')
    }

    socket.value.onerror = (err) => {
      console.error('WebSocket error', err)
      isLoading.value = false
    }
  }

  function sendMessage(msg: string) {
    if (socket.value && isConnected.value) {
      socket.value.send(msg)
      isLoading.value = true
    }
  }

  return { socket, messages, isConnected, isLoading, init, sendMessage }
})
