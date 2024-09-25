<script setup lang="ts">
import axios from 'axios'
import {
  handleCancelSelectOnePosition,
  handleInSelectOnePosition,
} from '../business'

const store = useAppStore()
function handleSelect(item: any) {
  if (store.currentSelectTarget === item && store.appCesiumViewer) {
    // 取消选中
    store.currentSelectTarget = null
    store.appRightBottomShowIndex = 0
    handleCancelSelectOnePosition(store.appCesiumViewer, item)
  } else if (store.appCesiumViewer) {
    store.currentSelectTarget = item
    handleInSelectOnePosition(store.appCesiumViewer, item)

    if (item.type === '变电站') {
      store.appRightBottomShowIndex = 1
    } else {
      store.appRightBottomShowIndex = 2
    }
  }
}
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

withDefaults(
  defineProps<{
    searchValue: string
  }>(),
  {
    searchValue: '',
  },
)

const tableData: any = ref<any[]>([
  {
    xh: '1',
    mc: '东善桥550kv变电站',
    lx: '配电站',
    jjyx: '90',
    msyx: '79',
    zhpj: '88',
  },
  {
    xh: '2',
    mc: '南京华润发电厂',
    lx: '发电厂',
    jjyx: '90',
    msyx: '79',
    zhpj: '88',
  },
])

getList()
function getList() {
  axios.get('/mock/nj-points.json').then((res: any) => {
    tableData.value = res.data.slice(0, 5)
  })
}

function isSelectStyle({ row, rowIndex }: any) {
  if (store.currentSelectTarget?.name === row.name) {
    return {
      backgroundColor: '#00ff0090',
      // border: "1px solid #00b0f0 !important",
      color: '#fff',
    }
  } else {
    return {
      backgroundColor: rowIndex % 2 === 0 ? '#333e6c00' : '#333e6c',
      color: '#fff',
    }
  }
}

function indexMethod(index: number) {
  return index + 1
}
</script>

<template>
  <el-table :row-style="isSelectStyle" :data="tableData" height="300" empty-text="暂无数据" style="
      width: 100%;
      cursor: pointer;
      color: white;
      --el-table-border-color: #333e6c;
      background-color: #333e6c00;
    " :row-class-name="tableRowClassName" :header-cell-style="{
      background: '#333e6c',
      color: '#00b0f0',
      height: '36px',
      fontWeight: 'bold',
      border: '0 !important',
    }" :cell-style="{
      padding: '0',
    }" table-layout="auto" @row-click="handleSelect($event)">
    <el-table-column type="index" width="80" align="center" label="序号" :index="indexMethod" />
    <el-table-column prop="name" align="center" label="名称" />
    <el-table-column prop="type" align="center" label="类型" />
    <el-table-column prop="jjyx" align="center" label="经济影响" />
    <el-table-column prop="msyx" align="center" label="民生影响" />
    <el-table-column prop="zhpj" align="center" label="综合评价" />
  </el-table>
</template>

<style scoped>
:deep(.__odd-row) {
  height: 50px;
  --el-table-row-hover-bg-color: #4063d4;
  --el-table-border: 0;
  --el-table-tr-bg-color: #1a244d00;
  --el-table-border-color: #333e6c !important;
}

:deep(.__even-row) {
  height: 50px;
  --el-table-row-hover-bg-color: #4063d4;
  --el-table-border: 0;
  --el-table-tr-bg-color: #333e6c;
  --el-table-border-color: #333e6c !important;
}
</style>
