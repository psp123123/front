<template>
    <div class="top-container">
        <el-header class="header">
            <span>Fleet Pilot</span>
        </el-header>

        <div class="main-container">
            <el-row class="flex-row" :gutter="5">
                <el-col :span="8" class="url-list">
                    <div class="flex flex-wrap gap-4">
                        <el-card class="url-list-card">
                            <!-- url列表 -->
                            <span>url列表</span>
                            <el-table :data="urlList">
                                <el-table-column fixed prop="date" label="Date" width="90" />

                                <el-table-column fixed prop="url" label="url" width="150" />
                                <el-table-column fixed="right" label="Operations" min-width="50">
                                    <template #default>
                                        <el-button link type="primary" size="small" @click="handleClick">
                                            Detail
                                        </el-button>
                                        <el-button link type="primary" size="small">Edit</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="16" class="url-info">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface urlListType {
    date: string
    url: string
}
const urlList = ref<urlListType[]>([{
    date: '2016-05-03',
    url: 'xxx.example.com',

}])
const currentUrl = ref('xxx.example.com')
function handleClick() {
    console.log('output')
}
</script>

<style scoped>
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

.doamin-info>.el-col,
.doamin-info-col {
    background-color: #d1d9df;
    display: flex;
    flex-direction: column;
    flex: 1;
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