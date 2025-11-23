<template>
    <el-dialog v-model="isVisible" title="URL注入点配置" width="500px" @close="handleClose">
        <!-- 表单 -->
        <el-form :model="form" label-width="80px">
            <el-form-item label="URL">
                <el-input v-model="form.url" placeholder="输入检测URL" />
            </el-form-item>

            <el-form-item label="类型">
                <el-select v-model="form.injectionType" placeholder="选择类型">
                    <el-option label="查询参数注入" value="query" />
                    <el-option label="路径参数注入" value="path" />
                    <el-option label="主机头注入" value="host" />
                </el-select>
            </el-form-item>

            <el-form-item label="注入点">
                <el-input v-model="form.injection" placeholder="/xxx/xxx?id=xx"></el-input>
            </el-form-item>

            <el-form-item label="后台地址">
                <el-input v-model="form.managerUrl"></el-input>
            </el-form-item>

            <!-- 关键改动：使用 el-row 和 el-col 将账号和密码包裹起来 -->
            <el-row> <!-- gutter 是列之间的间距 -->
                <el-col :span="12"> <!-- 占 12 份，一行总共 24 份，所以这里是半行 -->
                    <el-form-item label="账号">
                        <el-input v-model="form.managerUser"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12"> <!-- 占 12 份 -->
                    <el-form-item label="密码">
                        <el-input v-model="form.managerPass" show-password></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确认提交</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { UrlItem } from "./basicCollection";
const props = defineProps<{
    modelValue: boolean;
    defaultData?: UrlItem | null

}>();

const emit = defineEmits(["update:modelValue", "confirm"]);

// 内部弹窗显示状态（一定要自己创建，不能直接用 modelValue）
const isVisible = ref(false);

// 表单数据
const form = ref({
    url: '',
    injectionType: '',
    injection: '',
    managerUrl: '',
    managerUser: '',
    managerPass: ''
})

// =========================
// 1. 监听父组件 modelValue
// =========================
watch(
    () => props.modelValue,
    (val) => {
        isVisible.value = val;

        // 打开时初始化数据
        if (val && props.defaultData) {
            form.value = {
                url: props.defaultData.url ?? '',
                injectionType: props.defaultData.injectionType ?? '',
                injection: props.defaultData?.injection ?? '',
                managerUrl: props.defaultData.managerUrl ?? '',
                managerUser: props.defaultData.managerUser ?? '',
                managerPass: props.defaultData.managerPass ?? ''
            };
        } else if (val) {
            // 如果没有默认数据，打开弹窗时清空表单
            form.value = {
                url: '',
                injectionType: '',
                injection: '',
                managerUrl: '',
                managerUser: '',
                managerPass: ''
            };
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
