<script setup lang="ts">
defineProps<{
  name?: string // 名称
  type?: string // 类型
  position?: any // 类型
  dq: string // 地区
  dydj: string // 电压等级
  byqrl: string // 变压器容量
  gjyylx: string // 关基应用类型
  gjdz: string // 关基地址
  fhl: string | number // 负荷率
  ywm: string // 英文名
  gj: string // 国家
  wd: string // 纬度
  gjms: string // 关基描述
  gjlx: string // 关基类型
  jd: string // 经度
}>()
// 变电站
const isShowMini = ref(true)
const labelContainer = ref<HTMLElement | null>(null)
function handleClick() {
  isShowMini.value = !isShowMini.value

  if (labelContainer.value && labelContainer.value.parentElement) {
    labelContainer.value.parentElement.style.zIndex = isShowMini.value
      ? '1'
      : '10'
  }
}
</script>

<template>
  <div ref="labelContainer" class="pointer-events-auto">
    <!-- animate__animated animate__headShake -->
    <div v-if="isShowMini"
      class="bg-[#00000090] pointer-events-auto mt-[140px] cursor-pointer py-2 px-4 flex flex-row justify-center items-center gap-2"
      @click="handleClick">
      <div>{{ name }}</div>
    </div>

    <div v-else class="wrapper relative text-white w-[328px] h-[175px]" @click="handleClick">
      <!-- 名称 -->
      <div class="leading-[46px] text-center font-bold text-[15px] flex-shrink-0">
        {{ name }}
      </div>
      <!-- 状态 -->
      <div class="text-[13px] h-[36px] flex flex-row justify-between items-center px-4 py-1">
        <div class="w-[134px]">
          <span>变电器容量/</span>
          <span>{{ byqrl }}</span>
        </div>
        <div class="w-[120px]">
          <span>电压等级/</span>
          <span>{{ dydj }}</span>
        </div>
      </div>

      <!-- 内容 -->
      <div class="h-[70px] w-[326px] word-spacing-normal text-pretty mt-[6px] text-[13px] px-[16px] overflow-auto">
        <p>
          {{ gjms }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/变电站地图底板.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left top;
}
</style>
