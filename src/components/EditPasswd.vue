<!-- src/components/ChangePassword.vue -->
<template>
  <div class="password-container">
    <h2>修改密码</h2>
    <form @submit.prevent="handleSubmit" class="password-form">
      <div class="form-group">
        <label for="currentPassword">当前密码</label>
        <input
          id="currentPassword"
          v-model="formData.currentPassword"
          type="password"
          placeholder="请输入当前密码"
          required
        />
      </div>

      <div class="form-group">
        <label for="newPassword">新密码</label>
        <input
          id="newPassword"
          v-model="formData.newPassword"
          type="password"
          placeholder="至少8位，包含字母和数字"
          required
        />
        <small class="hint">密码需包含字母和数字，至少8位。</small>
      </div>

      <div class="form-group">
        <label for="confirmPassword">确认新密码</label>
        <input
          id="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
          required
        />
        <small class="hint" :class="{ error: passwordMismatch }">
          {{ passwordMismatch ? '两次密码不一致' : '' }}
        </small>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="passwordMismatch || !isValidPassword">
          保存更改
        </button>
        <button type="button" class="btn-secondary" @click="resetForm">重置</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const passwordMismatch = computed(() => {
  return (
    formData.value.newPassword !== formData.value.confirmPassword &&
    formData.value.confirmPassword !== ''
  )
})

const isValidPassword = computed(() => {
  const pwd = formData.value.newPassword
  return pwd.length >= 8 && /[a-zA-Z]/.test(pwd) && /\d/.test(pwd)
})

const handleSubmit = () => {
  if (passwordMismatch.value || !isValidPassword.value) return

  alert('密码已更新！\n新密码：' + formData.value.newPassword)
  resetForm()
}

const resetForm = () => {
  formData.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}
</script>

<style scoped>
.password-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.password-container h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-weight: 500;
}

.password-form .form-group {
  margin-bottom: 20px;
}

.password-form label {
  display: block;
  margin-bottom: 6px;
  color: #555;
  font-weight: 600;
  font-size: 14px;
}

.password-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.password-form input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.hint {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #777;
}

.hint.error {
  color: #e74c3c;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 30px;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3a7bd5;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #555;
  border: 1px solid #ddd;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>
