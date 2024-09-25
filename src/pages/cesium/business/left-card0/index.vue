<script setup lang="ts">
import Card1 from './Card1.vue'
import Card2 from './Card2.vue'
import Card3 from './Card3.vue'

</script>

<template>
  <div class="wrapper w-[700px] h-full flex flex-col justify-start items-center">
    <Card1></Card1>
    <Card2></Card2>
    <Card3></Card3>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/mapbg.png');
  background-size: 700px 1028px;
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
  content: "";
  width: 14px;
  height: 12px;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url("/images/system/jt.png");
}
</style>
