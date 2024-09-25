<script setup lang="ts">
import TerminalWindow from './TerminalWindow.vue'
const { counter, pause } = useInterval(150, { controls: true })

watch(counter, () => {
  if (counter.value >= 100) {
    pause()
  }
})

const isShowTextAnimatePanel = defineModel()
function handleClick() {
  isShowTextAnimatePanel.value = false
}
</script>

<template>
  <div
    class="pointer-events-auto w-[1200px] h-[600px] text-[24px] rounded-2xl bg-gradient-to-b from-[#141d2df0] to-[#182c4cf0] border-2 border-[#566a90] text-white">
    <div class="w-full flex justify-center items-center mt-4">
      <div class="text-[36px] tracking-[4px]">
        {{ counter === 100 ? '路径规划完成' : '路径规划中...' }}
      </div>
    </div>

    <div class="w-full my-10 px-8">
      <el-progress :percentage="Number(counter)" :stroke-width="30" striped />
    </div>

    <div class="w-full my-2 px-8 h-[340px]">
      <TerminalWindow />
    </div>

    <div class="px-8 mt-4 w-full flex justify-center items-center">
      <el-button :disabled="counter !== 100" class="w-[120px] !h-[40px] !text-[20px]" round type="primary"
        @click="handleClick">确 &nbsp;&nbsp;&nbsp;定</el-button>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-progress__text) {
  color: white !important;
}
</style>
