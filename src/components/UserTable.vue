<template>
  <el-table :data="data" :loading="loading" border style="width: 100%" v-loading="loading">
    <el-table-column prop="name" label="用户名" width="120" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="role" label="角色" width="120" />
    <el-table-column prop="status" label="状态" width="100">
      <template #default="{ row }">
        <el-tag :type="row.status === '启用' ? 'success' : 'danger'">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" fixed="right">
      <template #default="{ row }">
        <el-button size="small" @click="emit('edit', row)">编辑</el-button>
        <el-button size="small" type="danger" @click="emit('delete', row.id)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination-wrapper" style="margin-top: 20px; text-align: right">
    <el-pagination
      v-model:current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="total, prev, pager, next"
      @current-change="emit('page-change', $event)"
    />
  </div>
</template>

<script setup>
defineProps({
  data: Array,
  loading: Boolean,
  pagination: Object,
})

const emit = defineEmits(['edit', 'delete', 'page-change'])
</script>
