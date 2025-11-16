<template>
    <div class="nuclei-yaml-wrapper">
        <!-- 头部区域 -->
        <div class="header">
            <img src="@/assets/nuclei.png" alt="nuclei" class="header-logo" />
            <div class="title">Nuclei YAML 模板生成器</div>
        </div>

        <!-- 主内容区：左右分栏 -->
        <div class="main-container">
            <!-- 左侧：配置区域 -->
            <div class="left-column">
                <el-card class="config-card">
                    <div class="section-title">基本信息</div>
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="模板 ID">
                            <el-input v-model="form.id" placeholder="唯一 ID，如：cve-2025-xxxx" />
                        </el-form-item>
                        <el-form-item label="模板名称">
                            <el-input v-model="form.name" placeholder="例如：Example RCE Scanner" />
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-input v-model="form.author" placeholder="你的名字" />
                        </el-form-item>
                        <el-form-item label="严重等级">
                            <el-select v-model="form.severity">
                                <el-option label="critical" value="critical" />
                                <el-option label="high" value="high" />
                                <el-option label="medium" value="medium" />
                                <el-option label="low" value="low" />
                                <el-option label="info" value="info" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="config-card">
                    <div class="section-title">HTTP 请求配置</div>
                    <el-form label-width="120px">
                        <el-form-item label="请求方法">
                            <el-select v-model="form.method">
                                <el-option label="GET" value="GET" />
                                <el-option label="POST" value="POST" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="路径 Path">
                            <el-input v-model="form.path" placeholder="例如：/api/info" />
                        </el-form-item>
                        <el-form-item label="请求 Body (可选)">
                            <el-input type="textarea" v-model="form.body" rows="4" placeholder="POST 时填写 JSON 或普通数据" />
                        </el-form-item>
                        <el-form-item label="匹配规则">
                            <el-input type="textarea" v-model="form.match" rows="5"
                                placeholder="例如：Admin Panel Found" />
                        </el-form-item>
                    </el-form>
                </el-card>

                <div class="actions">
                    <el-button type="primary" @click="generate">生成 YAML</el-button>
                    <el-button @click="reset">重置</el-button>
                </div>
            </div>

            <!-- 右侧：输出区域 -->
            <div class="right-column">
                <el-card class="output-card">
                    <div class="section-title">生成的 Nuclei YAML</div>
                    <div class="console-box">
                        <pre>{{ yaml }}</pre>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
    id: "",
    name: "",
    author: "",
    severity: "medium",
    method: "GET",
    path: "/",
    body: "",
    match: ""
});

const yaml = ref("点击生成 YAML...");

function generate() {
    yaml.value = `id: ${form.value.id}
info:
  name: ${form.value.name}
  author: ${form.value.author}
  severity: ${form.value.severity}
requests:
  - method: ${form.value.method}
    path:
      - '${form.value.path}'
${form.value.body ? `    body: |
      ${form.value.body.replace(/\n/g, "\n      ")}` : ""}
    matchers:
      - type: word
        words:
          - '${form.value.match}'
`;
}

function reset() {
    form.value = {
        id: "",
        name: "",
        author: "",
        severity: "medium",
        method: "GET",
        path: "/",
        body: "",
        match: ""
    };
    yaml.value = "点击生成 YAML...";
}
</script>

<style scoped>
/* 页面整体，高度减去 150px */
.nuclei-yaml-wrapper {
    overflow-y: auto;
    /* 浏览器窗口变小时出现滚动条 */
    height: calc(100% - 150px);
    /* 适应 router-view */
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
}

.header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    height: auto;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.header-logo {
    width: 48px;
    height: 48px;
}

.title {
    font-size: 22px;
    font-weight: bold;
}

.main-container {
    display: flex;
    gap: 20px;
    width: 100%;
    height: auto;
    /* 不固定高度，由内容撑开 */
}

.left-column,
.right-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: auto;
    /* 内容撑开 */
}

.config-card {
    width: 100%;
    margin: 0 !important;
    flex: none;
    /* 高度由内容撑开 */
}

.actions {
    display: flex;
    gap: 10px;
    padding: 10px 0;
}

.output-card {
    width: 100%;
    flex: 1;
    /* 填满右侧剩余空间 */
    display: flex;
    flex-direction: column;
    margin: 0 !important;
}

.console-box {
    background: #111;
    color: #0f0;
    padding: 15px;
    flex: 1;
    /* 填满输出卡片 */
    border-radius: 6px;
    font-size: 13px;
    white-space: pre;
}

:deep(.el-card) {
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 匹配规则文本域自适应高度 */
:deep(.el-input__textarea) {
    min-height: 150px !important;
    height: auto !important;
    resize: none;
}
</style>
