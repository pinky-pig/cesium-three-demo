<script setup lang="ts">
import {
  clearCard2LogicPoints,
  handleIndGlobeEarthZDCard2Logic,
} from '../business'
const store = useAppStore()
function handleClick() { }

const getPoints = {
  通信保障基地: '/mock/通信保障阵地.json',
  防守阵地: '/mock/防守阵地.json',
  特殊网络阵地: '/mock/特殊网络阵地.json',
  情报阵地: '/mock/情报阵地.json',
  攻击阵地: '/mock/攻击阵地.json',
}
const currentItems = ref<Array<keyof typeof getPoints> | null>([])
function handleSelect(item: keyof typeof getPoints) {
  if (
    currentItems.value === null ||
    (currentItems.value as any)?.length === 0
  ) {
    currentItems.value = [item]
    if (store.appCesiumViewer) {
      handleIndGlobeEarthZDCard2Logic(
        store.appCesiumViewer!,
        getPoints[item],
        item,
      )
    }
  } else if (currentItems.value!.includes(item)) {
    currentItems.value = currentItems.value!.filter((i) => i !== item)
    if (store.appCesiumViewer) {
      clearCard2LogicPoints(store.appCesiumViewer, item)
    }
  } else {
    currentItems.value!.push(item)
    if (store.appCesiumViewer) {
      handleIndGlobeEarthZDCard2Logic(
        store.appCesiumViewer!,
        getPoints[item],
        item,
      )
    }
  }
}
</script>

<template>
  <div class="wrapper w-full h-[496px] mt-[30px] pt-[26px] px-[28px] flex flex-col justify-start items-start">
    <!-- 标题 -->
    <div class="w-full h-[20px] flex justify-start items-center mb-[20px]">
      <div class="title">阵地</div>
    </div>

    <div class="w-full flex justify-center items-center relative">
      <div :class="currentItems?.includes('通信保障基地') ? '!text-[#e2dd46]' : ''"
        class="absolute cursor-pointer top-[114px] left-[46px] text-white text-[16px] font-bold"
        @click="handleSelect('通信保障基地')">
        通信保障基地
      </div>
      <div :class="currentItems?.includes('防守阵地') ? '!text-[#e2dd46]' : ''"
        class="absolute cursor-pointer top-[184px] left-[294px] text-white text-[16px] font-bold"
        @click="handleSelect('防守阵地')">
        防守阵地
      </div>
      <div :class="currentItems?.includes('特殊网络阵地') ? '!text-[#e2dd46]' : ''"
        class="absolute cursor-pointer top-[114px] left-[521px] text-white text-[16px] font-bold"
        @click="handleSelect('特殊网络阵地')">
        特殊网络阵地
      </div>
      <div :class="currentItems?.includes('情报阵地') ? '!text-[#e2dd46]' : ''"
        class="absolute cursor-pointer top-[60px] left-[296px] text-white text-[16px] font-bold"
        @click="handleSelect('情报阵地')">
        情报阵地
      </div>
      <div :class="currentItems?.includes('攻击阵地') ? '!text-[#e2dd46]' : ''"
        class="absolute cursor-pointer top-[116px] left-[304px] text-white text-[20px] font-bold"
        @click="handleSelect('攻击阵地')">
        攻击阵地
      </div>
      <img class="w-full h-full object-contain" src="/images/system/阵地分布背景.png" alt="" @click="handleClick" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/bgBlock.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: left top;
}

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
