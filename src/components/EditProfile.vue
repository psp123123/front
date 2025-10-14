<!-- src/components/EditProfile.vue -->
<template>
  <div class="profile-container">
    <h2>编辑个人信息</h2>
    <form @submit.prevent="handleSubmit" class="profile-form">
      <div class="form-group">
        <label for="name">姓名</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="请输入您的姓名"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">邮箱</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="请输入您的邮箱"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone">电话</label>
        <input id="phone" v-model="formData.phone" type="tel" placeholder="请输入您的电话" />
      </div>

      <div class="form-group">
        <label for="bio">个人简介</label>
        <textarea id="bio" v-model="formData.bio" rows="4" placeholder="简单介绍自己..."></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">保存更改</button>
        <button type="button" class="btn-secondary" @click="resetForm">重置</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  bio: '',
})

// 模拟从 API 加载当前用户数据
const loadUserData = () => {
  // 假设这是从后端获取的数据
  formData.value = {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    bio: '热爱前端开发，喜欢探索新技术。',
  }
}

// 初始化加载
loadUserData()

const handleSubmit = () => {
  alert('个人信息已保存！\n' + JSON.stringify(formData.value, null, 2))
}

const resetForm = () => {
  loadUserData()
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-container h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-weight: 500;
}

.profile-form .form-group {
  margin-bottom: 20px;
}

.profile-form label {
  display: block;
  margin-bottom: 6px;
  color: #555;
  font-weight: 600;
  font-size: 14px;
}

.profile-form input,
.profile-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.profile-form input:focus,
.profile-form textarea:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.profile-form textarea {
  resize: vertical;
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

.btn-primary:hover {
  background-color: #3a7bd5;
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
