<script setup lang="ts">
const props = defineProps<{ name: string; star?: string }>()

const store = useAppStore()
function handleClick() {
  if (props.name.includes('变电站')) {
    store.appShowBDZIframe = true
    store.appShowDDZXIframe = false
  } else {
    store.appShowBDZIframe = false
    store.appShowDDZXIframe = true
  }
}
</script>

<template>
  <div
    class="bg-[#00000090] cursor-pointer py-2 px-4 flex flex-row justify-center items-center gap-2"
    @click="handleClick"
  >
    <div v-show="star" class="text-[#ff0000]">{{ star }} ☆</div>
    <div>{{ name }}</div>
  </div>
</template>

<style scoped></style>
