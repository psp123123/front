<template>

    <el-button type="success" loading :class="['base-loading-btn', customClass]" :style="customStyle">
        <template #loading>
            <div class="custom-loading">
                <svg class="circular" viewBox="-10, -10, 50, 50">
                    <path class="path" d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)" />
                </svg>
            </div>
        </template>

        {{ label }}
    </el-button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

// 定义Props：接收外部传入的样式、类名、文字（不破坏原有逻辑）
const props = defineProps({
    /** 外部传入的内联样式（如宽度、高度、颜色等） */
    customStyle: {
        type: Object,
        default: () => ({})  // 默认空对象，不影响原有样式
    },
    /** 外部传入的自定义类名（用于复杂样式定制） */
    customClass: {
        type: String,
        default: ''
    },
    /** 按钮文字（默认"Loading"，支持自定义） */
    label: {
        type: String,
        default: 'Loading'
    }
})
</script>

<style scoped>
/* 基础样式：保留原有动画逻辑，移除固定尺寸（由外部控制） */
/* .base-loading-btn {
    /* 不写固定width/height，完全交给外部传入 */
/* } */


/* 穿透Element Plus按钮，确保loading动画样式生效 */
:deep(.custom-loading .circular) {
    margin-right: 6px;
    width: 18px;
    height: 18px;
    animation: loading-rotate 2s linear infinite;
}

:deep(.custom-loading .circular .path) {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: var(--el-button-text-color);
    /* 继承按钮文字颜色，支持外部修改 */
    stroke-linecap: round;
}

/* 动画关键帧（保留原有逻辑） */
@keyframes loading-rotate {
    to {
        transform: rotate(360deg);
    }
}

@keyframes loading-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
    }

    to {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
    }
}
</style>