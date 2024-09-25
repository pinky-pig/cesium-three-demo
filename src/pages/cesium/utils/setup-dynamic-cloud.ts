import * as Cesium from 'cesium'

export function initEarthCloud(viewer: Cesium.Viewer) {
  const cloudImagePath = '/images/earth_cloud.png'
  const rectangleEntity = viewer.entities.add({
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
      height: 20000,
      // 确保材料加载图像，透明度设置为 true
      material: new Cesium.ImageMaterialProperty({
        image: cloudImagePath, // 确认此路径正确
        transparent: true, // 确保透明度启用
      }),
    },
  })

  return rectangleEntity
}
