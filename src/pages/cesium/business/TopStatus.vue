<script setup lang="ts">
const store = useAppStore()
function handleClick() {
  store.currentAppStatus = '路径规划'
}
</script>

<template>
  <Transition name="bounce">
    <div v-if="store.currentSelectTarget && store.currentAppStatus === '目标优选'"
      class="h-fit pointer-events-none fixed w-full top-[140px] left-0 flex justify-center items-center">
      <div class="wrapper pointer-events-auto flex flex-row items-center justify-center">
        <div class="text-[20px]">{{ store.currentSelectTarget.name }}</div>
        <div class="button hover:opacity-90 cursor-pointer flex justify-center items-center" @click="handleClick">
          确定
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.wrapper {
  width: fit-content;
  gap: 20px;
  height: 60px;
  background-color: #00000090;
  border: 1px solid blue;
  border-radius: 50px;
  color: white;
  padding-left: 30px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.button {
  background: #92d050;
  height: 100%;
  width: 100px;
  border-radius: 50px;
}
</style>
