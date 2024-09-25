<script setup lang="ts">
const store = useAppStore()

function handleClick() {
  store.appShowBDZIframe = false
}

const currentWebGLUrl = ref('')
onMounted(() => {
  currentWebGLUrl.value = window._variables.bdzWebGLUrl
  // currentWebGLUrl.value = 'http://localhost:8082/BDZDemo/index.html'
})
</script>

<template>
  <div
    class="wrapper absolute right-[10px] z-[20] top-[26px] w-[1320px] h-[1028px] flex flex-col justify-start items-center">
    <!-- 标题 -->
    <div class="mt-[40px] w-full h-[calc(100%_-_72px)] px-[28px]">
      <div class="w-full h-[20px] flex justify-start items-center mb-[20px]" @click="handleClick">
        <div class="title">变电站</div>
      </div>
      <div class="w-full h-[calc(100%_-_28px)]">
        <iframe class="w-full h-full" :src="currentWebGLUrl" frameborder="0" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/mapbg.png');
  background-size: 1320px 1028px;
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
