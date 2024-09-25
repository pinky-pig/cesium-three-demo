<script setup lang="ts">
import {
  AmbientLight,
  AxesHelper,
  GridHelper,
  MOUSE,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { resizeRendererToDisplaySize } from '../utils/setup-resize-renderer-to-display-size'

const emit = defineEmits(['onload'])

const canvasContainer = ref<HTMLCanvasElement | null>(null)

let canvas: HTMLElement
let renderer: WebGLRenderer
let scene: Scene
let ambientLight: AmbientLight
let pointLight: PointLight
let camera: PerspectiveCamera
let axesHelper: AxesHelper
let cameraControls: OrbitControls

onMounted(() => {
  initThree()
  animate()
})

function initThree() {
  // ===== 🖼️ 画布, 渲染, & 场景 =====
  {
    canvas = canvasContainer.value!
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    scene = new Scene()
  }

  // ===== 🎥 相机 =====
  {
    camera = new PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    )
    camera.position.set(2, 2, 5)
  }

  // ===== 💡 灯光 =====
  {
    ambientLight = new AmbientLight('white', 0.4)
    pointLight = new PointLight('white', 20, 100)
    pointLight.position.set(-2, 2, 2)
    pointLight.castShadow = true
    pointLight.shadow.radius = 4
    pointLight.shadow.camera.near = 0.5
    pointLight.shadow.camera.far = 4000
    pointLight.shadow.mapSize.width = 2048
    pointLight.shadow.mapSize.height = 2048
    scene.add(ambientLight)
    scene.add(pointLight)
  }

  // ===== 🕹️ 控制器 =====
  {
    cameraControls = new OrbitControls(camera, canvas)

    // 鼠标控制方式
    // cameraControls.mouseButtons = {
    //   LEFT: MOUSE.RIGHT, // 左键 -> 旋转
    //   RIGHT: MOUSE.LEFT, // 右键 -> 平移
    //   MIDDLE: MOUSE.MIDDLE, // 中键不变，保持缩放功能
    // }

    // 阻尼效果
    cameraControls.enableDamping = false
    // 自动旋转
    cameraControls.autoRotate = false
    cameraControls.update()
  }

  // ===== 🪄 网格 =====
  {
    axesHelper = new AxesHelper(4)
    axesHelper.visible = false
    scene.add(axesHelper)

    const gridHelper = new GridHelper(20, 20, 'teal', 'darkgray')
    gridHelper.position.y = -0.01
    scene.add(gridHelper)
  }

  emit('onload', {
    renderer,
    scene,
    camera,
    cameraControls,
    axesHelper,
    canvas,
  })
}
function animate() {
  requestAnimationFrame(animate)

  // 渲染器
  renderer.clear()
  renderer.clearDepth()

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  cameraControls.update()

  renderer.render(scene, camera)
}
</script>

<template>
  <canvas ref="canvasContainer" class="h-full w-full" />
</template>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
  outline: none;

  background: rgb(34, 193, 195);
  background: linear-gradient(0deg,
      rgb(8, 163, 166) 0%,
      rgba(79, 166, 167, 0.849) 8%,
      rgba(61, 79, 94, 0.885) 40%,
      rgb(17, 19, 23));
}
</style>
