import * as Cesium from 'cesium'
import PolylineTrailLinkMaterialProperty from './PolylineTrailLinkMaterialProperty.js'

export function initScrollingLine(
  viewer: Cesium.Viewer,
  positions = [
    [104.0185546875, 30.66235300961486],
    [104.01589393615723, 30.65652022496456],
    [104.029541015625, 30.65053940942565],
    [104.0397548675537, 30.65777541087788],
    [104.03829574584961, 30.66604446357028],
  ],
) {
  const imgPath = '/images/Textures/colors1.png'
  const coords = positions.flat()

  viewer.entities.add({
    name: 'PolylineTrailLink',
    polyline: {
      material: new PolylineTrailLinkMaterialProperty(
        imgPath, // 图片路径
        Cesium.Color.fromBytes(255, 0, 0).withAlpha(0.8),
        1000, // 速度
      ),
      positions: Cesium.Cartesian3.fromDegreesArray(coords),
      width: 5,
    },
  })

  viewer!.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      positions[0][0],
      positions[0][1],
      1300,
    ),
  })
}
