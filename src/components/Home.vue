<template>
  <div>
    <el-table ref="tableRef" :data="tableData" style="width: 100%" border lazy row-key="id" :load="load" stripe
      highlight-current-row :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @row-click="onRowClick"
      :row-class-name="getRowClassName">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ElTable } from 'element-plus'

interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}

const tableRef = ref<InstanceType<typeof ElTable>>()
const expandedRow = ref<number | null>(null)

const tableData: User[] = [
  { id: 1, name: 'Server A', date: '2025-10-01', address: 'New York', hasChildren: true },
  { id: 2, name: 'Server B', date: '2025-10-02', address: 'London' },
  { id: 3, name: 'Server C', date: '2025-10-03', address: 'Tokyo', hasChildren: true },
]

// 模拟懒加载
const load = (row: User, treeNode: unknown, resolve: (data: User[]) => void) => {
  setTimeout(() => {
    resolve([
      { id: row.id * 10 + 1, name: `${row.name}-Child`, date: '2025-10-27', address: 'Los Angeles' },
    ])
  }, 50)
}

// 点击整行展开/收起
const onRowClick = (row: User) => {
  if (row.hasChildren) {
    tableRef.value?.toggleRowExpansion(row) // 直接控制展开状态
    expandedRow.value = expandedRow.value === row.id ? null : row.id
  }
}

const getRowClassName = ({ row }: { row: User }) => {
  return row.id === expandedRow.value ? 'expanded-row' : ''
}
</script>

<style scoped>
.expanded-row {
  background-color: #cb2b2b !important;
  transition: background-color 0.3s;
}
</style>
