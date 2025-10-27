<template>
  <template v-for="item in routeList.menuList" :index="item.path">
    <el-menu-item v-if="!item.children" :index="item.path">
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>

    </el-menu-item>
    <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path">
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>

    </el-menu-item>
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        {{ item.meta.title }}
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>

  </template>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue';

const routeList = defineProps(['menuList'])


</script>

<script lang="ts">
// 递归自己的pinia数据
export default {
  name: 'Menu',
}
</script>

<style scoped>
.menu-bar {
  width: 2000px;
  min-height: 80vh;
  background: linear-gradient(to bottom, #797be2 0%, #7c7b9c 100%);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  border-top-right-radius: 16px;
}

.menu {
  width: 100%;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu-item {
  width: 90%;
  margin: 8px auto;
  padding: 12px 0;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.menu-item:hover {
  background: #fff;
  color: #797be2;
}
</style>
