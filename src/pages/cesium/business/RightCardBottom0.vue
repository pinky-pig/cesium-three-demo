<script setup lang="ts">
// const store = useAppStore();

function handleClick() { }
</script>

<template>
  <div class="wrapper w-full h-[496px] mt-[30px] pt-[26px] px-[28px] flex flex-col justify-start items-start">
    <!-- 标题 -->
    <div class="w-full h-[20px] flex justify-start items-center mb-[20px]">
      <div class="title">目标分析</div>
    </div>

    <div class="w-full flex justify-center items-center">
      <img class="w-full h-full object-contain" src="/images/system/目标预览.png" alt="" @click="handleClick" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/bgBlock.png');
  background-size: 700px 500px;
  background-repeat: no-repeat;
  background-position: left top;
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
