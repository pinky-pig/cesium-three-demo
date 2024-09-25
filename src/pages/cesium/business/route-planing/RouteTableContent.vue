<script setup lang="ts">
import axios from 'axios'

const props = defineProps<{
  currentSearchText: string
}>()
const store = useAppStore()
function handleSelect(item: any) { }
/**
 * el-table row 样式
 * @param param0
 */
function tableRowClassName({ rowIndex }: { rowIndex: number }) {
  if (rowIndex % 2 === 0) {
    return '__odd-row'
  } else {
    return '__even-row'
  }
}

const tableData: any = ref<any[]>([
  {
    xh: '1',
    lx: '1',
    rkmc: '云端 DDos 攻击',
    szwz: '北京市',
  },
])

getList()
function getList() {
  axios.get('/mock/route-list.json').then((res: any) => {
    tableData.value = res.data
  })
}

function isSelectStyle({ row }: any) {
  if (store.currentSelectTarget?.name === row.name) {
    return {
      backgroundColor: '#4d63d0',
      color: '#fff',
    }
  }
}

function indexMethod(index: number) {
  return index + 1
}

const currentRows = defineModel()
function handleSelectionChange(val: any) {
  currentRows.value = val
}

watch(
  () => props.currentSearchText,
  () => {
    if (props.currentSearchText) {
      tableData.value = tableData.value.filter((item: any) => {
        return item.rkmc.includes(props.currentSearchText)
      })
    } else {
      getList()
    }
  },
)
</script>

<template>
  <el-table :row-style="isSelectStyle" :data="tableData" height="230" empty-text="暂无数据" style="
      width: 100%;
      cursor: pointer;
      color: white;
      flex-shrink: 0;
      --el-table-border-color: #333e6c;
      --el-checkbox-bg-color: #333e6c !important;
      background-color: #333e6c00;
    " :row-class-name="tableRowClassName" :header-cell-style="{
      background: '#333e6c',
      color: '#00b0f0',
      height: '36px',
      fontWeight: 'bold',
      border: '0 !important',
    }" :cell-style="{
      padding: '0',
    }" table-layout="auto" @selection-change="handleSelectionChange" @row-click="handleSelect($event)">
    <el-table-column type="index" width="40" align="center" :index="indexMethod" />
    <el-table-column prop="lx" align="center" label="类型" />
    <el-table-column prop="rkmc" align="center" label="入口名称" />
    <el-table-column prop="szwz" align="center" label="所在位置" />
    <el-table-column type="selection" width="30" align="center" />
  </el-table>
</template>

<style scoped>
:deep(.__odd-row) {
  height: 36px;
  --el-table-row-hover-bg-color: #4063d4;
  --el-table-border: 0;
  --el-table-tr-bg-color: transparent;
  --el-table-border-color: #333e6c !important;
}

:deep(.__even-row) {
  height: 36px;
  --el-table-row-hover-bg-color: #4063d4;
  --el-table-border: 0;
  --el-table-tr-bg-color: #333e6cb3;
  --el-table-border-color: #333e6c !important;
}
</style>
