<template>
    <div class="nuclei-wrapper">
        <div class="header">
            <img src="@/assets/nuclei.png" alt="nuclei" class="header-logo" />
            <div class="title">Nuclei 扫描器</div>
        </div>

        <div class="content-grid">
            <!-- 左侧配置 -->
            <el-card class="config-card">
                <div class="section-title">扫描配置</div>

                <el-form :model="form" label-width="120px">
                    <el-form-item label="目标 URL">
                        <el-input v-model="form.target" placeholder="https://example.com 或 IP" clearable />
                    </el-form-item>

                    <el-form-item label="模板选择">
                        <el-select v-model="form.template" placeholder="选择模板" clearable>
                            <el-option label="CVE 漏洞" value="cves" />
                            <el-option label="默认漏洞库" value="default" />
                            <el-option label="Web 漏洞" value="web" />
                            <el-option label="端口漏洞" value="network" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="严重等级">
                        <el-select v-model="form.severity" placeholder="不限">
                            <el-option label="Critical" value="critical" />
                            <el-option label="High" value="high" />
                            <el-option label="Medium" value="medium" />
                            <el-option label="Low" value="low" />
                            <el-option label="Info" value="info" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="并发数">
                        <el-input-number v-model="form.rate" :min="10" :max="2000" />
                    </el-form-item>

                    <el-form-item label="附加参数">
                        <el-input v-model="form.extra" placeholder="例如：-duc -tl 5" clearable />
                    </el-form-item>
                </el-form>

                <div class="actions">
                    <el-button type="primary" @click="run">开始扫描</el-button>
                    <el-button @click="reset">重置</el-button>
                </div>
            </el-card>

            <!-- 右侧输出 -->
            <el-card class="output-card">
                <div class="section-title">扫描输出</div>
                <div class="console-box">
                    <pre>{{ output }}</pre>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
    target: "",
    template: "default",
    severity: "",
    rate: 200,
    extra: ""
});

const output = ref("等待执行...");

function run() {
    output.value =
        `执行 Nuclei 扫描：\n` + JSON.stringify(form.value, null, 2);
}

function reset() {
    form.value = {
        target: "",
        template: "default",
        severity: "",
        rate: 200,
        extra: ""
    };
    output.value = "等待执行...";
}
</script>

<style scoped>
/* 页面容器高度不覆盖底部 */
.nuclei-wrapper {
    padding: 20px;
    height: calc(100vh - 120px);
    overflow-y: auto;
}

/* 标题区域 */
.header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.header-logo {
    width: 48px;
    height: 48px;
}

.title {
    font-size: 22px;
    font-weight: 700;
}

/* 配置 + 输出左右布局 */
.content-grid {
    display: flex;
    gap: 20px;
    width: 100%;
    height: calc(100% - 70px);
}

/* 左侧卡片 */
.config-card {
    flex: 1;
    min-width: 380px;
    display: flex;
    flex-direction: column;
}

/* 右侧卡片 */
.output-card {
    flex: 1;
    min-width: 380px;
    display: flex;
    flex-direction: column;
}

/* 小屏自动回落为一列 */
@media (max-width: 900px) {
    .content-grid {
        flex-direction: column;
    }
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
}

.actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

/* 输出框 */
.console-box {
    background: #000;
    color: #0f0;
    padding: 15px;
    min-height: 300px;
    border-radius: 6px;
    font-size: 13px;
    overflow: auto;
    flex: 1;
}
</style>
