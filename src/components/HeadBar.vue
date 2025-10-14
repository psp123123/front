<template>
  <div class="head-bar">
    <div class="container">
      <div class="logo">
        <img
          src="../assets/logo.png"
          alt="FleetPilot Logo"
          class="logo-image"
          @click="redickHome"
        />
      </div>
      <div class="center-section">
        <h1>FleetPilot</h1>
      </div>
      <div class="right-section">
        <User />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import User from './User.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function redickHome() {
  router.push('/home')
}
</script>
<style scoped>
.head-bar {
  width: 100%;
  height: 70px;
  /* background: linear-gradient(to right, #fff 20%, #797be2 50%, #fff 80%); */
  background: linear-gradient(to right, #fff 20%, #babbec 50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  height: 60px;
  width: 100px;
}

.logo-image {
  max-height: 100%;
  max-width: 100%;
}

.center-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
