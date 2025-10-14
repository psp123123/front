<template>
  <el-dialog
    :title="isEdit ? '编辑用户' : '添加用户'"
    v-model="visible"
    width="400px"
    @close="resetForm"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option label="管理员" value="管理员" />
          <el-option label="审核员" value="审核员" />
          <el-option label="普通用户" value="普通用户" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="启用">启用</el-radio>
          <el-radio label="禁用">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  formData: Object,
  isEdit: Boolean,
})

const emit = defineEmits(['update:modelValue', 'submit'])

const visible = ref(false)
watch(
  () => props.modelValue,
  (val) => (visible.value = val),
)
watch(visible, (val) => emit('update:modelValue', val))

const formRef = ref()
const form = ref({ ...props.formData })

const rules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', { ...form.value })
    }
  })
}

const resetForm = () => {
  if (formRef.value) formRef.value.resetFields()
  form.value = { ...props.formData }
}
</script>
