<script setup lang="ts">
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
    <img v-if="isShowMini" class="mt-[260px]" @click="handleClick" src="/images/system/肉鸡缩略面板.png" alt="">
    <img v-else @click="handleClick" src="/images/system/肉鸡面板.png" alt="">
  </div>
</template>

<style scoped></style>
