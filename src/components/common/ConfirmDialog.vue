<template>
    <el-dialog v-model="visible" class="slide-dialog" title="Slide Animation Dialog" width="30%"
        :transition="transitionName">
        <p>This dialog uses a <strong>slide-down</strong> enter and <strong>slide-up</strong> leave animation.</p>
        <template #footer>
            <el-button @click="visible = false">Cancel</el-button>
            <el-button type="primary" @click="handleConfirm">
                Confirm
            </el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    modelValue: boolean // 支持 v-model
}>()

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