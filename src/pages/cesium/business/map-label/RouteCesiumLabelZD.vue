<script setup lang="ts">
import Charts from './Charts.vue'
defineProps<{
  name?: string, // 名称
  type?: string, // 类型
  zdbh?: string, // 阵地编号
  zdzt?: string, // 阵地状态
  zdzyqd?: string, // 阵地资源清单
  gjyipdz?: string, // 攻击源 IP 地址
  zdnlldt: any // 雷达图数据
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
    <div v-if="isShowMini" @click="handleClick"
      class="bg-[#00000090] pointer-events-auto mt-[264px] cursor-pointer py-2 px-4 flex flex-row justify-center items-center gap-2">
      <div>{{ name }}</div>
    </div>

    <div v-else @click="handleClick"
      class="wrapper relative text-white w-[260px] h-[300px] flex flex-col justify-start">

      <!-- 名称 -->
      <div class="leading-[30px] text-center font-bold text-[15px]">
        【{{ type }}】{{ name }}
      </div>
      <!-- 状态 -->
      <div class="text-[13px] h-[64px] flex flex-col justify-around items-start px-4 py-1 text-[#00ff00]">
        <div class="">
          <span>阵地编号：</span>
          <span>{{ zdbh }}</span>
        </div>
        <div>
          <span>阵地状态：</span>
          <span>{{ zdzt }}</span>
        </div>
        <div>
          <span>阵地资源清单：</span>
          <span>{{ zdzyqd }}</span>
        </div>
      </div>
      <!-- ip -->
      <div class="flex flex-row justify-center items-center text-[13px] leading-[25px]">
        <span class="text-white">攻击源 IP 地址：</span>
        <span class="text-[#e37c2e]">{{ gjyipdz }}</span>
      </div>

      <!-- 雷达图 -->
      <div class="mt-[6px] flex flex-row justify-center items-center text-[13px] leading-[25px]">
        <span class="text-white">阵地能力</span>
      </div>
      <div class="w-full !h-[148px]">
        <Charts :data="JSON.parse(zdnlldt)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/阵地底板.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left top;
}
</style>
