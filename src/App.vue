<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <Toaster position="top-center" rich-colors />
</template>
