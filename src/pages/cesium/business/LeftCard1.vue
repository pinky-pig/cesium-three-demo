<script setup lang="ts">
const store = useAppStore()

function handleClick() {
  store.currentAppStatus = '综合态势'
  store.appLeftShowIndex = 0
  store.appRightBottomShowIndex = -1
}
</script>

<template>
  <div class="wrapper w-full h-full flex flex-col justify-start items-center">
    <div class="mt-[40px] w-full h-[calc(100%_-_72px)] px-[28px]">
      <div class="cursor-pointer w-full h-[20px] flex justify-start items-center mb-[20px]" @click="handleClick">
        <div class="title">电力行业</div>
      </div>
      <div class="w-full h-[calc(100%_-_40px)]">
        <img class="w-full h-full object-cover" src="/images/system/电力行业大面板.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/mapbg.png');
  background-size: 800px 1028px;
  background-repeat: no-repeat;
  background-position: center;
}

.title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  margin-left: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title::before {
  position: absolute;
  content: '';
  width: 14px;
  height: 12px;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url('/images/system/jt.png');
}
</style>
