<template>
    <div>
        <!-- 组件内容 -->
        Nmap页面
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    title?: string;
}

const props = defineProps<Props>();
const count = ref<number>(0);
</script>

<style scoped>
/* 组件样式 */
</style>