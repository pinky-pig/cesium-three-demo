<script setup lang="ts"></script>

<template>
  <div
    class="wrapper absolute h-[1060px] w-[700px] animate-in slide-in-from-right-96 ease-in-out duration-700 right-[10px] top-[10px] z-[10]">
    <slot />
  </div>
</template>

<style scoped>
.wrapper {
  /* background-image: url('/images/system/mapbg.png'); */
  background-size: 700px 1028px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
