<template>
    <div class="console-layout"> <button class="console-header">console</button>
        <div class="console-context">
            <li v-for="(msg, idx) in messages" :key="idx">{{ msg }}</li>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useWebSocketStore } from '@/stores/modules/websocket'

const wsStore = useWebSocketStore()
const messages = computed(() => wsStore.messages)
</script>
<style scoped>
.console-header {
    margin: 5px;
    border: 10px rgb(199, 194, 194);
    border-radius: 1%;
    align-self: flex-start;
}

.console-layout {
    background-color: rgb(238, 247, 244);
    height: 86vh;
    border: 1px solid antiquewhite;
    border-radius: 1%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease;
    /* 阴影过渡 */
}

.console-layout:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    /* 鼠标悬停时更明显的阴影 */
}

.console-context {
    background-color: rgb(229, 233, 227);
    margin: 0px 6px 6px 6px;
    flex: 1;
    border-radius: 1%;
    /* border-style: solid; */
    padding: 5px;
    overflow-y: auto;
    font-size: small;
}
</style>
