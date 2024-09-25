<script setup lang="ts">
function handleClick() { }
</script>

<template>
  <div class="wrapper w-full h-full flex flex-col justify-start items-center">
    <div class="mt-[40px] w-full h-[calc(100%_-_72px)] px-[28px]">
      <!-- 路径计算 -->
      <div class="w-full h-[20px] flex justify-start items-center mb-[20px]">
        <div class="title">路径计算</div>
      </div>
      <div class="w-full h-[620px] relative">
        <!-- 上面的路径成功率、低成本、隐蔽性 -->
        <div class="w-[710px] h-[73px] absolute top-[0px] left-[10px] z-[3]">
          <div
            class="w-[197px] h-[71px] cursor-pointer border-2 border-[#ffff0000] hover:border-[#ffff00] rounded-[13px] absolute top-[0] left-[0]" />
          <div
            class="w-[197px] h-[71px] cursor-pointer border-2 border-[#ffff0000] hover:border-[#ffff00] rounded-[13px] absolute top-[0] left-[256px]" />
          <div
            class="w-[197px] h-[71px] cursor-pointer border-2 border-[#ffff0000] hover:border-[#ffff00] rounded-[13px] absolute top-[0] right-[0]" />
        </div>

        <!-- 下面的路径规划的按钮 -->
        <div
          class="rounded-[20px] z-[1] border-[2px] border-[#05633b] bg-[#05633b40] w-[697px] h-[119px] absolute top-[173px] left-[27px]">
          <img class="w-[50px] h-[50px] absolute top-[30px] left-[-50px]" src="/images/system/路径计算icon.png" alt="" />
        </div>

        <!-- 路径计算面板展示 -->
        <img class="w-full h-full object-cover relative z-[2] cursor-pointer" src="/images/system/路径计算.png" alt=""
          @click="handleClick" />
      </div>

      <!-- 路径详情 -->
      <div class="w-full h-[20px] flex justify-start items-center my-[20px]">
        <div class="title">路径详情</div>
      </div>
      <div class="w-full h-[250px]">
        <img class="w-full h-full object-cover" src="/images/system/路径详情.png" alt="" />
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
