<template>
  <el-row class="tac">
    <el-menu router active-text-color="#ffd04b" background-color="transparent" class="el-menu-vertical-demo"
      :default-active="$route.path" text-color="#fff">
      <el-menu-item index="/manager/edituser">
        <el-icon><icon-menu /></el-icon>
        <span>UserSet</span>
      </el-menu-item>

      <el-menu-item index="/manager/editpass">
        <el-icon>
          <setting />
        </el-icon>
        <span>Passwd Set</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 可选：与外层容器圆角匹配 */
  /* border-top-right-radius: 16px; */
}

/* 1. 鼠标悬停效果（未选中时） */
::v-deep .el-menu-item:not(.is-active):hover {
  background-color: rgba(255, 255, 255, 0.1);
  /* 半透明白色背景 */
  color: #fff;
  /* 悬停时文本颜色 */
}

/* 2. 选中状态效果（点击后激活） */
::v-deep .el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.2);
  /* 选中时背景色（比hover更深） */
  color: #ffd04b;
  /* 选中时文本颜色（与active-text-color保持一致） */
  /* 可选：添加右侧高亮边框作为选中标识 */
  border-right: 3px solid #ffd04b;
}

/* 3. 优化图标与文字的间距（可选） */
::v-deep .el-menu-item .el-icon {
  margin-right: 8px;
  /* 图标与文字的距离 */
}

::v-deep .el-menu-item:not(.is-active):not(:hover) {
  background-color: transparent !important;
  /* 或者用半透明白色，更柔和 */
  /* background-color: rgba(255, 255, 255, 0.05); */
}
</style>
