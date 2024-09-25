import * as Cesium from 'cesium'
import * as THREE from 'three'

export function setupThreeLayerToCesium(
  viewer: Cesium.Viewer,
  threeRef?: Ref<HTMLDivElement> | string,
) {
  const position = Cesium.Cartesian3.fromDegrees(102.054019, 38.43265, 5)

  // 1. 获取容器 DOM 节点
  let threeContainer = null
  if (!threeRef) {
    // three不存在，则创建一个占满全屏的容器
    threeContainer = document.createElement('div')
    threeContainer.id = 'three'
    threeContainer.style.position = 'fixed'
    threeContainer.style.inset = '0'
    threeContainer.style.pointerEvents = 'none'
    document.body.append(threeContainer)
  } else if (threeRef instanceof String) {
    threeContainer = document.querySelector('#three')
  } else {
    threeContainer = (threeRef as Ref).value
  }

  // 2. 初始化场景、相机和渲染器
  const threeScene = new THREE.Scene()
  const threeCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    50000000,
  )
  const threeRenderer = new THREE.WebGLRenderer({ alpha: true })
  threeRenderer.setSize(window.innerWidth, window.innerHeight)
  threeContainer?.append(threeRenderer.domElement)

  // 3. 设置相机位置和方向
  viewer.camera.lookAt(position, new Cesium.Cartesian3(200, 500, 300))
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)

  function updateThreeJS() {
    // 更新 Three.js 相机视场角以匹配 Cesium 相机的垂直视场角
    threeCamera.fov = Cesium.Math.toDegrees((viewer.camera.frustum as any).fovy)
    threeCamera.updateProjectionMatrix()
    const cesiumCamera = viewer.camera
    const cvm = cesiumCamera.viewMatrix
    const civm = cesiumCamera.inverseViewMatrix

    // 更正从矩阵中提取相机位置和方向的方法
    const cameraPosition = Cesium.Cartesian3.fromElements(
      civm[12],
      civm[13],
      civm[14],
    )
    const cameraDirection = new Cesium.Cartesian3(-cvm[2], -cvm[6], -cvm[10])
    const cameraUp = new Cesium.Cartesian3(cvm[1], cvm[5], cvm[9])

    const cameraPositionVec3 = new THREE.Vector3(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z,
    )
    const cameraDirectionVec3 = new THREE.Vector3(
      cameraDirection.x,
      cameraDirection.y,
      cameraDirection.z,
    )
    const cameraUpVec3 = new THREE.Vector3(cameraUp.x, cameraUp.y, cameraUp.z)

    // 更新 Three.js 相机位置和方向
    threeCamera.position.copy(cameraPositionVec3)
    threeCamera.up.copy(cameraUpVec3)
    threeCamera.lookAt(cameraPositionVec3.clone().add(cameraDirectionVec3))

    // 使用更新后的相机渲染场景
    threeRenderer.render(threeScene, threeCamera)
  }

  // 4. 监听窗口大小变化并更新渲染器大小和相机比例
  window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight

    threeRenderer.setSize(width, height)
    threeCamera.aspect = width / height
    threeCamera.updateProjectionMatrix()
  })

  // 5. 开始渲染循环
  function renderLoop() {
    window.renderLoop = requestAnimationFrame(renderLoop)
    viewer.render()
    updateThreeJS()
  }
  renderLoop()

  return {
    threeCamera,
    threeContainer,
    threeRenderer,
    threeScene,
  }
}

export function removeThreeLayerFromCesium(
  viewer: Cesium.Viewer,
  threeCamera: THREE.PerspectiveCamera,
  threeContainer: HTMLDivElement | null,
  threeRenderer: THREE.WebGLRenderer,
  threeScene: THREE.Scene,
) {
  // 1. 停止渲染循环
  if (window.renderLoop) {
    cancelAnimationFrame(window.renderLoop)
    delete window.renderLoop
  }

  // 2. 移除 Three.js 相关资源
  if (threeContainer) {
    threeRenderer.domElement.remove()
    threeContainer.remove()
  }

  // 3. 清理 Three.js 资源
  if (threeRenderer) {
    // 释放 WebGL 渲染器的资源
    threeRenderer.dispose()
  }

  if (threeScene) {
    // 递归移除场景中的所有对象
    threeScene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      }
    })
  }

  if (threeCamera) {
    // Camera 对象不需要特别的清理
  }

  // 4. 移除事件监听器
  window.removeEventListener('resize', handleResize)

  function handleResize() {
    const width = window.innerWidth
    const height = window.innerHeight

    threeRenderer.setSize(width, height)
    threeCamera.aspect = width / height
    threeCamera.updateProjectionMatrix()
  }
}

export function createColoredCube() {
  const size = 50
  const geometry = new THREE.BoxGeometry(size, size, size)

  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Right face - Red
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Left face - Green
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top face - Blue
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom face - Yellow
    new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Front face - Cyan
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Back face - Magenta
  ]

  const cube = new THREE.Mesh(geometry, materials)
  return cube
}
