<script setup lang="ts">
import {
  clearCard2LogicPoints,
  handleIndGlobeEarthNodeCard2Logic,
} from '../business'
import RouteCesiumLabelDDZXNew from '../map-label/RouteCesiumLabelDDZXNew.vue'
import RouteCesiumLabelSJZXNew from '../map-label/RouteCesiumLabelSJZXNew.vue'

const store = useAppStore()

const data = [
  // 第一行
  [
    {
      label: '政务服务',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
    {
      label: '金融服务',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
    {
      label: '通信服务',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
    {
      label: '能源服务',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
  ],
  [
    {
      label: '计算节点',
      value: '200W',
      pointsUrl: '/mock/earth-node-points1.json',
    },
    {
      label: 'CDN节点',
      value: '200W',
      pointsUrl: '/mock/earth-node-points2.json',
    },
    {
      label: '泛在节点',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
    {
      label: '路由节点',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
  ],
  [
    {
      label: '能源管理',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
    {
      label: '工业控制',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
    {
      label: '安全生产',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
    {
      label: '其他',
      value: '200W',
      pointsUrl: '/mock/earth-node-points.json',
    },
  ],
]

// 当前选中的行索引
const currentRowIndex1 = ref<number[]>([3])
const currentRowIndex2 = ref<number[]>([])
const currentRowIndex3 = ref<number[]>([0])

function handleSelectRow1(item: (typeof data)[0][0], index: number) {
  if (currentRowIndex1.value.includes(index)) {
    currentRowIndex1.value = currentRowIndex1.value.filter((i) => i !== index)
    if (store.appCesiumViewer) {
      clearCard2LogicPoints(store.appCesiumViewer, item.label)
    }
  } else {
    currentRowIndex1.value = [index]
  }
}

function handleSelectRow2(item: (typeof data)[0][0], index: number) {
  if (currentRowIndex2.value.includes(index)) {
    currentRowIndex2.value = currentRowIndex2.value.filter((i) => i !== index)
    if (store.appCesiumViewer) {
      // clearCard2LogicPoints(store.appCesiumViewer, item.label)

      if (item.label === '计算节点') {
        // clearCard2LogicPoints(store.appCesiumViewer, item.label)

        // 这里是演示，只判断计算节点，后续可以删掉，只保留上面的那一行就行
        // 添加调度中心的
        clearCard2LogicPoints(store.appCesiumViewer, 'earth-points-ddzx-sjzx')
      } else {
        clearCard2LogicPoints(store.appCesiumViewer, item.label)
      }
    }
  } else {
    currentRowIndex2.value.push(index)
    if (store.appCesiumViewer) {
      // handleIndGlobeEarthNodeCard2Logic(store.appCesiumViewer, item.pointsUrl, item.label)

      // 这里是演示，只判断计算节点，后续可以删掉，只保留上面的那一行就行
      if (item.label === '计算节点') {
        // 添加调度中心的
        handleIndGlobeEarthNodeCard2Logic(
          store.appCesiumViewer,
          '/mock/earth-points-ddzx.json',
          'earth-points-ddzx-sjzx',
          RouteCesiumLabelDDZXNew,
        )
        // 添加数据中心的
        handleIndGlobeEarthNodeCard2Logic(
          store.appCesiumViewer,
          '/mock/earth-points-sjzx.json',
          'earth-points-ddzx-sjzx',
          RouteCesiumLabelSJZXNew,
        )
      } else {
        handleIndGlobeEarthNodeCard2Logic(
          store.appCesiumViewer,
          item.pointsUrl,
          item.label,
        )
      }
    }
  }
}

function handleSelectRow3(item: (typeof data)[0][0], index: number) {
  if (currentRowIndex3.value.includes(index)) {
    currentRowIndex3.value = currentRowIndex3.value.filter((i) => i !== index)
  } else {
    currentRowIndex3.value = [index]
    if (store.appCesiumViewer) {
      handleIndGlobeEarthNodeCard2Logic(
        store.appCesiumViewer,
        item.pointsUrl,
        item.label,
      )
    }
  }
}
</script>

<template>
  <div class="w-full h-[496px] mt-[10px] pt-[6px] px-[28px] flex flex-col justify-start items-start">
    <!-- 标题 -->
    <div class="w-full h-[20px] flex justify-start items-center mb-[20px]">
      <div class="title">关基设施</div>
    </div>

    <div class="w-full h-[350px] flex flex-col justify-center items-center text-white">
      <!-- 云设施 -->
      <div class="w-full flex flex-row justify-start items-center">
        <!-- 图标 -->
        <div class="w-[140px] flex flex-col justify-center items-center">
          <img class="w-[64px] h-[64px] object-contain" src="/images/system/云上关基.png" alt="" />
          <div class="text-[#55ff00]">云设施</div>
        </div>
        <!-- 内容 -->
        <div class="flex-1 flex flex-col justify-center items-start">
          <!-- 第一行 -->
          <div class="w-full flex flex-row justify-start items-center">
            <div v-for="(item, index) in data[0]" :key="item.label"
              class="cursor-pointer w-full flex flex-col justify-start items-center"
              @click="handleSelectRow1(item, index)">
              <div :class="currentRowIndex1.findIndex((i) => i === index) !== -1
                ? '!bg-[#008f89]'
                : 'bg-[#243256]'
                " class="hover:bg-[#28325590] text-center py-2 w-full border-r border-[#3c518c]">
                {{ item.label }}
              </div>
              <div class="py-2">{{ item.value }}</div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="w-full flex flex-row justify-start items-center">
            <div v-for="(item, index) in data[1]" :key="item.label"
              class="cursor-pointer w-full flex flex-col justify-start items-center"
              @click="handleSelectRow2(item, index)">
              <div :class="currentRowIndex2.findIndex((i) => i === index) !== -1
                ? '!bg-[#008f89]'
                : 'bg-[#243256]'
                " class="hover:bg-[#28325590] text-center py-2 w-full border-r border-[#3c518c]">
                {{ item.label }}
              </div>
              <div class="py-2">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="py-4 pl-[130px]">
        <img class="w-full h-full object-contain" src="/images/system/渐变分割线.png" alt="" />
      </div>

      <!-- 非云设施 -->
      <div class="w-full flex flex-row justify-start items-center">
        <!-- 图标 -->
        <div class="w-[140px] flex flex-col justify-center items-center">
          <img class="w-[56px] h-[56px] object-contain" src="/images/system/非云关基.png" alt="" />
          <div class="text-[#55ff00]">非云设施</div>
        </div>
        <!-- 内容 -->
        <div class="flex-1 flex flex-col justify-center items-start">
          <!-- 第一行 -->
          <div class="w-full flex flex-row justify-start items-center">
            <div v-for="(item, index) in data[2]" :key="item.label"
              class="cursor-pointer w-full flex flex-col justify-start items-center"
              @click="handleSelectRow3(item, index)">
              <div :class="currentRowIndex3.findIndex((i) => i === index) !== -1
                ? '!bg-[#008f89]'
                : 'bg-[#243256]'
                " class="hover:bg-[#28325590] text-center py-2 w-full border-r border-[#3c518c]">
                {{ item.label }}
              </div>
              <div class="py-2">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  margin-left: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title::before {
  position: absolute;
  content: '';
  width: 14px;
  height: 12px;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url('/images/system/jt.png');
}
</style>
