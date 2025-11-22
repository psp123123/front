<template>
    <el-dialog v-model="visible" class="slide-dialog" :title="title" width="30%" :transition="transitionName">
        <p>{{ message }}</p>
        <template #footer>
            <!-- 取消按钮 -->
            <el-button @click="visible = false">{{ cancelText }}</el-button>
            <!-- 确认按钮 -->
            <el-button :type="confirmType" @click="handleConfirm" :loading="confirmLoading">
                {{ confirmText }}
            </el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { ButtonType } from 'element-plus'

const props = withDefaults(defineProps<{
    modelValue: boolean // 支持 v-model
    title: string
    message?: string
    cancelText?: string
    confirmText?: string
    confirmLoading?: boolean
    confirmType?: ButtonType
}>(), {
    message: '请确认',
    cancelText: '取消',
    confirmText: '确认',
    confirmLoading: false,
    confirmType: 'primary'
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm'): void
}>()

// 内部 ref 同步 props
const visible = ref(props.modelValue)

watch(
    () => props.modelValue,
    (val) => {
        visible.value = val
    }
)

watch(visible, (val) => {
    emit('update:modelValue', val)
})

const transitionName = 'dialog-slide'

const handleConfirm = () => {
    emit('confirm')
    visible.value = false
}
</script>

<style scoped>
/* 仅保留 slide 动画 */
.dialog-slide-enter-active,
.dialog-slide-leave-active,
.dialog-slide-enter-active .el-dialog,
.dialog-slide-leave-active .el-dialog {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dialog-slide-enter-from,
.dialog-slide-leave-to {
    opacity: 0;
}

.dialog-slide-enter-from .el-dialog,
.dialog-slide-leave-to .el-dialog {
    transform: translateY(-100px);
    opacity: 0;
}
</style>