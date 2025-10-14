<template>
    <div>
        <!-- 组件内容 -->
        <svg>
            <use :href="prefix + name"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: "#icon-"
    },
    name: String
})
</script>

<style scoped>
/* 组件样式 */
</style>