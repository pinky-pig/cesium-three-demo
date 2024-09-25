import * as Cesium from 'cesium'
import DynamicWallMaterialProperty from './DynamicWallMaterialProperty.js'

export function initScrollingWall(
  viewer: Cesium.Viewer,
  positions = [
    [104.0185546875, 30.66235300961486],
    [104.01589393615723, 30.65652022496456],
    [104.029541015625, 30.65053940942565],
    [104.0397548675537, 30.65777541087788],
    [104.03829574584961, 30.66604446357028],
    [104.0255069732666, 30.667963963897005],
    [104.0185546875, 30.66235300961486],
  ],
) {
  const imgPath = '/images/Textures/test2.png'
  const coords = positions.flat()

  const entity = viewer.entities.add({
    name: '动态立体墙',
    wall: {
      material: new DynamicWallMaterialProperty(
        imgPath, // 图片路径
        Cesium.Color.RED, // 颜色
        200000, // 动画时间
      ),
      maximumHeights: Array.from({ length: positions.length }).fill(
        600,
      ) as number[],
      minimumHeights: Array.from({ length: positions.length }).fill(
        0,
      ) as number[],
      positions: Cesium.Cartesian3.fromDegreesArray(coords),
    },
  })

  viewer.zoomTo(entity)
}
