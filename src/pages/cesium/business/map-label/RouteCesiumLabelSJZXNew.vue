<script setup lang="ts">
defineProps<{

  index: number | string, // 序号
  type: string,
  tbUrl: string,
  sbhyjd: string,
  PUE: string,
  lyjdsl: string,
  ccxn: string,
  name: string,
  wlxn: string,
  aqx: string,
  bz: string,
  position: number[],
  jsjdsl: string,
  CDNsl: string,
  jsxn: string,
  kkx: string | number,
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
      <div class="leading-[28px] text-center font-bold text-[15px] flex-shrink-0">
        {{ name }}
      </div>
      <!-- 状态 -->
      <div class="text-[13px] h-[82px] flex flex-col justify-around items-start px-4 py-1 text-[#00ff00]">
        <div class="">
          <span>计算性能：</span>
          <span>{{ jsxn }}</span>
        </div>
        <div>
          <span>网络性能：</span>
          <span>{{ wlxn }}</span>
        </div>
        <div>
          <span>安全情况：</span>
          <span class="word-spacing-normal">{{ aqx }}</span>
        </div>
      </div>

      <!-- 内容 -->
      <div class="h-[70px] w-[326px]  word-spacing-normal text-pretty mt-[6px] text-[13px] px-[16px] overflow-auto">
        <p>
          {{ bz }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/数据中心地图底板.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left top;
}
</style>
