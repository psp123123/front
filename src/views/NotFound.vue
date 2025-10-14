<template>
  <!-- 全屏容器：确保页面占满视口，内容垂直水平居中 -->
  <div class="not-found-container">
    <!-- 404 核心内容卡片 -->
    <div class="not-found-card">
      <!-- 404 大数字（带动画） -->
      <div class="not-found-code">404</div>

      <!-- 标题与描述 -->
      <h2 class="not-found-title">页面迷路啦</h2>
      <p class="not-found-desc">抱歉，你访问的页面不存在、已删除或暂时无法访问</p>

      <!-- 可能的原因提示（可选） -->
      <ul class="not-found-reasons">
        <li>链接是否输入正确？</li>
        <li>页面是否已被移除？</li>
        <li>网络连接是否正常？</li>
      </ul>

      <!-- 返回首页按钮（带交互） -->
      <button class="not-found-back-btn" @click="handleBackHome">返回首页</button>
    </div>
  </div>
</template>

<script setup>
// 引入 Vue Router 实现页面跳转（若项目使用路由）
import { useRouter } from 'vue-router'

const router = useRouter()

// 点击返回首页：跳转到根路由（可根据项目路由配置调整）
const handleBackHome = () => {
  router.push('/')
}

// 可选：若项目无路由，可替换为刷新页面或跳转外部链接
// const handleBackHome = () => {
//   window.location.href = '/' // 刷新当前域名根路径
//   // 或 window.open('https://你的首页地址', '_self')
// }
</script>

<style scoped>
/* 全屏容器：flex 布局实现垂直水平居中，背景浅灰避免单调 */
.not-found-container {
  width: 100%;
  min-height: 100vh; /* 占满视口高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f8f9fa;
}

/* 内容卡片：白色背景+阴影，增强层次感，限制最大宽度适配桌面端 */
.not-found-card {
  width: 100%;
  max-width: 480px;
  padding: 40px 30px;
  text-align: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease; /* 卡片hover上浮动画 */
}

/* 卡片hover效果：轻微上浮+阴影加深 */
.not-found-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* 404 大数字：突出显示，字体加粗+渐变色 */
.not-found-code {
  font-size: 80px;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #4361ee, #3a0ca3); /* 渐变色文字 */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* 数字加载动画：从透明到显示 */
  animation: fadeInCode 0.8s ease forwards;
  opacity: 0;
  transform: scale(0.8);
}

/* 标题样式：清晰醒目 */
.not-found-title {
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
  animation: fadeIn 1s ease forwards 0.2s; /* 延迟0.2s加载 */
  opacity: 0;
}

/* 描述文本：灰色调，提升可读性 */
.not-found-desc {
  font-size: 16px;
  color: #718096;
  line-height: 1.5;
  margin-bottom: 24px;
  animation: fadeIn 1s ease forwards 0.4s;
  opacity: 0;
}

/* 可能原因列表：小图标引导，灰色文本 */
.not-found-reasons {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
  font-size: 14px;
  color: #718096;
  animation: fadeIn 1s ease forwards 0.6s;
  opacity: 0;
}

.not-found-reasons li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 列表项前的小圆点（原生CSS实现） */
.not-found-reasons li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #a0aec0;
  margin-right: 8px;
}

/* 返回首页按钮：蓝色主色调，hover变色+缩放 */
.not-found-back-btn {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background-color: #4361ee;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeIn 1s ease forwards 0.8s;
  opacity: 0;
}

/* 按钮交互效果 */
.not-found-back-btn:hover {
  background-color: #3a0ca3;
  transform: scale(1.05);
}

.not-found-back-btn:active {
  transform: scale(0.98); /* 点击时轻微收缩 */
}

/* 动画定义：淡入+轻微上移 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 404数字专属动画：缩放+淡入 */
@keyframes fadeInCode {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式适配：移动端调整字体和内边距 */
@media (max-width: 480px) {
  .not-found-code {
    font-size: 64px;
  }

  .not-found-title {
    font-size: 20px;
  }

  .not-found-desc {
    font-size: 14px;
  }

  .not-found-back-btn {
    padding: 10px 24px;
    font-size: 14px;
  }
}
</style>
