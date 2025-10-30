<template>
    <div class="nmap-container">
        <!-- logo图片 -->
        <div class="logo-container">
            <img src="@/assets/nmap.png" alt="nmap">
        </div>

        <!-- 顶部装饰条 -->
        <div class="top-bar"></div>

        <!-- 主要内容区域 -->
        <div class="main-content">
            <el-card class="nmap-card">
                <template #header>
                    <div class="card-header">
                        <span>Card name</span>
                    </div>
                </template>

                <div class="card-content">
                    <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
                </div>


            </el-card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nmap-container {
    display: flex;
    flex-direction: column;
    height: 87vh; // 改为100vh
    overflow: hidden;
    padding: 0; // 确保没有内边距
    margin: 0; // 确保没有外边距
}

.logo-container {
    flex-shrink: 0; // 防止logo被压缩
    padding: 10px;

    img {
        width: 100px;
        height: 50px;
    }
}

.top-bar {
    flex-shrink: 0; // 防止被压缩
    height: 5px;
    background-color: rgb(176, 240, 219);
    margin-bottom: 10px;
}

.main-content {
    flex: 1; // 占据剩余所有空间
    display: flex;
    overflow: hidden;
    margin: 0;
}

.nmap-card {
    flex: 1; // 卡片充满父容器
    display: flex;
    flex-direction: column;
    margin: 0; // 移除可能的外边距

    // 如果需要，可以移除Element UI的默认边距
    :deep(.el-card__body) {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0; // 可选：移除内边距
    }
}


.card-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    height: 97%;
    // 可选：添加背景色来可视化区域
    // background-color: #f5f5f5;
}
</style>