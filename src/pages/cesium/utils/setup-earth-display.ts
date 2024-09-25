import * as Cesium from 'cesium'
const dayImageUrl = '/images/earth-display/8k_earth_daymap.jpg'
const nightImageUrl = '/images/earth-display/8k_earth_nightmap.jpg'
const nomalImageUrl = '/images/earth-display/world.jpg'

// 创建并定义白天地图的 URL
const dayTileImageryProvider = new Cesium.SingleTileImageryProvider({
  rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90), // 设置图片的地理范围
  tileHeight: 4096,
  tileWidth: 8192,
  url: dayImageUrl,
})

// 创建并定义夜间地图的 URL
const nightTileImageryProvider = new Cesium.SingleTileImageryProvider({
  rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90), // 设置图片的地理范围
  tileHeight: 4096,
  tileWidth: 8192,
  url: nightImageUrl,
})

// 创建并定义夜间地图的 URL
const normalTileImageryProvider = new Cesium.SingleTileImageryProvider({
  rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90), // 设置图片的地理范围
  tileHeight: 4096,
  tileWidth: 8192,
  url: nomalImageUrl,
})

const imageryLayers = [
  dayTileImageryProvider,
  nightTileImageryProvider,
  normalTileImageryProvider,
]

let currentImagery: Cesium.ImageryLayer | null
export function setupEarthDisplay(
  viewer: Cesium.Viewer,
  isDay: boolean | number,
) {
  if (currentImagery) {
    viewer.imageryLayers.remove(currentImagery)
  }

  if (typeof isDay === 'boolean') {
    currentImagery = viewer.imageryLayers.addImageryProvider(
      isDay ? dayTileImageryProvider : nightTileImageryProvider,
    )
  } else if (typeof isDay === 'number') {
    currentImagery = viewer.imageryLayers.addImageryProvider(
      imageryLayers[isDay],
    )
  }

  // 聚焦到整个地球
  viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(104.1954, 35.8617, 30000000), // 经纬度坐标（中国的中心点）和高度（3000公里）
    orientation: {
      heading: Cesium.Math.toRadians(0), // 方向（0度表示北）
      pitch: Cesium.Math.toRadians(-90), // 俯仰角（-90度表示从上往下看）
      roll: 0, // 滚转角（保持水平）
    },
  })

  return currentImagery
}

export function removeEarthDisplay(viewer: Cesium.Viewer) {
  if (currentImagery) {
    viewer.imageryLayers.remove(currentImagery)
  }
}

// 监听图片的变化。设置一个缩放阈值，缩放级别低于该值时隐藏图片，下面这样使用
// viewer.scene.camera.changed.addEventListener(() => {
//   updateImageryVisibility(viewer)
// });
const zoomThreshold = 15000000 // 根据需要调整
export function updateImageryVisibility(viewer: Cesium.Viewer) {
  const camera = viewer.scene.camera
  const cameraPosition = camera.positionCartographic
  // 计算相机到地球表面的距离
  const surfaceDistance = Cesium.Cartesian3.distance(
    camera.positionWC,
    Cesium.Cartesian3.fromDegrees(
      cameraPosition.longitude,
      cameraPosition.latitude,
      0,
    ),
  )

  // 根据距离决定是否显示图片
  if (currentImagery) {
    currentImagery.show = surfaceDistance > zoomThreshold
  }
}
