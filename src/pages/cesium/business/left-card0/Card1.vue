<script setup lang="ts">
const store = useAppStore()

function handleClick() {
  store.currentAppStatus = '目标优选'
  store.appLeftShowIndex = 1
  store.appRightBottomShowIndex = 0
}
</script>

<template>
  <div class="w-full h-[496px] mt-[30px] pt-[26px] px-[28px] flex flex-col justify-start items-start">
    <!-- 标题 -->
    <div class="w-full h-[20px] flex justify-start items-center mb-[20px]">
      <div class="title">目标城市/行业</div>
    </div>

    <div class="w-full flex justify-center items-center relative">
      <div
        class="w-[92px] h-[102px] cursor-pointer border-2 border-[#5573c500] hover:border-[#5573c5] rounded-[6px] absolute top-[122px] left-[213px]"
        @click="handleClick" />

      <img class="w-full h-full object-contain" src="/images/system/目标城市行业.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
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
