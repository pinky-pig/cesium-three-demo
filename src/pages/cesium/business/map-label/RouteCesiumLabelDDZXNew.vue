<script setup lang="ts">
defineProps<{
  index: number | string, // 索引
  type: string, // 类型
  tbUrl: string, // 图片地址
  name: string, // 名称
  sbhyjd: string, // 设备行业及等级
  gnms: string, // 功能描述
  dwzynl: string, // 单位资源能力
  ddxtrcnl: string, // 调度系统投入能力
  xqxycyl: string, // 下级系统协同运行能力
  dwlyl: string, // 单位能源利用
  xlgzl: string, // 下级攻击能力
  znjkfgl: string, // 智能监控管理
  position: number[], // 位置
  dlgxphl: number, // 定量关系匹配率
  yxxl: number | string, // 运行效率
  jsjdsl: string, // 计算节点数量
  dlshl: string, // 动力损耗率
  fhyczql: number, // 反馈异常处理率
  zdhddl: string, // 调度负荷调度能力
  hqdcgl: number, // 情报调度管理
  fdjhzql: number | string, // 计划准确度
  lyjdsl: string, // 雷源节点数量
  xtwdxzb: string, // 系统稳定性指标
  sjcjyfxzqx: string, // 数据采集与分析执行效期
  ddjjx: string, // 调度经济性
  xqxysxx: string, // 下级系统响应速度
  dyhgl: number, // 电源合格率
  wgbcxg: string, // 微观补偿效果
  bdnyyczqx: string, // 部段能源优化执行效期
  ddxysj: string, // 调度响应时间
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
          <span>计划准确度/</span>
          <span>{{ fdjhzql }}</span>
        </div>
        <div class="w-[120px]">
          <span>运行效率/</span>
          <span>{{ yxxl }}</span>
        </div>
      </div>

      <!-- 内容 -->
      <div class="h-[70px] w-[326px]  word-spacing-normal text-pretty mt-[6px] text-[13px] px-[16px] overflow-auto">
        <p>
          {{ gnms }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/调度中心地图底板.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left top;
}
</style>
