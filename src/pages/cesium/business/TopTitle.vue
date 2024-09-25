<script lang="ts" setup>
const store = useAppStore()
</script>

<template>
  <div
    class="pointer-events-none w-full min-h-[150px] h-[150px] z-[calc(infinity)] flex justify-center items-start absolute top-0 left-0 bg-center bg-no-repeat bg-cover bg-[url('/images/system/title-Background.png')]">
    <h1 class="text-[50px] leading-[60px] font-bold text-[#82fae4] mt-1 mx-auto">
      {{ store.appTitle }}
    </h1>

    <div class="header-title flex pointer-events-auto">
      <div :class="store.currentAppStatus === store.appStatus[0] ? 'text-[#00ffff]' : ''
        " style="cursor: pointer">
        {{ store.appStatus[0] }}
      </div>
      <div class="w-[2px] h-[45px]" style="background: rgba(0, 255, 255, 1); transform: rotate(-30deg)" />
      <div :class="store.currentAppStatus === store.appStatus[1] ? 'text-[#00ffff]' : ''
        " style="cursor: pointer">
        {{ store.appStatus[1] }}
      </div>
      <div class="w-[2px] h-[40px]" style="background: rgba(0, 255, 255, 1)" />
      <div :class="store.currentAppStatus === store.appStatus[2] ? 'text-[#00ffff]' : ''
        " style="cursor: pointer">
        {{ store.appStatus[2] }}
      </div>
      <div class="w-[2px] h-[45px]" style="background: rgba(0, 255, 255, 1); transform: rotate(30deg)" />
      <div :class="store.currentAppStatus === store.appStatus[3] ? 'text-[#00ffff]' : ''
        " style="cursor: pointer">
        {{ store.appStatus[3] }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-title {
  position: absolute;
  bottom: 30px;
  width: 980px;
  height: 40px;
  z-index: 10;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  padding: 0 206px 0 192px;
  box-sizing: border-box;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  text-align: center;

  .active {
    color: #00ffff;
  }
}
</style>
