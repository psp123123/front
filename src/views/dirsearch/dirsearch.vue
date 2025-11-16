<template>
    <div class="dirsearch-config-layout">
        <!-- 头部 -->
        <div class="config-header">
            <img src="@/assets/dirsearch.png" alt="dirsearch" class="header-logo" />
            <div class="top-bar"></div>
        </div>

        <!-- 主体：两栏布局 —— 配置 + 结果 -->
        <div class="main-content">
            <!-- 左侧：配置面板 -->
            <div class="config-panel">
                <!-- 基础设置 -->
                <div class="config-section">
                    <h3 class="section-title">🛠️ 基础设置</h3>

                    <div class="config-row">
                        <span class="config-label">Target URL</span>
                        <el-input v-model="config.targetUrl" placeholder="https://example.com" size="default"
                            class="config-control" />
                    </div>

                    <!-- 字典 -->
                    <div class="config-row">
                        <span class="config-label">字典</span>
                        <div class="dict-group">
                            <el-select v-model="config.dictPreset" size="default" @change="onDictPresetChange"
                                class="dict-select">
                                <el-option value="" label="自定义" />
                                <el-option value="common" label="common.txt（常用）" />
                                <el-option value="big" label="big.txt（大型）" />
                                <el-option value="directory" label="directory-list-2.3-medium" />
                                <el-option value="raft" label="raft-small-words" />
                            </el-select>
                            <el-button size="default" @click="showUploadDialog = true" class="upload-btn">
                                <el-icon>
                                    <Upload />
                                </el-icon> 上传
                            </el-button>
                        </div>
                    </div>

                    <!-- 扩展名 -->
                    <div class="config-row">
                        <span class="config-label">扩展名</span>
                        <el-select v-model="config.extensions" multiple filterable allow-create default-first-option
                            placeholder="php, js, html..." class="config-control" :popper-class="'hide-popper'">
                            <el-option v-for="ext in commonExtensions" :key="ext" :label="ext" :value="ext" />
                        </el-select>
                    </div>

                    <!-- 递归 & 线程 & 超时 -->
                    <el-row :gutter="10" class="triple-row">
                        <el-col :span="8">
                            <div class="config-row compact">
                                <span class="config-label">递归</span>
                                <el-select v-model="config.recursiveDepth" size="default" class="config-control">
                                    <el-option :value="0" label="禁用" />
                                    <el-option :value="1" label="1" />
                                    <el-option :value="2" label="2" />
                                    <el-option :value="3" label="3" />
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="config-row compact">
                                <span class="config-label">线程</span>
                                <el-input-number v-model="config.threads" :min="1" :max="100" size="default"
                                    controls-position="right" class="config-control" />
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="config-row compact">
                                <span class="config-label">超时</span>
                                <el-input-number v-model="config.timeout" :min="1" :max="60" :step="1" size="default"
                                    controls-position="right" class="config-control">
                                    <template #append>秒</template>
                                </el-input-number>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- 过滤设置 -->
                <div class="config-section">
                    <h3 class="section-title">🔍 过滤设置</h3>

                    <!-- 排除状态码 -->
                    <div class="config-row">
                        <span class="config-label">排除状态</span>
                        <div class="tag-input-group">
                            <el-tag v-for="(code, index) in config.excludeStatus" :key="index" closable size="small"
                                @close="() => removeExcludeStatus(index)" class="filter-tag status-tag">
                                {{ code }}
                            </el-tag>
                            <el-input v-model="newStatus" @keyup.enter="addExcludeStatus" placeholder="404" size="small"
                                class="tag-input" />
                            <el-button size="small" circle @click="addExcludeStatus" :disabled="!newStatus">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>

                    <!-- 排除文本 -->
                    <div class="config-row">
                        <span class="config-label">排除文本</span>
                        <div class="tag-input-group">
                            <el-tag v-for="(text, index) in config.excludeText" :key="index" closable size="small"
                                @close="() => removeExcludeText(index)" class="filter-tag text-tag">
                                "{{ text }}"
                            </el-tag>
                            <el-input v-model="newText" @keyup.enter="addExcludeText" placeholder="Not Found"
                                size="small" class="tag-input" />
                            <el-button size="small" circle @click="addExcludeText" :disabled="!newText">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>

                    <!-- 排除正则 -->
                    <div class="config-row">
                        <span class="config-label">排除正则</span>
                        <div class="tag-input-group">
                            <el-tag v-for="(regex, index) in config.excludeRegex" :key="index" closable size="small"
                                @close="() => removeExcludeRegex(index)" class="filter-tag regex-tag">
                                /{{ regex }}/
                            </el-tag>
                            <el-input v-model="newRegex" @keyup.enter="addExcludeRegex" placeholder="maintenance"
                                size="small" class="tag-input" />
                            <el-button size="small" circle @click="addExcludeRegex" :disabled="!newRegex">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>
                </div>

                <!-- 代理设置 -->
                <div class="config-section">
                    <h3 class="section-title">🌐 代理设置</h3>

                    <div class="config-row">
                        <span class="config-label">启用代理</span>
                        <el-switch v-model="config.useProxy" size="default" />
                    </div>

                    <div v-if="config.useProxy" class="proxy-subsection">
                        <div class="config-row">
                            <span class="config-label">类型</span>
                            <el-select v-model="config.proxyType" size="default" class="config-control">
                                <el-option value="http" label="HTTP" />
                                <el-option value="https" label="HTTPS" />
                                <el-option value="socks5" label="SOCKS5" />
                            </el-select>
                        </div>
                        <div class="config-row">
                            <span class="config-label">地址</span>
                            <el-input v-model="config.proxyAddress" placeholder="127.0.0.1:8080" size="default"
                                class="config-control" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧：结果面板 -->
            <div class="result-panel">
                <div class="result-header">
                    <h3 class="section-title result-title">
                        📋 扫描结果（{{ mockResults.length }} 项）
                    </h3>
                    <el-button size="small" type="info" plain @click="isResultCollapsed = !isResultCollapsed">
                        <el-icon>
                            <component :is="isResultCollapsed ? 'ArrowDown' : 'ArrowUp'" />
                        </el-icon>
                        {{ isResultCollapsed ? '展开' : '收起' }}
                    </el-button>
                </div>

                <div v-show="!isResultCollapsed" class="result-content">
                    <div v-if="mockResults.length === 0" class="empty-state">
                        <el-icon class="empty-icon">
                            <Document />
                        </el-icon>
                        <p>暂无扫描结果</p>
                        <p class="empty-desc">点击「开始扫描」后，结果将实时显示在此处</p>
                    </div>

                    <el-scrollbar v-else max-height="100%">
                        <div class="result-list">
                            <div v-for="(item, index) in mockResults" :key="index" class="result-item"
                                :class="{ 'status-200': item.status === 200, 'status-301': item.status === 301, 'status-403': item.status === 403 }">
                                <div class="status-badge">{{ item.status }}</div>
                                <a :href="item.url" target="_blank" class="url-link">{{ item.url }}</a>
                                <div class="size">{{ item.size }} KB</div>
                                <el-tag size="small" :type="getStatusTagType(item.status)">{{ item.type }}</el-tag>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>

        <!-- 底部操作区 -->
        <div class="action-footer">
            <el-button type="primary" size="default" :loading="isScanning" @click="startScan"
                :disabled="!config.targetUrl.trim()">
                <el-icon>
                    <VideoPlay />
                </el-icon>
                {{ isScanning ? '扫描中...' : '开始扫描' }}
            </el-button>
            <el-button size="default" :disabled="!isScanning" @click="pauseScan">
                <el-icon v-if="!isPaused">
                    <VideoPause />
                </el-icon>
                <el-icon v-else>
                    <VideoPlay />
                </el-icon>
                {{ isPaused ? '继续' : '暂停' }}
            </el-button>
            <el-button size="default" type="danger" :disabled="!isScanning" @click="stopScan">
                <el-icon>
                    <CircleClose />
                </el-icon>
                停止
            </el-button>

            <div class="spacer"></div>

            <!-- 结果导出 -->
            <el-button size="default" type="success" :disabled="mockResults.length === 0" @click="exportResults">
                <el-icon>
                    <Download />
                </el-icon>
                导出结果
            </el-button>
        </div>

        <!-- 上传对话框 -->
        <el-dialog v-model="showUploadDialog" title="上传字典文件" width="460px">
            <el-upload drag :auto-upload="false" :on-change="handleFileChange" :on-remove="handleFileRemove"
                :file-list="uploadedFiles" accept=".txt">
                <el-icon class="el-icon--upload">
                    <UploadFilled />
                </el-icon>
                <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        支持 .txt 格式，每行一个路径（如：/admin, /backup.zip）
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <el-button @click="showUploadDialog = false">取消</el-button>
                <el-button type="primary" @click="confirmUpload" :disabled="uploadedFiles.length === 0">
                    确定
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 👇 新增结果相关逻辑（mock）
import {
    ref,
    reactive,
    getCurrentInstance,
    onBeforeUnmount,
    computed
} from 'vue'
import {
    Upload,
    UploadFilled,
    VideoPlay,
    VideoPause,
    CircleClose,
    Plus,
    ArrowDown,
    ArrowUp,
    Document,
    Download
} from '@element-plus/icons-vue'

// 安全获取 ElMessage 和 ElNotification
const { proxy } = getCurrentInstance()!
const ElMessage = proxy?.$message

// ========== Mock 扫描结果 ==========
const mockResults = ref([
    { url: 'https://example.com/admin/', status: 200, size: 12.4, type: 'Directory' },
    { url: 'https://example.com/config.php', status: 200, size: 3.2, type: 'File' },
    { url: 'https://example.com/backup.zip', status: 200, size: 2560, type: 'Archive' },
    { url: 'https://example.com/.git/', status: 403, size: 0.1, type: 'Directory' },
    { url: 'https://example.com/old/', status: 301, size: 0.5, type: 'Redirect' },
    { url: 'https://example.com/api/v1/', status: 200, size: 8.7, type: 'API' },
])

const isResultCollapsed = ref(false)

const getStatusTagType = (status: number) => {
    if (status === 200) return 'success'
    if (status === 301 || status === 302) return 'warning'
    if (status === 403) return 'danger'
    return 'info'
}

const exportResults = () => {
    const text = mockResults.value.map(r => `${r.status}\t${r.url}\t${r.size} KB`).join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dirsearch_results.txt'
    a.click()
    URL.revokeObjectURL(url)
    if (ElMessage) ElMessage.success('结果已导出')
}
// ↑↑↑ 新增结束

// ========== 原有逻辑保持不变（仅微调 size="large" → "default" 已在 template 中处理）==========
const commonExtensions = ['php', 'html', 'js', 'css', 'json', 'xml', 'txt', 'bak', 'zip']

const config = reactive({
    targetUrl: 'https://example.com',
    dictPreset: 'common',
    extensions: ['php', 'html', 'js'] as string[],
    recursiveDepth: 2,
    threads: 20,
    timeout: 10,
    excludeStatus: [404, 500] as number[],
    excludeText: ['Not Found', 'Access Denied'] as string[],
    excludeRegex: ['maintenance'] as string[],
    useProxy: false,
    proxyType: 'http',
    proxyAddress: '127.0.0.1:8080'
})

const isScanning = ref(false)
const isPaused = ref(false)
const showUploadDialog = ref(false)
const uploadedFiles = ref<any[]>([])
const newStatus = ref('')
const newText = ref('')
const newRegex = ref('')

const onDictPresetChange = (val: string) => {
    if (val === '') config.extensions = []
}

const addExcludeStatus = () => {
    const num = parseInt(newStatus.value.trim())
    if (!isNaN(num) && num >= 100 && num < 600 && !config.excludeStatus.includes(num)) {
        config.excludeStatus.push(num)
        newStatus.value = ''
    }
}
const removeExcludeStatus = (index: number) => config.excludeStatus.splice(index, 1)

const addExcludeText = () => {
    const text = newText.value.trim()
    if (text && !config.excludeText.includes(text)) {
        config.excludeText.push(text)
        newText.value = ''
    }
}
const removeExcludeText = (index: number) => config.excludeText.splice(index, 1)

const addExcludeRegex = () => {
    const regex = newRegex.value.trim()
    if (regex && !config.excludeRegex.includes(regex)) {
        config.excludeRegex.push(regex)
        newRegex.value = ''
    }
}
const removeExcludeRegex = (index: number) => config.excludeRegex.splice(index, 1)

const handleFileChange = (file: any) => uploadedFiles.value = [file]
const handleFileRemove = () => uploadedFiles.value = []
const confirmUpload = async () => {
    if (uploadedFiles.value.length > 0) {
        const file = uploadedFiles.value[0].raw
        const text = await file.text()
        if (ElMessage) ElMessage.success(`已加载 ${file.name}，共 ${text.split('\n').filter((l: string) => l.trim()).length} 条路径`)
        showUploadDialog.value = false
        uploadedFiles.value = []
    }
}

const startScan = () => {
    if (!config.targetUrl.trim()) {
        if (ElMessage) ElMessage.warning('请输入目标 URL')
        return
    }
    isScanning.value = true
    isPaused.value = false
}

const pauseScan = () => {
    isPaused.value = !isPaused.value
}

const stopScan = () => {
    isScanning.value = false
    isPaused.value = false
}

onBeforeUnmount(() => {
    stopScan()
})
</script>

<style scoped>
/* ========== 修复布局高度问题 ========== */
.dirsearch-config-layout {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 85px);
    background-color: #fafafa;
    font-size: 13px;
    overflow: hidden;
}

/* 头部 */
.config-header {
    padding: 12px 18px;
    background: white;
    border-bottom: 1px solid #ebeef5;
    flex-shrink: 0;
    z-index: 10;
}

.header-logo {
    height: 30px;
}

.top-bar {
    height: 3px;
    background: linear-gradient(90deg, #409eff, #66b1ff, #8cc5ff);
    border-radius: 2px;
    margin-top: 10px;
}

/* 主内容区 —— 左右分栏 */
.main-content {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    padding: 16px;
    gap: 16px;
    /* 移除 overflow-y: auto，让内容区自己处理滚动 */
}

.config-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    /* 配置面板自己滚动 */
    padding-right: 4px;
}

.result-panel {
    width: 420px;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    flex-shrink: 0;
}

.result-header {
    padding: 14px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.result-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
}

.result-content {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #909399;
    padding: 24px;
    text-align: center;
    flex: 1;
}

.empty-icon {
    font-size: 40px;
    margin-bottom: 12px;
    color: #c0c4cc;
}

.empty-desc {
    font-size: 12px;
    margin-top: 4px;
}

/* 结果列表 */
.result-list {
    padding: 12px 16px;
    flex: 1;
}

.result-item {
    display: grid;
    grid-template-columns: 60px 1fr 70px 80px;
    gap: 12px;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed #f0f0f0;
}

.result-item:last-child {
    border-bottom: none;
}

.status-badge {
    font-family: 'Consolas', monospace;
    font-weight: bold;
    text-align: center;
    padding: 2px 6px;
    border-radius: 4px;
}

.status-200 .status-badge {
    background-color: #e1f3e8;
    color: #28a745;
}

.status-301 .status-badge {
    background-color: #fff7e6;
    color: #e6a23c;
}

.status-403 .status-badge {
    background-color: #fce9e9;
    color: #f56c6c;
}

.url-link {
    color: #409eff;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.url-link:hover {
    text-decoration: underline;
}

.size {
    font-size: 12px;
    color: #909399;
    text-align: right;
}

/* 配置区样式 —— 整体紧凑化 */
.config-section {
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s;
    flex-shrink: 0;
}

.config-section:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

.section-title {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 14px 0;
    color: #303133;
    display: flex;
    align-items: center;
    gap: 6px;
}

.config-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    flex-wrap: nowrap;
}

.config-label {
    width: 72px;
    text-align: right;
    font-weight: 500;
    color: #606266;
    flex-shrink: 0;
    font-size: 13px;
}

.config-control {
    flex: 1;
    min-width: 0;
}

.triple-row {
    margin: -6px;
}

.triple-row .config-row.compact {
    margin-bottom: 0;
    margin-top: 6px;
}

.dict-group {
    display: flex;
    gap: 8px;
    width: 100%;
}

.dict-select {
    flex: 1;
}

.upload-btn {
    flex-shrink: 0;
    width: 88px;
    font-size: 13px;
}

.tag-input-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    flex: 1;
    min-width: 0;
}

.tag-input {
    flex: 1;
    min-width: 90px;
    max-width: 140px;
    font-size: 12px;
}

.filter-tag {
    font-family: 'Consolas', monospace;
    font-size: 12px;
}

.status-tag {
    background: #ecf5ff;
    border-color: #b3d8ff;
}

.text-tag {
    background: #f0f9eb;
    border-color: #c2e7b0;
}

.regex-tag {
    background: #fdf6ec;
    border-color: #f5dab1;
}

.proxy-subsection {
    padding-left: 20px;
    margin-top: 6px;
}

/* 底部操作区 - 修复定位 */
.action-footer {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
    margin: 0 16px 16px 16px;
    /* 添加边距 */
}

.action-footer .el-button {
    font-size: 13px;
}

.spacer {
    flex: 1;
}

/* 隐藏下拉面板（避免扩展名下拉遮挡） */
:deep(.hide-popper) {
    display: none !important;
}

/* 滚动条美化 */
:deep(.el-scrollbar__wrap) {
    scrollbar-width: thin;
    scrollbar-color: #c1c5cb transparent;
}

:deep(.el-scrollbar__bar) {
    opacity: 0.6;
}

:deep(.el-scrollbar__bar:hover) {
    opacity: 1;
}

/* 响应式：小屏时结果区改为底部抽屉式 */
@media (max-width: 1100px) {
    .main-content {
        flex-direction: column;
    }

    .result-panel {
        width: 100%;
        max-height: 300px;
        transition: max-height 0.3s ease;
    }

    .result-panel.collapsed {
        max-height: 60px;
    }
}

@media (max-width: 768px) {
    .config-label {
        width: 64px;
        font-size: 12px;
    }

    .action-footer {
        flex-wrap: wrap;
        margin: 0 8px 8px 8px;
    }

    .dict-group,
    .tag-input-group {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
    }

    .upload-btn,
    .tag-input {
        width: 100% !important;
    }

    .result-panel {
        max-height: 260px;
    }
}
</style>