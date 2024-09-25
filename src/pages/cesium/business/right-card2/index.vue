<script setup lang="ts">
import CesiumMap from '../../components/CesiumMap.vue'

import * as Cesium from 'cesium'
import { setupEarthBaseMap } from '../../utils/setup-earth-base-map';
import { hawkeyeLogic, setHawkeyeLineActive } from './logic'

function handleClick() {

}


let viewer: Cesium.Viewer | null = null
const options = {
  baseLayer: false,
  baseLayerPicker: false,
  imageryProvider: false,

  geocoder: false,
  sceneModePicker: false,
  animation: false,
  timeline: false,
  navigationHelpButton: false,
  contextOptions: {
    webgl: {
      alpha: true,
    },
  },

  sceneMode: Cesium.SceneMode.SCENE2D, // 设置为二维模式
  mapProjection: new Cesium.WebMercatorProjection(),
}

function initCesiumViewer(map: any) {
  viewer = map
  if (viewer === null) return

  viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#1a232e')

  // 1. 设置摄像机的视角,定位到中国上空
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(104.1954, 35.8617, 30000000), // 经纬度坐标（中国的中心点）和高度（3000公里）
    orientation: {
      heading: Cesium.Math.toRadians(0), // 方向（0度表示北）
      pitch: Cesium.Math.toRadians(-90), // 俯仰角（-90度表示从上往下看）
      roll: 0, // 滚转角（保持水平）
    },
  })

  setupEarthBaseMap(viewer)
  hawkeyeLogic(viewer)
}

const currentLine = ref(1)
const lineSelectOptions = [
  { value: 1, label: '路径1', },
  { value: 2, label: '路径2', },
]
function handleSelectLineChange(val: number) {
  setHawkeyeLineActive(viewer!, val)
}
</script>

<template>
  <div class=" w-full h-full flex flex-col justify-start items-center">

    <div class="mt-[20px] w-full h-[calc(100%_-_72px)] ">
      <!-- 目标分析 -->
      <div class="wrapper w-full h-[496px] pt-[26px] px-[28px] flex flex-col justify-start items-start">
        <div class="w-full h-[20px] flex justify-start items-center mb-[20px] ">
          <div class="title">
            目标分析
          </div>
        </div>

        <div class="w-full flex-1 pb-[18px] flex justify-center items-center">
          <img class="w-full h-full object-contain" @click="handleClick" src="/images/system/变电站目标分析面板.png" alt="">
        </div>
      </div>


      <!-- 路径鹰眼 -->
      <div class="wrapper mt-[40px] w-full h-[496px] pt-[26px] px-[28px] flex flex-col justify-start items-start">
        <div class="w-full h-[20px] flex justify-start items-center mb-[20px] ">
          <div class="title">
            路径鹰眼
          </div>
        </div>

        <div class="w-full flex-1 pb-[18px] flex justify-center items-center relative">

          <div
            class="absolute  text-white z-[10] top-0 left-0 w-full h-[40px] pointer-events-none flex justify-center items-center">
            <div class="flex flex-col justify-center items-end mt-8">
              <div class="text-[14px] flex flex-row justify-center items-center">
                <img class="w-[22px] h-[22px] object-contain mr-[4px]" src="/images/system/路径icon.png" alt="">
                当前选中路径
              </div>

              <el-select @change="handleSelectLineChange" class="pointer-events-auto" v-model="currentLine"
                placeholder="Top5" style="
                  width: 84px;
                  --el-fill-color-blank: #ff000090;
                  --el-border-color: #ffffff00;
                  --el-text-color-placeholder: #ffffff !important;
                  
                ">
                <el-option v-for="item in lineSelectOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>

            </div>

            <div class="absolute right-2 top-0 w-fit h-[40px] flex justify-center items-center">
              <div>
                共计 &nbsp;
                <span class="text-[#fee695] text-[20px]">三条</span>
                &nbsp;规划路径
              </div>
            </div>
          </div>
          <CesiumMap :options="options" @onload="initCesiumViewer" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
:deep(.el-select__placeholder) {
  --el-text-color-regular: #ffffff !important;
}

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
  content: "";
  width: 14px;
  height: 12px;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url("/images/system/jt.png");
}
</style>
