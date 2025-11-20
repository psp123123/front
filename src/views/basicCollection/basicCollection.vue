<template>
    <div class="top-container">
        <el-header class="header">
            <span>Fleet Pilot</span>
        </el-header>
        <div class="main-container">
            <el-row class="flex-row" :gutter="5">
                <el-col :span="12" class="url-list">
                    <div class="flex flex-wrap gap-4">
                        <el-card class="url-list-card">
                            <!-- url列表 -->
                            <div class="url-list-header">
                                <span>url列表</span>
                                <div>
                                    <el-popover placement="right" title="添加URL" :width="50" trigger="hover">
                                        <template #reference>
                                            <el-button class="!ml-0" @click="openDialog">
                                                <SvgIcon name="add" class="add-icon" />
                                            </el-button>
                                        </template>
                                    </el-popover>

                                </div>

                            </div>
                            <el-table :data="urlList">
                                <el-table-column fixed prop="date" label="Date" width="90" />
                                <el-table-column fixed prop="url" label="url" width="150" />
                                <el-table-column prop="injection" label="注入点" width="120">
                                    <template #default="{ row }">
                                        <el-tooltip placement="top" popper-class="injection-popper" :show-after="200">
                                            <!-- 触发区域：表格只显示第一条 -->
                                            <template #default>
                                                <span class="cell-text">
                                                    {{ row.injection[0] }}{{ row.injection.length > 1 ? ' ...' : '' }}
                                                </span>
                                            </template>
                                            <!-- 悬浮框内容 -->
                                            <template #content>
                                                <div class="tooltip-container">
                                                    <div v-for="(item, index) in row.injection" :key="index"
                                                        class="tooltip-item" @click.stop="copyItem(item)">
                                                        {{ item }}
                                                    </div>
                                                </div>
                                            </template>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed prop="tag" label="Tag" width="50"></el-table-column>

                                <el-table-column fixed="right" label="Operations" min-width="50">
                                    <template #default>
                                        <el-button link type="primary" size="small" @click="handleClick">
                                            Detail
                                        </el-button>
                                        <el-button link type="primary" size="small"
                                            @click="editDialogEvent">Edit</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="12" class="url-info">
                    <el-card class="url-info-card">
                        <template #header>
                            <div class="card-header">
                                <span>{{ currentUrl }}</span>
                            </div>
                        </template>
                        <el-row class="domain-info fill-height" :gutter="10">
                            <!-- Domain Info Card -->
                            <el-col :span="8" class="domain-info-col">
                                <div class="info-card">
                                    <h4 class="info-title">Domain Info</h4>
                                    <el-text class="info-content" type="primary" tag="div">
                                        admin.example.com<br />
                                        api.example.com<br />
                                        dev.example.com<br />
                                        test.example.com<br />
                                        vpn.example.com<br />
                                        mail.example.com<br />
                                        cdn.example.com
                                    </el-text>
                                </div>
                            </el-col>

                            <!-- Port Info Card -->
                            <el-col :span="8">
                                <div class="info-card">
                                    <h4 class="info-title">Port Info</h4>
                                    <el-text class="info-content" type="primary" tag="div">
                                        80 (HTTP)<br />
                                        443 (HTTPS)<br />
                                        22 (SSH)<br />
                                        3306 (MySQL)<br />
                                        6379 (Redis)<br />
                                        27017 (MongoDB)
                                    </el-text>
                                </div>
                            </el-col>

                            <!-- Directory Info Card -->
                            <el-col :span="8">
                                <div class="info-card">
                                    <h4 class="info-title">Directory Info</h4>
                                    <el-text class="info-content" type="primary" tag="div">
                                        /admin/<br />
                                        /api/v1/<br />
                                        /static/<br />
                                        /uploads/<br />
                                        /backup/<br />
                                        /.git/
                                    </el-text>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
    <!-- ========== 新增/编辑弹窗 ========== -->
    <!-- <UrlEditDialog v-model="dialogVisible" :date="editingData" @save="handleSave" @cancel="handleCancel" /> -->
    <EditDialog v-model="customDraggingVisible" />
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
// 弹窗新增组件
import EditDialog from '@/views/basicCollection/edit.vue'
const customDraggingVisible = ref(false)
function openDialog() {
    console.log('尝试打开弹窗')
    customDraggingVisible.value = true

}

// 弹窗编辑组件
function editDialogEvent() {
    console.log('编辑页面打开')
    customDraggingVisible.value = true
}

function copyItem(text: string) {
    navigator.clipboard.writeText(text)
    ElMessage.success('已复制: ' + text)
}

import request from '@/utils/auth'

type UrlItem = {
    id: number
    date: string
    url: string
    injection: string[]
    tag: string
}

// 定义响应式数据urlList
const urlList = ref<UrlItem[]>([])

// 发起获取列表数据请求，请求接口: /tt-api/api/collection/urlget

onMounted(async () => {
    try {

        // 发起get请求
        const urlListData = await request.get('/tt-api/api/collection/urlget')
        console.log("url获取列表成功", urlListData)
    } catch (error) {
        console.error("url 获取列表失败", error);

    }
})
// const urlList = ref<UrlItem[]>([
//     {
//         id: 1,
//         date: '2016-05-03',
//         url: 'xxx.example.com',
//         injection: ['/admin&id=12', '/admin&id=12', '/admin&id=12 '],
//         tag: "url",

//     },
//     {
//         id: 2,
//         date: '2016-05-03',
//         url: 'xxx.example.com',
//         injection: ['/admin&id=12', '/admin&id=12', '/admin&id=12 '],
//         tag: "xss"
//     }
// ])

const currentUrl = ref('xxx.example.com')
function handleClick() {
    console.log('output')
}
</script>

<style scoped>
p {
    margin: 10px;
    padding: 0;
}



.top-container {
    box-sizing: border-box;
    padding: 1px;
    background-color: #f0eeee;
    height: calc(100vh - 90px);

    display: flex;
    flex-direction: column;

}

.header {

    background-color: #7e8c96;
    height: 30px;
    font-size: 20px;
}

.main-container {
    background-color: #dbd7d7;
    height: calc(100% - 20px);
    padding: 10px;
    flex: 1;
    display: flex;
}

.url-list {
    /* background-color: #aaa9a9; */
    /* height: 100px; */
    display: flex;
    flex-direction: column;
    flex: 1;
}

.flex.flex-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    /* 占满父级剩余高度 */
}

.flex-row {
    width: 100%;
}

.url-list-card {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0;
}

.url-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.url-info-card {
    display: flex;
    flex-direction: column;
    flex: 1;

}

.url-info-card :deep(.el-card__header) {
    padding: 12px 16px;

}

.url-info-card :deep(.el-card__body) {
    flex: 1;
    padding: 0;
    display: flex;

}

.domain-info {
    flex: 1;
    width: 100%;
    display: flex;
}

/* 添加点击按钮 */
.add-icon {
    /* ✅ 基础样式 */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    /* height: 28px; */
    border-radius: 6px;
    background: none;
    border: none;
    cursor: pointer;
    color: #409eff;
    padding: 4px;
    /* 扩大可点击区域 */
    margin: 0;

    /* ✅ 禁用默认 outline（但保留聚焦态！） */
    outline: none;

    /* ✅ 过渡动画 */
    transition:
        background-color 0.2s,
        transform 0.1s,
        box-shadow 0.2s;
}

.add-icon:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
}

.add-icon:focus-visible {
    box-shadow: 0 0 0 2px #409eff33, 0 0 0 4px #409eff1a;
    /* 内阴影 + 外发光，美观且符合 WCAG */
}


.doamin-info>.el-col,
.doamin-info-col {
    background-color: #d1d9df;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.url-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 10px 0;
}

/* 各类信息 */
.info-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    /* --el-box-shadow-light */
    height: 100%;
    box-sizing: border-box;
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
}

.info-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px;
    text-align: center;
}

.info-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 1.6;
    text-align: center;
    white-space: pre-line;
    word-break: break-all;
}
</style>