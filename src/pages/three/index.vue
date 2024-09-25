<script setup lang="ts">

</script>

<template>
  <div
    class=" relative px-[10px] text-text w-screen h-screen flex flex-col items-center justify-start text-center overflow-x-hidden">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
