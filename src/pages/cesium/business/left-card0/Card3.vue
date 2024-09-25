<script setup lang="ts">
// const store = useAppStore();

function handleClick() {
}
</script>

<template>
  <div class=" w-full h-[496px] mt-[10px] pt-[6px] px-[28px] flex flex-col justify-start items-start">
    <!-- 标题 -->
    <div class="w-full h-[20px] flex justify-start items-center mb-[20px] ">
      <div class="title">
        安防设备
      </div>
    </div>

    <div class="w-full flex justify-center items-center">
      <img class="w-full h-full object-contain" @click="handleClick" src="/images/system/安防设备板子.png" alt="">
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
  content: "";
  width: 14px;
  height: 12px;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url("/images/system/jt.png");
}
</style>
