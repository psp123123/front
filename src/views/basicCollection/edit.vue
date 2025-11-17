<template>
    <el-dialog v-model="isVisible" title="URL注入点配置" width="500px" @close="handleClose">
        <!-- 表单 -->
        <el-form :model="form" label-width="80px">
            <el-form-item label="URL">
                <el-input v-model="form.url" placeholder="输入检测URL" />
            </el-form-item>

            <el-form-item label="注入点类型">
                <el-select v-model="form.injectionType" placeholder="选择类型">
                    <el-option label="查询参数注入" value="query" />
                    <el-option label="路径参数注入" value="path" />
                    <el-option label="主机头注入" value="host" />
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确认提交</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    modelValue: boolean;
    defaultData?: { url: string; injectionType: string };
}>();

const emit = defineEmits(["update:modelValue", "confirm"]);

// 内部弹窗显示状态（一定要自己创建，不能直接用 modelValue）
const isVisible = ref(false);

// 表单数据
const form = ref({
    url: "",
    injectionType: "",
});

// =========================
// 1. 监听父组件 modelValue
// =========================
watch(
    () => props.modelValue,
    (val) => {
        isVisible.value = val;

        // 打开时初始化数据
        if (val && props.defaultData) {
            form.value = { ...props.defaultData };
        }
    },
    { immediate: true }
);

// =========================
// 2. 关闭弹窗
// =========================
const handleClose = () => {
    emit("update:modelValue", false);
};

// =========================
// 3. 取消按钮
// =========================
const handleCancel = () => {
    emit("update:modelValue", false);
};

// =========================
// 4. 提交按钮
// =========================
const handleConfirm = () => {
    emit("confirm", form.value); // 把数据传回父组件
    emit("update:modelValue", false); // 关闭弹窗
};
</script>
