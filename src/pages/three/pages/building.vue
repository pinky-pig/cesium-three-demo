<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">
import {
  type AmbientLight,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  type PerspectiveCamera,
  type PointLight,
  type Scene,
  type WebGLRenderer,
} from 'three'
import * as dat from 'lil-gui'
import ThreeComponent from '../components/ThreeComponent.vue'
import {
  addFakeGlowEffect,
  addFakeGlowEffectGUI,
} from '../utils/fake-glow/add-fake-glow-effect'
import type { OrbitControls } from 'three/examples/jsm/Addons.js'

let canvas: HTMLElement
let renderer: WebGLRenderer
let scene: Scene
let ambientLight: AmbientLight
let pointLight: PointLight
let camera: PerspectiveCamera
let cameraControls: OrbitControls

const gui = new dat.GUI()

function handleLoad(threeInitData: any) {
  canvas = threeInitData.canvas
  renderer = threeInitData.renderer
  scene = threeInitData.scene
  ambientLight = threeInitData.ambientLight
  pointLight = threeInitData.pointLight
  camera = threeInitData.camera
  cameraControls = threeInitData.cameraControls

  // 添加一个立方体
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new Mesh(geometry, material)
  cube.position.set(2, 0, 0)
  scene.add(cube)

  // 添加模拟辉光 fakeGlow 效果
  const { fakeGlowMaterial } = addFakeGlowEffect(scene)
  addFakeGlowEffectGUI(gui, fakeGlowMaterial)
}
</script>

<template>
  <div class="fixed inset-0">
    <ThreeComponent @onload="handleLoad" />
  </div>
</template>

<style scoped></style>
