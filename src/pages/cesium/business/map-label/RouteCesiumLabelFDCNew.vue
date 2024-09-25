<script setup lang="ts">
defineProps<{
  index: number | string, // 序号
  type: string, // 类型
  tbUrl: string, // 图片地址
  dq: string, // 地区
  name: string, // 名称
  fdjxl: number, // 发电机效率
  ncz: string, // 年抽蓄
  ywm: string, // 英文名称
  zjrl: string, // 装机容量
  qdsj: string, // 启动时间
  nylx: string, // 能源类型
  gj: string, // 国家
  wd: string, // 纬度
  gjlx: string, // 关键类型
  scpl: string, // 生成频率
  jd: string, // 经度
  fhxysj: string, // 负荷响应时间
  sbkyl: number, // 设备可用率
  position: number[], // 经纬度
}>();
// 变电站
const isShowMini = ref(true)
const labelContainer = ref<HTMLElement | null>(null)
function handleClick() {
  isShowMini.value = !isShowMini.value

  if (labelContainer.value && labelContainer.value.parentElement) {
    labelContainer.value.parentElement.style.zIndex = isShowMini.value ? '1' : '10'
  }
}
</script>

<template>
  <div ref="labelContainer" class="pointer-events-auto">
    <!-- animate__animated animate__headShake -->
    <div v-if="isShowMini" @click="handleClick"
      class="bg-[#00000090] pointer-events-auto mt-[140px] cursor-pointer py-2 px-4 flex flex-row justify-center items-center gap-2">
      <div>{{ name }}</div>
    </div>

    <div v-else @click="handleClick" class=" wrapper relative text-white w-[328px] h-[175px] ">

      <!-- 名称 -->
      <div class="leading-[46px] text-center font-bold text-[15px] flex-shrink-0">
        {{ name }}
      </div>
      <!-- 状态 -->
      <div class="text-[13px] h-[36px] flex flex-row justify-between items-center px-4 py-1 ">
        <div class="w-[120px]">
          <span>装机总量/</span>
          <span>{{ zjrl }}</span>
        </div>
        <div class="w-[fit-content]">
          <span>年发电量/</span>
          <span>{{ ncz }}</span>
        </div>
      </div>

      <!-- 内容 -->
      <div class="h-[88px] w-[326px] relative flex flex-row justify-start ">
        <div class="ml-[32px] w-[70px] h-[88px] flex flex-col justify-start text-center">
          <div class="text-[16px] font-bold text-[#faf56d] w-full h-[60px] flex justify-center items-center">
            {{ qdsj }}
          </div>
          <div class="text-[14px] text-[#6dabe2]">启动时间</div>
        </div>
        <div class="ml-[14px] w-[100px] h-[88px] flex flex-col justify-start text-center">
          <div class="text-[16px] font-bold text-[#faf56d] w-full h-[60px] flex justify-center items-center">
            {{ fhxysj }}
          </div>
          <div class="text-[14px] text-[#6dabe2]">负荷响应时间</div>
        </div>
        <div class="ml-[12px] w-[70px] h-[88px] flex flex-col justify-start text-center">
          <div class="text-[16px] font-bold text-[#faf56d] w-full h-[60px] flex justify-center items-center">
            {{ sbkyl }}
          </div>
          <div class="text-[14px] text-[#6dabe2]">设备可用率</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/发电站地图底板.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left top;
}
</style>
