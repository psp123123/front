<template>
    <div>
        <!-- 组件内容 -->
        <svg :width="size" :height="size">
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
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [Number, String],
        default: 20,
    },
})
</script>

<style scoped>
/* 组件样式 */
</style>