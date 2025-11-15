<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <img src="@/assets/dirsearch.png" alt="dirsearch" class="header-logo" />
                <div class="top-bar"></div>
            </el-header>

            <el-main class="dirsearch-container">
                <el-row :gutter="20" class="dirsearch-main-row">
                    <!-- 左侧配置区 (span=8) -->
                    <el-col class="dirsearch-main-left" :span="8">
                        <!-- ===== 基础设置 ===== -->
                        <div class="config-section">
                            <h3 class="section-title">基础设置</h3>
                            <!-- Target URL -->
                            <div class="config-row">
                                <span class="config-label">Target URL</span>
                                <el-input v-model="config.targetUrl" placeholder="https://example.com" size="large"
                                    class="config-control" />
                            </div>

                            <!-- 扩展名 -->
                            <div class="config-row">
                                <span class="config-label">扩展名</span>
                                <el-select v-model="config.extensions" multiple filterable allow-create
                                    default-first-option placeholder="php, js..." class="config-control"
                                    :popper-class="'hide-popper'">
                                    <el-option v-for="ext in commonExtensions" :key="ext" :label="ext" :value="ext" />
                                </el-select>
                            </div>

                            <!-- 递归 & 线程 -->
                            <el-row :gutter="12">
                                <el-col :span="12">
                                    <div class="config-row">
                                        <span class="config-label">递归深度</span>
                                        <el-select v-model="config.recursiveDepth" size="large" class="config-control">
                                            <el-option :value="0" label="禁用" />
                                            <el-option :value="1" label="1" />
                                            <el-option :value="2" label="2" />
                                            <el-option :value="3" label="3" />
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="config-row">
                                        <span class="config-label">线程数</span>
                                        <el-input-number v-model="config.threads" :min="1" :max="50" size="large"
                                            class="config-control" />
                                    </div>
                                </el-col>
                            </el-row>

                            <!-- 超时 & 延迟 -->
                            <el-row :gutter="12">
                                <el-col :span="12">
                                    <div class="config-row">
                                        <span class="config-label">超时(秒)</span>
                                        <el-input-number v-model="config.timeout" :min="1" :max="60" size="large"
                                            class="config-control" />
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="config-row">
                                        <span class="config-label">延迟(毫秒)</span>
                                        <el-input-number v-model="config.delay" :min="0" :max="5000" size="large"
                                            class="config-control" />
                                    </div>
                                </el-col>
                            </el-row>
                        </div>

                        <!-- ===== 请求设置 ===== -->
                        <div class="config-section">
                            <h3 class="section-title">请求设置</h3>
                            <!-- Method & User-Agent -->
                            <el-row :gutter="12">
                                <el-col :span="12">
                                    <div class="config-row">
                                        <span class="config-label">Method</span>
                                        <el-select v-model="config.method" size="large" class="config-control">
                                            <el-option value="GET" />
                                            <el-option value="POST" />
                                            <el-option value="HEAD" />
                                            <el-option value="OPTIONS" />
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="config-row">
                                        <span class="config-label">User-Agent</span>
                                        <el-input v-model="config.userAgent" size="large" class="config-control"
                                            placeholder="Dirsearch/..." />
                                    </div>
                                </el-col>
                            </el-row>

                            <!-- Headers -->
                            <div class="config-row">
                                <span class="config-label">Headers</span>
                                <el-tag v-for="(header, index) in config.headers" :key="index" closable
                                    @close="removeHeader(index)" class="custom-tag">
                                    {{ header.key }}: {{ header.value }}
                                </el-tag>
                                <el-dropdown @command="addHeader" trigger="click">
                                    <el-button size="large" class="add-btn">+ Add</el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="Host">Host</el-dropdown-item>
                                            <el-dropdown-item command="Referer">Referer</el-dropdown-item>
                                            <el-dropdown-item
                                                command="X-Forwarded-For">X-Forwarded-For</el-dropdown-item>
                                            <el-dropdown-item command="custom">自定义</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                            <!-- Cookies -->
                            <div class="config-row">
                                <span class="config-label">Cookies</span>
                                <el-tag v-for="(cookie, index) in config.cookies" :key="index" closable
                                    @close="removeCookie(index)" class="custom-tag">
                                    {{ cookie.name }}={{ cookie.value }}
                                </el-tag>
                                <el-button size="large" class="add-btn" @click="addCookie">+ Add</el-button>
                            </div>
                        </div>
                    </el-col>

                    <!-- 右侧结果区 -->
                    <el-col class="dirsearch-main-right" :span="16">
                        <div class="result-header">
                            <el-button type="primary" size="large" @click="startScan">开始扫描</el-button>
                            <el-button size="large" @click="resetConfig">重置</el-button>
                        </div>
                        <div class="result-content">
                            <!-- 扫描结果展示区 -->
                            <p>扫描结果将显示在这里...</p>
                            <el-table :data="scanResults" style="width: 100%; margin-top: 16px" empty-text="暂无结果">
                                <el-table-column prop="status" label="状态码" width="80" />
                                <el-table-column prop="url" label="URL" />
                                <el-table-column prop="size" label="大小" width="100" />
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

        <!-- 自定义 Header 对话框 -->
        <el-dialog v-model="showCustomHeaderDialog" title="添加自定义 Header" width="400px">
            <el-form :model="customHeaderForm">
                <el-form-item label="Key" :label-width="60">
                    <el-input v-model="customHeaderForm.key" />
                </el-form-item>
                <el-form-item label="Value" :label-width="60">
                    <el-input v-model="customHeaderForm.value" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showCustomHeaderDialog = false">取消</el-button>
                <el-button type="primary" @click="confirmCustomHeader">确定</el-button>
            </template>
        </el-dialog>

        <!-- 添加 Cookie 对话框 -->
        <el-dialog v-model="showCookieDialog" title="添加 Cookie" width="400px">
            <el-form :model="cookieForm">
                <el-form-item label="Name" :label-width="60">
                    <el-input v-model="cookieForm.name" />
                </el-form-item>
                <el-form-item label="Value" :label-width="60">
                    <el-input v-model="cookieForm.value" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showCookieDialog = false">取消</el-button>
                <el-button type="primary" @click="confirmCookie">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 常用扩展名
const commonExtensions = ['php', 'html', 'js', 'css', 'json', 'xml', 'txt', 'bak']

// 配置数据
const config = reactive({
    targetUrl: 'https://example.com',
    extensions: ['php', 'html', 'js'] as string[],
    recursiveDepth: 2,
    threads: 10,
    timeout: 10,
    delay: 0,
    method: 'GET',
    userAgent: 'Dirsearch/1.0',
    headers: [
        { key: 'Host', value: 'example.com' }
    ] as { key: string; value: string }[],
    cookies: [
        { name: 'PHPSESSID', value: 'abc123' }
    ] as { name: string; value: string }[]
})

// 扫描结果（模拟）
const scanResults = ref([
    { status: 200, url: '/index.php', size: '12.3 KB' },
    { status: 403, url: '/admin/', size: '-' },
    { status: 301, url: '/old', size: '0 B' }
])

// Header 相关
const showCustomHeaderDialog = ref(false)
const customHeaderForm = reactive({ key: '', value: '' })
const addHeader = (command: string) => {
    if (command === 'custom') {
        customHeaderForm.key = ''
        customHeaderForm.value = ''
        showCustomHeaderDialog.value = true
    } else {
        config.headers.push({ key: command, value: '' })
    }
}
const confirmCustomHeader = () => {
    if (customHeaderForm.key.trim()) {
        config.headers.push({ key: customHeaderForm.key, value: customHeaderForm.value })
        showCustomHeaderDialog.value = false
    }
}
const removeHeader = (index: number) => {
    config.headers.splice(index, 1)
}

// Cookie 相关
const showCookieDialog = ref(false)
const cookieForm = reactive({ name: '', value: '' })
const addCookie = () => {
    cookieForm.name = ''
    cookieForm.value = ''
    showCookieDialog.value = true
}
const confirmCookie = () => {
    if (cookieForm.name.trim()) {
        config.cookies.push({ name: cookieForm.name, value: cookieForm.value })
        showCookieDialog.value = false
    }
}
const removeCookie = (index: number) => {
    config.cookies.splice(index, 1)
}

// 操作
const startScan = () => {
    console.log('开始扫描:', config)
    // 实际调用扫描逻辑
}
const resetConfig = () => {
    Object.assign(config, {
        targetUrl: 'https://example.com',
        extensions: ['php', 'html', 'js'],
        recursiveDepth: 2,
        threads: 10,
        timeout: 10,
        delay: 0,
        method: 'GET',
        userAgent: 'Dirsearch/1.0',
        headers: [{ key: 'Host', value: 'example.com' }],
        cookies: [{ name: 'PHPSESSID', value: 'abc123' }]
    })
}
</script>

<style scoped>
.config-section {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px dashed var(--el-border-color-light);
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0 0 16px 0;
}

/* 单行配置项 */
.config-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: nowrap;
    margin-bottom: 12px;
}

.config-label {
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
    width: 80px;
    /* 统一标签宽度，更对齐 */
    text-align: right;
}

.config-control {
    flex: 1;
    min-width: 0;
}

/* 自定义 tag 样式 */
.custom-tag {
    margin-right: 6px;
}

.add-btn {
    margin-left: 6px;
    flex-shrink: 0;
}

/* 隐藏下拉面板 */
.hide-popper {
    display: none !important;
}

/* ========== 原有布局修复 ========== */
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
    box-sizing: border-box;
    background-color: #ffffff;
    border: 2px solid #eaeaea;
    padding: 16px;
    overflow-y: auto;
}

/* 右侧结果区 */
.result-header {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}

.result-content {
    flex: 1;
}
</style>