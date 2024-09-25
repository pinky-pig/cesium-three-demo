<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">
import * as Cesium from 'cesium'
import axios from 'axios'
import GUI from 'lil-gui'
import { adjustZoom } from '@/lib/vue'
import CesiumMap from './components/CesiumMap.vue'
import { initEarthCloud } from './utils/setup-dynamic-cloud'
import { setupCameraChangedEvents } from './utils/setup-camera-changed-events'
import {
  initChinaArea,
  initEarthArea,
  initNanjingArea,
} from './utils/setup-china-area'
import { initScrollingWall } from './utils/dynamic-wall/add-scroll-wall'
import { addWaveCircle } from './utils/wave-circle/add-wave-circle'
import { setupEarthDisplay } from './utils/setup-earth-display'
import { addBuildingModels } from './utils/add-building-models'
import { removeSceneMask, setupSceneMask } from './utils/setup-scene-mask'
import { setupEarthBaseMap } from './utils/setup-earth-base-map'
import { setupModifyMapTheme } from './utils/setup-modify-map-theme'
import { setupScreenSpaceEvent } from './utils/setup-screen-space-event'
import { setupSceneMouseEvent } from './utils/setup-scene-mouse-event'
import { setupScreenCameraMoveEndEvent } from './utils/setup-scene-camera-move-end-event'
import { setupEarthGlowBackground } from './utils/setup-earth-glow-background'

import TopTitle from './business/TopTitle.vue'
import LeftContainer from './business/LeftContainer.vue'
import RightContainer from './business/RightContainer.vue'
import LeftCard0 from './business/left-card0/index.vue'
import LeftCard1 from './business/LeftCard1.vue'
import LeftCard2 from './business/left-card2/index.vue'
import RightCard2 from './business/right-card2/index.vue'
import CardList from './business/CardList/index.vue'
import RightCard0 from './business/right-card0/index.vue'
import RightCardBottom0 from './business/RightCardBottom0.vue'
import RightCardBottom1 from './business/RightCardBottom1.vue'
import RightCardBottom2 from './business/RightCardBottom2.vue'
import DDZXWebGLIframe from './business/DDZXWebGLIframe.vue'
import BDZWebGLIframe from './business/BDZWebGLIframe.vue'
import TopStatus from './business/TopStatus.vue'
import RoutePlaning from './business/route-planing/index.vue'
import { handleInGlobeEarth, handleInNearEarth } from './business/business'
import { setupScenePreRender } from './utils/setup-scene-pre-render'
import { initGradientWall } from './utils/add-gradient-wall'
import { addTileset } from './utils/add-tileset'
import { setupScreenTouchZoomEvent } from './utils/setup-scene-touch-zoom-events'
// const gui = new GUI()

let viewer: Cesium.Viewer | null = null

const options = {
  // 截至2024，官方底图时长会加载不出来，导致底图卡顿，影响操作。
  // 添加这几行，就不会找烦人的defaultAccessToken了，也不会找在线底图了
  baseLayer: false,
  baseLayerPicker: false,
  imageryProvider: false,

  requestRenderMode: true, // 仅在需要渲染时触发渲染
  // maximumRenderTimeChange: Number.POSITIVE_INFINITY, // 无限时间内保持最后一次渲染

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
}

onMounted(() => {
  /**
   * 页面尺寸变化时，调整组件缩放比例
   */
  const dom = document.querySelector('.components-layout')
  if (dom) {
    adjustZoom(dom as HTMLElement)
    window.addEventListener('resize', () => {
      adjustZoom(dom as HTMLElement)
    })
  }
})
function initCesiumViewer(map: any) {
  viewer = map
  if (viewer === null) return

  // 0、取消默认的单击和双击事件，右上角弹窗很丑
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK,
  )
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  )

  // 背景透明
  // viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0)
  // 球的默认底色
  viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#1a232e')
  // 禁用大气效果
  viewer.scene.skyAtmosphere.show = false
  // 禁用星空背景
  viewer.scene.skyBox.show = false
  // 禁用地表光照效果，白色光晕
  viewer.scene.globe.enableLighting = false
  // 关闭阴影（比如模型阴影）
  viewer.shadows = false

  // 最小缩放高度（米）
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 200
  // 最大缩放高度（米）
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000000

  // FPS
  viewer.scene.debugShowFramesPerSecond = true

  // 1. 设置摄像机的视角,定位到中国上空
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(104.1954, 35.8617, 30000000), // 经纬度坐标（中国的中心点）和高度（3000公里）
    orientation: {
      heading: Cesium.Math.toRadians(0), // 方向（0度表示北）
      pitch: Cesium.Math.toRadians(-90), // 俯仰角（-90度表示从上往下看）
      roll: 0, // 滚转角（保持水平）
    },
  })

  // 设置鼠标右键调整视角
  setupSceneMouseEvent(viewer!)
  setupScreenCameraMoveEndEvent(viewer!)
  // 加载地图瓦片
  setupEarthBaseMap(viewer!)
  let tileset: any
  addBuildingModels(viewer!).then((ts) => {
    tileset = ts
  })

  // 2. 初始化地球的云
  initEarthCloud(viewer)
  setupEarthGlowBackground(viewer)
  // 3. 初始化地球的默认图片
  setupEarthDisplay(viewer!, 2)
  // 4. 初始化中国区域
  initChinaArea(viewer)
  // 3. 初始化南京区域
  initNanjingArea(viewer)

  // 4. 初始化事件监听
  setupCameraChangedEvents(viewer)
  setupScreenSpaceEvent(viewer)
  setupScreenTouchZoomEvent(viewer)
  setupScenePreRender(viewer)
}
</script>

<template>
  <div class="fixed inset-0 overflow-hidden">
    <CesiumMap :options="options" @onload="initCesiumViewer" />

    <!-- 弹窗 -->
    <div id="cesium-overlay" />
  </div>
</template>
