import * as Cesium from 'cesium'

export function setupEarthSkybox(viewer: Cesium.Viewer) {
  // 自定义天空盒图像路径（根据你存放的路径进行调整）
  viewer.scene.skyBox = new Cesium.SkyBox({
    sources: {
      positiveX: '/images/skybox/tycho2t3_80_px.jpg', // 右
      negativeX: '/images/skybox/tycho2t3_80_mx.jpg', // 左
      positiveY: '/images/skybox/tycho2t3_80_py.jpg', // 上
      negativeY: '/images/skybox/tycho2t3_80_my.jpg', // 下
      positiveZ: '/images/skybox/tycho2t3_80_pz.jpg', // 前
      negativeZ: '/images/skybox/tycho2t3_80_mz.jpg', // 后
    },
  })

  // 聚焦到整个地球
  viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(104.1954, 35.8617, 30000000), // 经纬度坐标（中国的中心点）和高度（3000公里）
    orientation: {
      heading: Cesium.Math.toRadians(0), // 方向（0度表示北）
      pitch: Cesium.Math.toRadians(-90), // 俯仰角（-90度表示从上往下看）
      roll: 0, // 滚转角（保持水平）
    },
  })
  // 可选：禁用大气层以获得更干净的星空
  viewer.scene.skyAtmosphere.show = false
}

export function removeEarthSkybox(viewer: Cesium.Viewer) {
  // 移除天空盒
  ; (viewer.scene.skyBox as any) = null
  // 设置背景颜色
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#07132d')
}
