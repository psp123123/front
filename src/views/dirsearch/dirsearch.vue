<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <img src="@/assets/dirsearch.png" alt="dirsearch" class="header-logo" />
                <!-- 顶部装饰条 -->
                <div class="top-bar"></div>
            </el-header>

            <el-main class="dirsearch-container">
                <el-row :gutter="20" class="dirsearch-main-row">
                    <el-col class=" dirsearch-main-left" :span="8">
                        <!-- Target URL -->
                        <div class="config-item">
                            <span class="label">Target URL</span>
                            <el-input v-model="targetUrl" placeholder="example.com" class="config-input" />
                        </div>
                        <div class="fileExtensions">
                            <span class="label">扩展名</span>
                            <el-select v-model="extensions" multiple filterable allow-create default-first-option
                                style="width: 200px;" :popper-class="'hide-popper'" class="extension-select">
                                <!-- 可选：提供常用扩展名作为建议项 -->
                                <el-option v-for="ext in commonExtensions" :key="ext" :label="ext" :value="ext" />
                            </el-select>
                        </div>

                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="http-method">
                                    <span> Method</span>
                                    <el-dropdown @command="handleMethodChange">
                                        <el-button type="primary" style="width: 70px;">
                                            {{ currentMethod }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                        </el-button>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item command="GET">GET</el-dropdown-item>
                                                <el-dropdown-item command="POST">POST</el-dropdown-item>
                                                <el-dropdown-item command="OPTIONS">OPTIONS</el-dropdown-item>
                                                <el-dropdown-item command="HEAD">HEAD</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </el-col>
                            <el-col :span="12">

                            </el-col>
                        </el-row>

                    </el-col>
                    <el-col class="dirsearch-main-right" :span="16">
                        右侧内容
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const targetUrl = ref('')
const currentMethod = ref('GET')
const handleMethodChange = (command: string) => {
    currentMethod.value = command
}

// 常用提示扩展名
const commonExtensions = ['php', 'html', 'js', 'css', 'xml']
// 默认值
const extensions = ref(['php', 'html', 'js'])

</script>

<style scoped>
.label {
    font-weight: 500;
    white-space: nowrap;
}

.extension-select {
    flex: 1;
    min-width: 0;
}

.hide-popper {
    display: none !important;

}

.fileExtensions {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.http-method {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.target-url,
.target-url-input {
    margin: 5px;
}

.header-logo {
    width: 200px;
    height: 40px;
}

.top-bar {
    flex-shrink: 0;
    height: 5px;
    background-color: rgb(176, 240, 219);
    margin-bottom: 10px;
}

.dirsearch-container {
    height: calc(100vh - 145px);
    background-color: #f5f2ee;

}

.dirsearch-main-row {
    height: 100%;
}

.dirsearch-main-left,
.dirsearch-main-right {
    height: 100%;
    /* 考虑 header + top-bar + margin */
    box-sizing: border-box;
    background-color: #bcd9e6;
    border: 2px solid #f5f2ee;
}
</style>