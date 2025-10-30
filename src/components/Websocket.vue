<template>
    <div class="websocket-container">
        <el-row class="websocket-row">
            <el-col class="websocket-col">
                <el-card class="websocket-card">
                    <template #header>
                        <div class="card-header">
                            <span>Card name</span>
                        </div>
                    </template>
                    <div class="card-content">
                        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
                    </div>
                    <template #footer>Footer content</template>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.websocket-container {
    position: relative;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    /* 移除 padding-bottom 或根据需要调整 */
    /* padding-bottom: 80px; */
    background-color: blueviolet;
    display: flex;
    /* 添加flex布局 */
}

.websocket-row {
    flex: 1;
    /* 占据所有可用空间 */
    display: flex;
    /* 确保row也是flex容器 */
}

.websocket-col {
    flex: 1;
    /* col占据所有空间 */
    display: flex;
    /* 确保col也是flex容器 */
}

.websocket-card {
    flex: 1;
    /* 卡片占据所有空间 */
    display: flex;
    flex-direction: column;
}

/* 确保卡片内部使用flex布局 */
:deep(.el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.card-content {
    flex: 1;
    overflow-y: auto;
    /* 添加滚动以防内容过多 */
}
</style>