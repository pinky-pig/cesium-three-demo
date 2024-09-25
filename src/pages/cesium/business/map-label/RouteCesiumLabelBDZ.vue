<script setup lang="ts">
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
    <img v-if="isShowMini" class="mt-[200px]" src="/images/system/变电站标牌.png" alt="" @click="handleClick" />
    <img v-else src="/images/system/route东善桥变电站面板.png" alt="" @click="handleClick" />
  </div>
</template>

<style scoped></style>
